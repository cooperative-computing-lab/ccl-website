---
layout: post
title: "Work Queue Insights: Practical Debugging on HPC Systems"
date: 2026-06-23T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/work-queue-insights-practical-debugging-on-hpc-systems/Work-Queue-Insights.png
categories:
  - technical-articles
tags:
  - work_queue
  - makeflow
  - slurm
  - debugging
  - hpc
description: A segfault in task_min_resources taught us a few things about staying sane while debugging on HPC systems. Here are the habits that keep you from burning hours waiting on a large workflow when a three-task smoke test would have told you the same thing.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/work-queue-insights-practical-debugging-on-hpc-systems/Work-Queue-Insights.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

Debugging distributed systems on HPC has its own rhythm. The feedback loop is slow, the machines are shared, and the error you are chasing may only appear under load, across nodes, or after a scheduler delay you cannot reproduce locally. This note grew out of [issue #4415](https://github.com/cooperative-computing-lab/cctools/issues/4415): a segmentation fault (SIGSEGV) in `task_min_resources` inside [`work_queue.c`](https://github.com/cooperative-computing-lab/cctools/tree/master/work_queue/src), triggered by Makeflow running a large parallel workflow in Work Queue mode.
 
The habits below are less about any single tool and more about discipline: keeping your changes visible, your experiments small, and your teammates in the loop. They apply equally whether you are working in [`work_queue.c`](https://github.com/cooperative-computing-lab/cctools/tree/master/work_queue/src) or anywhere else in a large C codebase running on a shared cluster.
 
## Talk to your teammates early and often
 
The most underrated debugging tool is a colleague. When you hit a wall the instinct is to keep grinding alone until you have something to show. Resist it. A two-sentence description of what you changed and where you are stuck surfaces assumptions you did not know you were making before you spend a day looking in the wrong function.
 
Post a short note to your team channel whenever you switch gears. If you are about to run a batch of SLURM jobs to test a hypothesis, say so. Someone may have already run that experiment, or may know that the catalog tick interval is configurable and could be shortened for testing.
 
The flip side: when someone asks for help, give them the full picture up front. Paste the Valgrind output, the backtrace, and a short description of what you have already tried. "Here is what I know" cuts the back-and-forth in half.
 
## Put your changes somewhere others can see them
 
Debugging on HPC usually means modifying source, rebuilding, and staging a binary on a shared login node where the next person has no idea what you changed. The fix is obvious but easy to skip when you are in a hurry: commit and push early, to a branch, a fork, or a scratch repository your colleagues can actually reach.
 
```sh
git checkout -b debug/task-min-resources-segfault
# edit work_queue/src/work_queue.c
git add work_queue/src/work_queue.c
git commit -m "add null check before task_min_resources dereferences ready list node"
git push origin debug/task-min-resources-segfault
```
 
A pushed branch does several things at once. It gives collaborators a URL to look at instead of a terminal paste. It lets them check out your exact tree, reproduce the build, and point out something you missed. And it is an automatic checkpoint: if `make clean` goes sideways or a node corrupts your scratch directory, the work is not gone. Uncommitted changes on a cluster login node are one bad disk event away from disappearing.
 
## Keep a running log of what you changed and why
 
Segfault hunts often take days or weeks. Memory is not reliable across that span. Keep a plain text file, a section in the PR description, or a lab notebook — and update it every time you try something:
 
```
2026-06-09  opened #4415; Valgrind log attached; fault site is work_queue.c:8174 in task_min_resources
2026-06-10  added null check on q->ready_list head before dereferencing — crash still appears on run 3 of 5
2026-06-11  hypothesis: node is removed from the ready list but list_next still returns it; added fprintf around list traversal
2026-06-12  confirmed: stale pointer survives across catalog tick; looking at where nodes are freed vs unlinked
```
 
This log is not for posterity. It is for you, tomorrow morning, when you cannot remember why you commented out that block. It is also what you paste when you ask a teammate for help.
 
## Scale down before you scale out
 
Submitting a five-hundred-task Makeflow workflow to test a one-line fix is one of the most reliable ways to waste an afternoon. Queue wait times are unpredictable, the logs from hundreds of workers are noisy, and if the fix is wrong you have burned allocation budget and still do not know why.
 
The better approach is to find or construct the smallest possible reproducer. Once the small case reproduces reliably, you have a debuggable target. Only when that case is clean do you run at scale to confirm nothing regresses. This discipline also makes it far easier to share a reproducer with a teammate: "clone, run these two commands, watch it crash" is a much better bug report than "submit two hundred SLURM jobs and search the logs."
 
## Instrument the code before you reach for a debugger
 
Before attaching GDB or running Valgrind, the fastest thing you can do is add targeted `fprintf` calls to verify that your fix is actually being reached. This sounds obvious, and yet the most common source of "my patch does nothing" confusion is that the code path you edited is never entered for the input you are testing.
 
```c
/* In work_queue.c, before the dereference that Valgrind flagged */
fprintf(stderr, "[DEBUG] task_min_resources: checking node %p on ready list\n", (void *)t);
if (!t) {
    fprintf(stderr, "[DEBUG] task_min_resources: null node encountered — skipping\n");
    continue;
}
fprintf(stderr, "[DEBUG] task_min_resources: node task_id=%d resources_requested=%p\n",
        t->taskid, (void *)t->resources_requested);
```
 
Write to `stderr`, not `stdout`, which may be buffered or redirected by the framework. Add prints before and after the critical section. If the "before" line appears but the "after" line does not, you found the crash site. If neither appears, the function is not being called — which means the bug is upstream of where you thought it was, and you just saved yourself an hour of reading the wrong code.
 
If the prints confirm your fix is being reached but the crash keeps happening, the root cause is elsewhere: probably the point where the stale node enters the list, not the point where it is dereferenced. Move the instrumentation upstream.
 
Gate these prints behind a compile-time flag before merging so they do not pollute production builds:
 
```c
#ifdef WQ_DEBUG_TASK_RESOURCES
fprintf(stderr, "[DEBUG] task_min_resources: node %p task_id=%d\n",
        (void *)t, t->taskid);
#endif
```
 
Pass `-DWQ_DEBUG_TASK_RESOURCES` in `CFLAGS` to turn them on; a normal build leaves no noise.
 
## Reach for GDB and Valgrind when instrumentation is not enough
 
When `fprintf` tells you where the crash is but not why, it is time to bring in a real debugger. For a crash you can reproduce locally, GDB is the first stop:
 
```sh
# Build with debug symbols and no optimization so variables are readable
./configure CFLAGS="-g -O0"
make -C work_queue/src
 
# Run until it crashes, then inspect the frame
gdb --args work_queue_worker -d all localhost 9123
(gdb) run
(gdb) bt                        # full backtrace at the crash point
(gdb) frame 2                   # switch to the frame inside task_min_resources
(gdb) p t                       # is the pointer null or garbage?
(gdb) p t->resources_requested  # does the struct look sane?
(gdb) watch t->taskid           # set a watchpoint to catch when this field changes
```
 
Valgrind slows execution by roughly ten to twenty times, so pair it with the scaled-down reproducer from the previous section. A handful of short tasks that trigger the ready-list traversal during a catalog tick is a much better target than a full production workflow.
 
One practical note: you generally cannot run GDB interactively inside a SLURM job. If the bug only appears at scale, use Work Queue's `-d all` flag to write a verbose trace to a shared filesystem path that both the execute node and your login node can read:
 
```sh
work_queue_worker -d all -o /cephfs/group/myproject/wq-logs/worker-$(date +%Y%m%d%H%M%S).log \
  localhost 9123
```
 
Then reconstruct a local reproducer from what the trace tells you, and use GDB on that.
 
## Read the logs that are already there
 
Before adding instrumentation or firing up a debugger, check what Work Queue already records. The `-d all` flag produces a structured trace across subsystems — scheduling decisions, catalog updates, task state transitions — that often answers the question before you write a single `fprintf`.
 
```sh
# Watch the debug stream in real time on a local test run
work_queue_worker -d all localhost 9123 2>&1 | grep -i "task_min\|ready\|segfault\|null\|error"
 
# After a cluster run, search a saved log
grep -n "task_min_resources\|ready_list" worker-20260609.log | head -40
```
 
The log format uses timestamps and subsystem tags, so you can narrow a twenty-thousand-line trace to the thirty lines around the catalog tick event without much effort. For the #4415 bug in particular, looking for the catalog update message immediately before the crash narrows the search window considerably.

## Turn on every debug flag and log everything
 
When you are stuck, err heavily on the side of logging too much rather than too little. A verbose log that you have to `grep` through is far better than a quiet one that leaves you guessing. The more you record, the more likely it is that the crash site, the bad pointer, and the sequence of events leading to it are all sitting in the file waiting for you.
 
CCTools exposes this through the `-d` flag, which accepts one or more subsystem names. The relevant ones for a Work Queue + Makeflow investigation are `wq` (Work Queue task scheduling and worker communication), `batch` (the batch system layer that submits SLURM or Condor jobs), `rmon` (the resource monitor that measures cores, memory, and disk per task), and `makeflow` (the Makeflow DAG engine, which covers parsing, lexing, and the run loop). Pass them all:
 
```sh
# Worker: turn on every relevant subsystem and save to a named file
work_queue_worker -d all -o worker.log localhost 9123 &
 
# Makeflow manager: same idea, log to a separate file
makeflow -T wq -d wq,batch,rmon,makeflow -o makeflow.log mini.makeflow
```
 
`-d all` is the blunt instrument — it sets every bit in the flag word and includes subsystems you probably do not care about on this run. That is fine. The extra volume costs you nothing except disk space, and the subsystem tags in the log make it easy to filter later. If the log grows large enough to be unwieldy, narrow it down once you know which subsystem to focus on; start with `all` and restrict from there.
 
On the cluster, where you cannot read `stderr` interactively, always pair `-d all` with `-o` pointing at a shared filesystem path that your login node can reach after the job finishes. Give each job a unique filename so concurrent workers do not overwrite each other:
 
```sh
work_queue_worker -d all \
  -o /cephfs/group/myproject/wq-logs/worker-$(date +%Y%m%d%H%M%S)-$$.log \
  localhost 9123
```
 
The `$$` expands to the worker process id on the execute node, which is a cheap uniquifier on top of the timestamp. Once the logs land, search them as a unit:
 
```sh
# Find the catalog tick and the crash window across all workers in a session
grep -h "task_min_resources\|catalog\|ready_list\|SIGSEGV" \
  /cephfs/group/myproject/wq-logs/worker-20260609-*.log \
  | sort -k1,2 | less
```
 
The `-h` flag suppresses the filename prefix so the timestamps sort cleanly. Sorting by the first two fields — date and time — stitches the per-worker logs into a single chronological view of what the whole pool was doing in the seconds before the crash. That cross-worker timeline is often what finally makes the bug obvious.
 
One warning: do not turn on `--debug-workers` in `work_queue_factory` and also pass `-d all` through `--extra-options` at the same time. The factory-side flag already appends `-d all -o worker.<n>.log` to every submission; doubling up means every worker writes two interleaved logs to slightly different paths and you end up reading redundant output. Pick one approach per session.

 
## The quick checklist before every cluster run
 
Before you fire off a batch job, spend sixty seconds on these:
 
- Did you rebuild and reinstall after your last edit? A stale binary is the most common source of "my fix does nothing."
- Is the debug log going to a path that exists and is writable from the execute node?
- Is the job small enough that you will get a result in under ten minutes, or do you have a good reason to go bigger right now?
- Did you commit your current state so that whatever happens on the cluster, the code is recoverable?
- Did you tell a teammate what you are about to test, so they can flag it if they know something relevant?

None of these take long. Together they prevent the most common ways a cluster debugging session turns into a wasted afternoon.
