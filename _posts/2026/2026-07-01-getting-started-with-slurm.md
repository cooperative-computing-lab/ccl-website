---
layout: post
title: "Getting Started with SLURM"
date: 2026-07-01T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/getting-started-with-slurm/Slurm_logo_sized-1875592753.png
categories:
  - technical-articles
tags:
  - slurm
  - tutorial
  - hpc
description: SLURM is the job scheduler running on most HPC clusters today. Here are the commands and habits that get you productive quickly as an end-user, without having to read the entire manual first.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/getting-started-with-slurm/Slurm_logo_sized-1875592753.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

When you log into a university or national lab cluster, you aren't logging directly into the powerful machines that run your code. Instead, you land on a "login node" shared with dozens of other users. To actually run your heavy computations, you have to request permission from a gatekeeper.

On most High-Performance Computing (HPC) systems today, that gatekeeper is **SLURM** (Simple Linux Utility for Resource Management). Think of SLURM as a reservation system for a supercomputer. While it has a reputation for being complex, most day-to-day work comes down to a handful of basic commands. This guide covers the essential subset you need to get started: submitting jobs, monitoring them, stopping them when things go sideways, and understanding why they might be stuck in line.

**One major caveat:** SLURM is highly configurable, and every institution customizes it differently. Queue names, time limits, memory defaults, and specific resource rules vary from cluster to cluster. The commands here are standard SLURM, but you should always cross-reference them with your local site's documentation.

## Submitting a Job

You don't run heavy scripts directly in the terminal on an HPC. Instead, you wrap your commands in a shell script and hand it over to SLURM using the `sbatch` command:

```sh
sbatch my_job.sh
```

When SLURM accepts your job, it assigns it a unique **Job ID** and prints it to the screen:

```
Submitted batch job 847312
```

You will use this number to track, manage, or cancel your job. A minimal, beginner-friendly job script looks like this:

```sh
#!/bin/bash
#SBATCH --job-name=hpc-demo
#SBATCH --output=hpc-demo-%j.out
#SBATCH --error=hpc-demo-%j.err
#SBATCH --time=04:00:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G

# The commands below will run on the compute node once allocated:
echo "Starting my analysis..."
python3 my_analysis_script.py --input data.csv
```

The special `#SBATCH` lines at the top tell SLURM exactly what resources your code needs to run.

### What do these headers mean?

* `--job-name`: A friendly nickname for your job so you can spot it easily in the queue.
* `--output` and `--error`: Where your program's text output and error messages should be saved. The `%j` is a variable that automatically fills in your unique Job ID, preventing different runs from overwriting each other's logs.
* `--time`: The maximum runtime allowed (Hours:Minutes:Seconds). If your job exceeds this, SLURM will stop it automatically.
* `--cpus-per-task` and `--mem`: The requested number of CPU cores and total RAM (8 Gigabytes in this case).


## Passing Arguments: Header vs. Command Line

Every `#SBATCH` line inside your script is identical to passing a flag directly to `sbatch` on the command line. These two methods accomplish the exact same thing:

```sh
# Option A: All configuration is kept inside the script header
sbatch my_job.sh

# Option B: Overriding the script's defaults from the command line
sbatch --time=08:00:00 --mem=16G my_job.sh
```

Command-line flags always take precedence over header directives. The best habit to build is putting your **sensible defaults** in the script header—the values you expect to use 90% of the time—and then overriding them on the command line for one-off experiments that require extra memory or longer runtimes.

## Watching Your Jobs

Once you submit a job, `squeue` is the command you will use most often. Running it without arguments shows every single job currently running on the entire cluster, which is overwhelming. Instead, filter it to show only your jobs:

```sh
squeue -u $USER
```

The output will look something like this:

```
JOBID    PARTITION  NAME        USER     ST   TIME   NODES  NODELIST(REASON)
847312   general    hpc-demo    dthain   R    0:42   1      node047
847313   general    hpc-demo    dthain   PD   0:00   1      (Resources)
847314   general    hpc-demo    dthain   PD   0:00   1      (Priority)
```

The **ST (State)** column tells you what your job is currently doing:

* **`R` (Running):** Your job is actively executing on a compute node.
* **`PD` (Pending):** Your job is waiting in line.

The **`NODELIST(REASON)`** column explains *why* a pending job hasn't started yet. `(Resources)` means the cluster is currently full and waiting for other users' jobs to finish. `(Priority)` means your job is sitting behind higher-priority work in the queue.

If you want to check when SLURM expects your job to start, add the `--start` flag:

```sh
squeue -u $USER --start
```

*Note: SLURM’s start-time estimates are notoriously optimistic, as they assume every running job will use its maximum requested time. Treat these numbers as rough ballparks rather than guarantees.*

## Cancelling a Job

If you realize your script has a bug, or you accidentally requested the wrong parameters, you can clear it out of the system using `scancel` and its Job ID:

```sh
scancel 847312
```

To wipe the slate clean and cancel **all** of your jobs at once:

```sh
scancel -u $USER
```

If you only want to clear out your waiting jobs while letting your active, running jobs finish safely, specify the pending state:

```sh
scancel -u $USER -t pending
```

## Checking Cluster Availability

Before you submit a massive job, it is helpful to see how busy the cluster is. The `sinfo` command provides a snapshot of the available hardware pools (called "partitions"):

```sh
sinfo
```

```
PARTITION  AVAIL  TIMELIMIT   NODES  STATE   NODELIST
general*   up     7-00:00:00  12     idle    node[001-012]
gpu        up     2-00:00:00  4      mix     gpu[01-04]
debug      up     0-01:00:00  2      idle    node[013-014]
```

Pay attention to the **STATE** column:

* **`idle`:** The nodes are completely free and ready for work.
* **`mix`:** Some CPU cores on these nodes are busy, but others are still available.
* **`alloc`:** The nodes are completely full.
* **`drain`:** The nodes have been taken offline by administrators for maintenance.

## Inspecting a Live or Stuck Job

For detailed troubleshooting on a specific job, `scontrol show job` will output a comprehensive diagnostic record:

```sh
scontrol show job 847312
```

The output is quite long, but look closely for `JobState`, `Reason`, and `TRES` (the exact resource request). If a job has been pending for days, the `Reason` field will often reveal if it is blocked by an administrative hold, an impossible resource request, or standard queue traffic.

## Checking What Completed Jobs *Actually* Used

One of the biggest mistakes beginners make is overestimating how much memory or time their code needs. Requesting too many resources forces your job to wait in line much longer than necessary.

To look back at a completed job and see its actual resource footprint, use `sacct`:

```sh
sacct -j 847312 --format=JobID,JobName,State,Elapsed,MaxRSS,ReqMem
```

The **`MaxRSS`** field shows the peak amount of RAM your job actually consumed during its run. Compare this against **`ReqMem`** (what you requested). If your job only used 2GB of RAM but you requested 32GB, you are artificially delaying your own queue times. Aim to request roughly 20–30% more memory than your historical peak to keep your queue times short while avoiding out-of-memory errors.

## A Few Silent Pitfalls to Avoid

SLURM enforces local cluster rules strictly, and it often does so silently. Keep these four items in mind as you review your institution's specific user guide:

* **Partition Time Caps:** Most cluster queues have hard maximum runtimes (e.g., a 24-hour limit). If you ask for 48 hours on a 24-hour queue, SLURM will reject your job the second you attempt to submit it.
* **Account Flags:** Many institutions require you to specify a billing project or account via `--account=my_lab_group`. If you omit this, your job may fail instantly or be assigned to a lowest-priority pool.
* **Silent Memory Defaults:** If you don't specify a `--mem` flag, SLURM will assign you a default value per core. On some clusters, this default can be incredibly small (like 1GB), causing your program to crash unexpectedly with an `OUT_OF_MEMORY` error. Always declare your memory explicitly.
* **Job Arrays for Repetitive Work:** If you need to run the exact same analysis script over 50 different data files, do not run `sbatch` 50 separate times. Instead, look into **Job Arrays** using `sbatch --array=1-50`. It allows the scheduler to handle your workload as a single cohesive unit, saving your sanity and keeping the cluster running smoothly.