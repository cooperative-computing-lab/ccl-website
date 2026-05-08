---
layout: post
title: "TaskVine Insights: Shipping Worker Builds to Remote Nodes and Debugging There"
date: 2026-05-05T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/taskvine-insights-shipping-worker-builds-to-remote-nodes/TaskVine-Insights.png
categories:
  - technical-articles
tags:
  - taskvine
  - htcondor
  - debugging
description: On HTCondor, workers keep running the vine_worker binary that got staged at submit time, not the one you just installed into $PATH. Here is how to get a fresh build onto the nodes and how to point -d all output somewhere you can actually read.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/taskvine-insights-shipping-worker-builds-to-remote-nodes/TaskVine-Insights.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

Once you are hacking [`vine_worker`](https://github.com/cooperative-computing-lab/cctools/tree/master/taskvine/src/worker) in C and feeding workers through HTCondor, two boring problems show up over and over: the pool still runs yesterday's binary, and your printfs never appear next to the Python manager. This note is about staging the binary you meant to ship and getting worker-side trace somewhere useful. For the repo layout start with [A Beginner's Map to the CCTools Codebase](https://ccl.cse.nd.edu/blog/2026/taskvine-insights-a-beginners-map-to-the-cctools-codebase/); for the usual `vine_submit_workers` / `vine_factory` workflow see [Submitting Workers to a Cluster](https://ccl.cse.nd.edu/blog/2026/taskvine-insights-submitting-workers-to-a-cluster/).

None of that changes the basic fact that a live worker runs whatever was staged when the job went in, not necessarily whatever `make install` just dropped into `$PATH`. To pick up a new build you still have to drain the old worker jobs, stop a factory that is holding a stale scratch copy if one is running, install, and submit again.

## The install that actually reaches HTCondor

After `./configure`, we still do the blunt rebuild from [`taskvine/src`](https://github.com/cooperative-computing-lab/cctools/tree/master/taskvine/src) when we want zero ambiguity:

```sh
make clean && make && make install
```

On your own machine you probably have a `vine_worker` running already. Stop it before `make clean && make && make install`. Overwriting the on-disk binary while the process still has it mapped is a good way to take a nose dive, sometimes straight into a segfault, and whatever tasks it was holding will go with it. Bring the worker back up against the manager after the install.

On the cluster there is another wrinkle. `vine_submit_workers` drops a copy of `vine_worker` into its submit directory when you run it; `vine_factory` copies whatever `vine_worker` resolves to (unless you pointed it at `--worker-binary`) into `-S,--scratch-dir` once at startup, and every batch job runs `./vine_worker` out of that directory. Tweaking `$PATH` later while the factory is still running does nothing for jobs already in flight. When you need a clean slate, `condor_rm` tears down old worker jobs (plenty of sites use `condor_rm -all` to wipe your queue); kill the factory on the submit side if it is still recycling the old scratch tree; install; submit again so what landed in the staging directory matches what you think you built.

## Turning on logs people can open

Extra `fprintf` lines in `vine_worker` are not going to show up in your Python manager transcript; you still need worker-side debug. `-d all` is the heavy-handed default that turns the noise up across subsystems. Add `-o` with a path when stderr is useless because you will never SSH to that execute node ([CLI reference](https://github.com/cooperative-computing-lab/cctools/blob/master/taskvine/src/worker/vine_worker_options.c)).

Sanity check on the laptop first:

```sh
vine_worker -d all localhost 9123
```

You want a wall of debug text right away; same flags later ride along inside Condor.

`vine_factory --debug-workers` appends `-d all -o worker.<n>.log` for each submission (the number is a factory-side counter, not Condor's proc id). Those files hop back in the job sandbox when the run finishes because Condor uses `when_to_transfer_output = on_exit`, which is fine for an autopsy and useless if you wanted `tail -f` while the slot was still busy.

For that you need a directory the execute node and your login node both mount. Hand the worker `-d all` and `-o /absolute/path/...` through `vine_factory` `-E,--extra-options`. Under the hood the Condor batch module writes a tiny `condor.sh` wrapper that does `eval "$@"` with the full command line as arguments ([`batch_queue_condor.c`](https://github.com/cooperative-computing-lab/cctools/blob/master/batch_job/src/batch_queue_condor.c)).

Put something unique to each job in the filename. HTCondor's `$(Cluster)` and `$(Process)` (or the `$(ClusterId)` / `$(ProcId)` spellings your site prefers) expand per proc; write them as `\$(Cluster)` and `\$(Process)` when an earlier shell would swallow the `$` before Condor sees them.

Choose a parent dir `d` on the shared filesystem, maybe stamp `ts` when you kick off a factory, maybe add something like `ipid` if your wrapper exports it before `vine_worker` starts. The filename pattern is your own business as long as two workers never write the same path by accident.

```sh
d=/cephfs/group/myproject/vine-logs
ts=$(date +%Y%m%d%H%M%S)
vine_factory -T condor -M myproject -S /scratch/$USER/vf \
  -E "-d all -o ${d}/worker-${ts}-\$(Cluster).\$(Process).log"
```

`ts` in that example is just a label for one factory session; `\$(Cluster).\$(Process)` keeps different Condor procs from stepping on each other. If you already have something like `ipid` in the environment and you trust it to be unique per writer, `${d}/worker-${ts}-${ipid}-\$(Cluster).\$(Process).log` is the same idea with more belt and suspenders.

Do not turn on `--debug-workers` and a fat custom `-E` at the same time unless you like reading everything twice.

From Python the same string can ride through [`vine.Factory.extra_options`](https://github.com/cooperative-computing-lab/cctools/blob/master/taskvine/src/bindings/python3/ndcctools/taskvine/manager.py), which maps to `vine_factory --extra-options`. There is still no `debug_workers` knob in the binding, so either stay explicit in `extra_options` or shell out to the CLI if you need the factory-only switch:

```python
import ndcctools.taskvine as vine

manager = vine.Manager(9123)
factory = vine.Factory(batch_type="condor", manager=manager, log_file="factory.log")
factory.extra_options = r"-d all -o /cephfs/group/myproject/vine-logs/worker-\$(Cluster).\$(Process).log"
with factory:
    job = vine.Task("echo heartbeat")
    manager.submit(job)
    manager.wait(timeout=120)
```

When you pack up, skim the usual checklist: did the slot actually run the binary you staged, is `-d all` going somewhere you can read, and did you give each job a distinct path (Condor macros plus any label you added on purpose) so the logs never clobber each other.
