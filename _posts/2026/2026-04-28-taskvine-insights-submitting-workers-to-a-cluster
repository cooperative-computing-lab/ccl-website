---
layout: post
title: "TaskVine Insights: Submitting Workers to a Cluster"
date: 2026-04-28T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/taskvine-insights-submitting-workers-to-a-cluster/TaskVine-Insights.png
categories:
  - technical-articles
tags:
  - taskvine
  - htcondor
description: TaskVine workers can be submitted directly to batch systems or managed dynamically with vine_factory, with HTCondor details for worker resources, environment packaging, cleanup, and debugging.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/taskvine-insights-submitting-workers-to-a-cluster/TaskVine-Insights.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

A TaskVine application becomes useful on a cluster only after workers are placed where the compute capacity is. On a laptop, we may start a worker by hand:

```sh
vine_worker HOST PORT
```

That is fine for a local test. It is not how we want to run a real workflow on a shared system. A cluster already has a resource manager, and TaskVine should use it. CCTools supports worker submission through several batch systems, including HTCondor, Slurm, and UGE. At the Notre Dame CRC compute cluster, the common path for our TaskVine runs is HTCondor, so this post uses Condor as the concrete example.

There are two ways to think about cluster workers. `vine_submit_workers` is the direct path. It submits a fixed number of workers and then gets out of the way. `vine_factory` is the managed path. It keeps watching the manager, estimates how many workers are needed, submits new workers when old ones disappear, and writes logs that are much easier to use during a postmortem.

The [TaskVine User's Manual](https://cctools.readthedocs.io/en/latest/taskvine/) covers both tools. Here we focus on the HTCondor path and the Conda environment details that tend to matter in real runs.

## The runtime shape

A TaskVine manager listens on a host and port, or advertises itself under a project name through the catalog. Workers connect back to that manager. The batch system does not run your manager. It runs worker jobs that eventually execute `vine_worker` with the right connection arguments.

That distinction explains the first command most users see in the manual:

```sh
vine_submit_workers -T condor MACHINENAME 9123 10
```

This asks HTCondor to start ten workers. When those jobs begin to run, each worker calls back to `MACHINENAME:9123`. If your manager uses a project name, the command becomes:

```sh
vine_submit_workers -T condor -M myproject 10
```

The project name form is usually easier once runs become repeatable, because workers can discover the manager from the catalog instead of hard coding a hostname and port.

## Direct submission with `vine_submit_workers`

`vine_submit_workers` is a shell script in CCTools. It supports Condor, Slurm, and UGE through `-T` or `--batch-type`. The Condor path is useful to understand because it shows what the tool is actually doing for us.

For Condor, the script builds a small submission directory, usually `/tmp/$USER-workers`. It copies `vine_worker` into that directory. It also copies helper inputs such as `cctools_gpu_autodetect`. If `--poncho-env` is used, it also copies `poncho_package_run` and the packaged environment. Then it writes a `worker.sh` wrapper and a `condor_submit_file`.

The generated Condor submit file uses `worker.sh` as the executable. It transfers the worker binary and all declared input files. It writes output to files named like `worker.$(CLUSTER).$(PROCESS).output`, error output to `worker.$(CLUSTER).$(PROCESS).error`, and Condor job events to `workers.log`. It also sets `getenv = true`, so the submitted job inherits the submit side environment unless you change the generated file or Condor policy rejects it.

That automation is the main convenience. A practical HTCondor command looks like this:

```sh
vine_submit_workers \
  -T condor \
  --cores 4 \
  --memory 8192 \
  --disk 20000 \
  --poncho-env dv5-env.tar.gz \
  -M myproject \
  20
```

This submits twenty workers. Each worker advertises four cores, 8192 MB of memory, and 20000 MB of disk to TaskVine, and the Condor submit file requests matching resources from Condor.

One common gotcha is argument order. The script parses options until it reaches the final positional arguments. Put the manager address, or the worker count for a project name, at the end. Also put `-T condor` before Condor specific options such as `--requirements`, because the script only knows how to parse those options after the batch system has been selected. The two accepted shapes are:

```sh
vine_submit_workers [options] HOST PORT NUM_WORKERS
vine_submit_workers [options] -M PROJECT NUM_WORKERS
```

Another easy mistake is `localhost`. The script explicitly rejects `localhost` for Condor workers. A worker running on a remote execute node would interpret `localhost` as the execute node itself, not the manager. Use a routable hostname or a project name.

Finally, `vine_submit_workers` submits a fixed number of jobs and exits. In the Condor path, the script writes `queue NUM_WORKERS`, runs `condor_submit`, and does not leave behind a monitor. If a worker exits because of a worker side bug, a segmentation fault, preemption, a node problem, or a random distributed systems failure, the submit command is no longer around to replace it. The manager can retry interrupted tasks when another worker is available, but the worker pool itself may silently shrink. You need to notice that through `condor_q`, TaskVine status, manager logs, or slow progress, and then resubmit workers yourself.

## Common `vine_submit_workers` options

Do not treat `vine_submit_workers --help` as a checklist. Most runs only need a small part of it.

Where to submit:

- `-T, --batch-type condor|slurm|uge`: choose the batch system. On Notre Dame CRC, we usually use `condor`.
- `HOST PORT NUM_WORKERS`: connect workers directly to a manager address.
- `-M, --manager-name PROJECT NUM_WORKERS`: connect workers to a manager advertised through the catalog.

How many resources each worker should have:

- `--cores N`: request this many cores and report the same number to TaskVine.
- `--memory MB`: request this much memory and report it to TaskVine.
- `--disk MB`: request this much disk and report it to TaskVine.

How workers run:

- `-t, --timeout SECONDS`: let idle workers exit after this time. The default is 900 seconds.
- `--scratch-dir PATH`: choose where the local submit directory is created.
- `--poncho-env FILE.tar.gz`: run the worker inside a packaged Poncho environment.
- `--dry-run`: print the generated worker script and Condor submit file instead of submitting. Use this before submitting if the command has changed.

Condor placement:

- `-r, --requirements EXPR`: add a Condor requirements expression.

The remaining flags are for less common site policies and advanced worker behavior. Leave them out of the first version of a run. When one of those cases comes up, check the [TaskVine manual](https://cctools.readthedocs.io/en/latest/taskvine/) and the [`vine_submit_workers` source](https://github.com/cooperative-computing-lab/cctools/blob/master/taskvine/src/tools/vine_submit_workers).

## Why a factory is usually better

Direct submission is convenient when the run is small, short, or interactive. For a serious workflow, the better default is `vine_factory`.

The factory is a long running process. It periodically asks the manager, or the catalog, what work exists and how many workers are connected. It then compares the desired worker count with the workers it has already submitted. If it needs more workers, it submits them through the selected batch system. If workers exit, it observes those exits, removes them from its internal job table, and can submit replacements on the next cycle.

That behavior matters on shared clusters. HTCondor can preempt jobs. Nodes can fail. Worker processes can crash. A manager can keep retrying tasks, but it cannot create new batch jobs by itself. The factory fills that gap.

A normal Condor factory command looks like this:

```sh
vine_factory \
  -T condor \
  --min-workers 2 \
  --max-workers 50 \
  --workers-per-cycle 10 \
  --cores 4 \
  --memory 8192 \
  --disk 20000 \
  --poncho-env dv5-env.tar.gz \
  --manager-name myproject
```

This keeps at least two workers and at most fifty workers available for managers named `myproject`. The factory checks the manager periodically, estimates worker demand from waiting and running tasks, caps the target at `--max-workers`, raises it to `--min-workers` if needed, and submits at most `--workers-per-cycle` new jobs in a single cycle.

The implementation keeps an internal table of submitted batch job IDs. Each submitted worker runs a generated `vine_worker` command with the manager target, timeout, and requested resource shape. The factory then calls the batch queue layer to submit that job. Later, it waits for completed jobs with a short timeout. When a known worker job exits, the factory decrements its submitted count. That is what lets it replace lost workers without you watching `condor_q` all afternoon.

The logs are also useful. `vine_factory -d vine -o factory.log` gives you a persistent record of what the factory thought the manager needed, how many jobs it submitted, and which jobs exited. `--debug-workers` adds per worker debug logs in the factory scratch directory. When a run fails at scale, this is much easier to debug than a one time submit command whose only durable state is in Condor.

## Common `vine_factory` options

The factory has many knobs because it is a controller, not only a submit command. For normal Condor use, start with these.

Where to submit and which manager to serve:

- `-T, --batch-type TYPE`: required batch system type. Use `condor` for HTCondor.
- `-M, -N, --manager-name PROJECT`: serve managers matching a project name or regular expression.
- `HOST PORT`: connect directly to one manager instead of using the catalog.
- `-C, --config-file FILE`: read options from a JSON config file. The factory re-reads this file periodically.

How many workers to keep around:

- `-w, --min-workers N`: keep at least this many workers.
- `-W, --max-workers N`: never ask for more than this many workers.
- `--workers-per-cycle N`: limit how many new workers the factory submits in one cycle.
- `-t, --timeout SECONDS`: idle timeout passed to each worker.
- `--factory-period SECONDS`: how often the factory re-evaluates demand.

Worker resources:

- `--cores N`: request and advertise cores per worker.
- `--memory MB`: request and advertise memory per worker.
- `--disk MB`: request and advertise disk per worker.
- `--gpus N`: request and advertise GPUs per worker.

Worker environment and logs:

- `-S, --scratch-dir PATH`: choose the factory scratch directory.
- `-d, --debug SUBSYSTEM`: enable factory debugging.
- `-o, --debug-file FILE`: write factory debug output to a file.
- `--debug-workers`: create worker side debug logs.
- `--poncho-env FILE.tar.gz`: run each worker in a Poncho package.

Condor placement:

- `--condor-requirements EXPR`: add Condor requirements. Multiple uses are combined.

The remaining factory options are for less common site policies and advanced worker setups. Leave them out of the first version of a run unless your cluster setup requires them. For the complete set, use the [TaskVine manual](https://cctools.readthedocs.io/en/latest/taskvine/) and the [`vine_factory` source](https://github.com/cooperative-computing-lab/cctools/blob/master/batch_job/src/vine_factory.c).

A config file is often cleaner than a long command:

```json
{
  "manager-name": "myproject",
  "min-workers": 2,
  "max-workers": 50,
  "workers-per-cycle": 10,
  "factory-period": 30,
  "cores": 4,
  "memory": 8192,
  "disk": 20000,
  "condor-requirements": "TARGET.OpSysAndVer == \"AlmaLinux9\""
}
```

Then start the factory with:

```sh
vine_factory -T condor -C factory.json --poncho-env dv5-env.tar.gz
```

The config file is re-read while the factory runs, so you can raise `max-workers`, lower `min-workers`, or adjust resource settings without restarting the controller.

## A small wrapper for regular CRC runs

After a command becomes part of a weekly workflow, it is worth wrapping the repeated parts. In our day to day runs, we usually know the manager project name, the desired number of workers, the per worker resource shape, the scratch location, and the Poncho package. A thin shell wrapper makes that intent easier to read than a long `vine_factory` command.

Here is a cleaned up version of the pattern:

```sh
#!/usr/bin/env bash

MANAGER_NAME=dagvine-manager
N_WORKERS=40
CORES=16
MEMORY_GB=12
DISK_GB=100
PONCHO_ENV=dagvine-env.tar.gz
SCRATCH_DIR=/scratch365/$USER/factory_dv5
CONDOR_REQUIREMENTS='((has_vast))'

while [ $# -gt 0 ]
do
    if [ "$1" = "-M" ] || [ "$1" = "--manager-name" ]
    then
        MANAGER_NAME="$2"
        shift 2
    elif [ "$1" = "--workers" ]
    then
        N_WORKERS="$2"
        shift 2
    elif [ "$1" = "--cores" ]
    then
        CORES="$2"
        shift 2
    elif [ "$1" = "--memory" ]
    then
        MEMORY_GB="$2"
        shift 2
    elif [ "$1" = "--disk" ]
    then
        DISK_GB="$2"
        shift 2
    elif [ "$1" = "--poncho-env" ]
    then
        PONCHO_ENV="$2"
        shift 2
    else
        echo "unknown option: $1" >&2
        exit 2
    fi
done

MEMORY_MB=$((MEMORY_GB * 1024))
DISK_MB=$((DISK_GB * 1024))

vine_factory \
    -T condor \
    --scratch-dir "$SCRATCH_DIR" \
    --poncho-env "$PONCHO_ENV" \
    --condor-requirements "$CONDOR_REQUIREMENTS" \
    --manager-name "$MANAGER_NAME" \
    --min-workers "$N_WORKERS" \
    --max-workers "$N_WORKERS" \
    --workers-per-cycle "$N_WORKERS" \
    --cores "$CORES" \
    --memory "$MEMORY_MB" \
    --disk "$DISK_MB" \
    --timeout 36000
```

The wrapper intentionally sets `min-workers`, `max-workers`, and `workers-per-cycle` to the same value. That makes the command behave like a fixed size pool, but with the factory still watching for worker exits and replacing lost jobs. The `--timeout 36000` setting keeps workers around for long runs. The `--condor-requirements '((has_vast))'` line is site specific. Keep it if your workflow needs that Condor attribute, and replace it with the requirement expression that matches your cluster policy otherwise.

The script also accepts resource values in GB for memory and disk, then converts them to MB because `vine_factory --memory` and `--disk` expect megabytes. That small conversion removes a common source of mistakes when we are switching between Condor habits, shell scripts, and TaskVine options.

## Conda environments and Poncho

Mismatched Conda environments create failures that look unrelated to worker submission. The worker binary, Python packages, shared libraries, and task imports should agree with the manager side assumptions. Start the manager, `vine_submit_workers`, and `vine_factory` from the same intended Conda environment whenever possible.

For Python heavy workflows, package that environment and attach it to every worker. The workflow is small:

```sh
conda activate dv5-env
poncho_package_create "${CONDA_PREFIX}" dv5-env.tar.gz
```

Then pass the tarball to the submitter:

```sh
vine_submit_workers -T condor --poncho-env dv5-env.tar.gz -M myproject 20
```

or to the factory:

```sh
vine_factory -T condor --poncho-env dv5-env.tar.gz --min-workers 2 --max-workers 50 -M myproject
```

The details are handled for you. `vine_submit_workers` ships `poncho_package_run` and the tarball as Condor input files, then runs `./poncho_package_run -e ENV.tar.gz -- ./vine_worker ...`. `vine_factory` implements `--poncho-env` as a wrapper around the worker command and adds both the wrapper tool and package as worker inputs. In both cases, the worker starts inside the packaged environment before it connects to the manager.

## HTCondor operations we actually use

Once workers are submitted, Condor is still the place to inspect and clean up batch jobs.

Check your queued and running worker jobs:

```sh
condor_q
```

Remove workers when you want to stop cleanly:

```sh
condor_rm -all
```

On a shared system, be careful with `-all`. It removes your Condor jobs, and that is normally what we want when a TaskVine experiment needs a clean restart. After removal, also check for leftover local processes on the submit host:

```sh
ps aux | grep vine_worker
ps aux | grep vine_factory
```

This matters because a stale factory can quietly submit new workers after you think the old run is gone. A stale worker or wrapper process can also leave the environment in a state that does not match the next manager run. Clean up before changing Conda environments, project names, worker resources, or package tarballs.

Condor also lets you enter a worker sandbox:

```sh
condor_ssh_to_job JOBID
```

This is useful when a worker behaves differently on the execute node than it does on the submit node. You can inspect transferred files, the unpacked Poncho environment, logs, temporary outputs, and the actual command environment. For a worker crash, combine `condor_ssh_to_job`, `worker.$CLUSTER.$PROCESS.error`, factory logs, and manager logs before changing code.

## Which tool should you use

Use `vine_submit_workers` at the beginning. It is a good way to run a very small workflow, or a simple bag of tasks, and check that the basics are correct: the manager is reachable, workers can start on Condor, the Poncho package works, and the requested resources make sense.

After that first check, switch to `vine_factory` and make it the habit. Normal cluster work should not depend on manually noticing that workers disappeared. The factory has a control loop. It notices exited worker jobs, keeps the pool between `min-workers` and `max-workers`, throttles new submissions with `workers-per-cycle`, adapts to manager demand, and leaves behind logs that explain its decisions.

The manager still owns task scheduling and retries. Condor still owns placement and preemption. The factory sits between them and keeps the worker supply healthy. A good workflow is to validate with `vine_submit_workers`, then run real workloads with `vine_factory`.
