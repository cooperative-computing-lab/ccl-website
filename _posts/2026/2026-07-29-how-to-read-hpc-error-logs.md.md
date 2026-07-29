---
layout: post
title: "How to Read HPC Error Logs (And What Common Failures Actually Mean)"
date: 2026-07-29T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/how-to-read-hpc-error-logs/Beginner's Guide to HPC.png

categories:
  - technical-articles
tags:
  - hpc
  - debugging
  - slurm
  - uge
  - htcondor
  - linux
description: Don't panic when your batch job crashes. Here is how to locate log files, decode exit codes, and debug failures across SLURM, Univa Grid Engine (UGE), and HTCondor.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/how-to-read-hpc-error-logs/Beginner's Guide to HPC.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

You submit a batch job, wait in the queue, and suddenly see its status transition to `FAILED` or `HOLD`. When you open your output directory, you are greeted by a 200-line wall of obscure error messages, memory dumps, and cryptic exit codes.

It is a classic high-performance computing friction point: feeling overwhelmed by stack traces and assuming something catastrophic went wrong. But **HPC error logs are structured breadcrumbs, not punishments.** Once you know where your scheduler writes these files and how to parse the output, identifying the root cause takes seconds across any Workload Manager—whether your cluster uses **SLURM**, **Univa Grid Engine (UGE / SGE)**, or **HTCondor**.

## Standard Output vs. Standard Error vs. Event Logs

When running non-interactive batch jobs, system output streams split into separate files depending on your workload manager:

* **Standard Output (`.out` / stdout):** Reserved for standard runtime logs, progress bars, `print()` statements, and calculation results.
* **Standard Error (`.err` / stderr):** Reserved for system warnings, thrown exceptions, segmentation faults, and library errors.
* **Workflow Event Log (`.log`):** Unique to schedulers like **HTCondor**, this file records lifecycle events managed by the scheduler itself (e.g., job submission, node assignment, resource tracking, and hold reasons).

Here is how you define these log files across the three major schedulers:

### SLURM (`.sub` / `.sh`)

```sh
#SBATCH --output=my_job_%j.out
#SBATCH --error=my_job_%j.err
```

*(Where `%j` inserts the unique SLURM Job ID).*

### Univa Grid Engine / SGE (`.sub` / `.sh`)

```sh
#$ -o my_job_$JOB_ID.out
#$ -e my_job_$JOB_ID.err
```

*(Where `$JOB_ID` inserts the unique Grid Engine Job ID).*

### HTCondor (`.submit`)

```text
output = my_job_$(Cluster).out
error  = my_job_$(Cluster).err
log    = my_job_$(Cluster).log
```

*(Where `$(Cluster)` represents the HTCondor Cluster/Job ID).*

When a job fails, **always inspect the `.err` file first** (and check the `.log` file if you are using HTCondor).

## Reading Traces: Top-to-Bottom vs. Bottom-to-Top

Reading an error log sequentially from line 1 to line 200 is often a waste of time. Different programming languages and runtime tools print stack traces in entirely different directions.

### Python: Read Bottom-to-Top

Python prints error traces chronologically, meaning the actual fatal exception is always printed at the **very bottom** of the trace.

* **The Strategy:** Scroll directly to the final line of the `.err` file to identify the exact error type (e.g., `KeyError`, `IndexError`, `ModuleNotFoundError`). Once you know *what* failed, scan upward to find the line pointing to your script rather than an internal library package.

### C/C++ and Fortran: Read Top-to-Bottom

Compiled languages and build tools log errors chronologically as they are encountered during compilation or execution.

* **The Strategy:** Start at the **very top** of the error log. The first error printed is almost always the true root cause; the hundreds of lines following it are usually cascading failures triggered by that initial crash.

### Bash / Shell Scripts: Read Where It Stops

By default, Bash scripts continue executing subsequent commands even if an earlier line fails (unless `set -e` is enabled).

* **The Strategy:** Search for the specific command line that failed by scanning upward from where output stopped matching your expected workflow.

## Decoding the Usual Suspects: Classic HPC Failures

Most cluster job crashes stem from three recurring issues. Recognizing how each scheduler reports these failures allows you to fix them instantly.

### 1. Out Of Memory (OOM) / Exit Code 137 / Job Holds

* **The Cause:** Your program tried to consume more RAM than requested. To prevent your job from crashing neighboring processes on a shared node, the system kernel or scheduler terminated your process.
* **How Schedulers Report It:**
* **SLURM:** Your `.err` file or `sacct -j <job_id>` reports exit code **`137`** (128 + Signal 9 `SIGKILL`), often accompanied by `slurmstepd: error: Detected allocation failure. OOM Killer invoked.`
* **UGE / SGE:** The job fails with exit code `137`. Running `qacct -j <job_id>` or `qstat -j <job_id>` shows `failed: 100 : Assumed OS problem` or reveals that the job exceeded its specified `maxvmem` ceiling.
* **HTCondor:** Rather than exiting outright, HTCondor usually places the job in a **`HOLD`** state (`H`). Running `condor_q -hold` or checking the `.log` file explicitly states: `Job used more memory than requested`.


* **The Fix:** Increase the requested memory in your submission script:
* **SLURM:** `#SBATCH --mem=32G` (or `#SBATCH --mem-per-cpu=8G`)
* **UGE:** `#$ -l h_vmem=32G`
* **HTCondor:** `request_memory = 32GB`



### 2. "No Space Left on Device" or Quota Exceeded

* **The Symptom:** `IOError: [Errno 28] No space left on device` or `write error: disk quota exceeded`.
* **What it means:** Your script ran out of disk space. This rarely happens on large global storage filesystems (`/scratch` or `/project`), but frequently occurs when temporary files auto-write to small localized `/tmp` partitions or constrained home directories (`/home/username`).
* **The Fix:** Redirect temporary directory environment variables to high-capacity scratch space directly inside your job script before running code:

```sh
export TMPDIR=/scratch/username/tmp
export PIP_CACHE_DIR=/scratch/username/pip_cache
mkdir -p $TMPDIR $PIP_CACHE_DIR
```

*(In HTCondor, you can also request dedicated local scratch disk space via `request_disk = 50GB` in your submit file).*

### 3. "Command Not Found" or "ModuleNotFoundError"

* **The Symptom:** `bash: line 14: gfortran: command not found` or `ModuleNotFoundError: No module named 'torch'`.
* **What it means:** Compute nodes start in a clean, isolated environment. They **do not** automatically inherit loaded modules, exported `$PATH` variables, or active Conda environments from your login session terminal.
* **The Fix:** Explicitly load system modules and activate virtual environments directly inside your execution script:

```sh
# Load system modules
module load python/3.11

# Activate your custom environment
source /scratch/username/envs/my_env/bin/activate

# Execute your application
python3 my_script.py
```

## Quick Scheduler Diagnostic Cheat Sheet

When a job finishes or fails unexpectedly, use these diagnostic commands to query job metadata and exit status:

| Scheduler | Query Live / Held Jobs | Query Finished / Failed Job History |
| --- | --- | --- |
| **SLURM** | `squeue -u $USER` | `sacct -j <job_id> --format=JobID,State,ExitCode,MaxRSS` |
| **UGE / SGE** | `qstat -j <job_id>` | `qacct -j <job_id>` |
| **HTCondor** | `condor_q -hold` | `condor_history <job_id>` |

---

## The Log Parsing Checklist

Before reaching out to cluster administrators or teammates for help with a broken job, run through these steps:

1. **Locate the standard error log (`.err`).** For HTCondor, inspect the workflow `.log` file as well for scheduler-level events.
2. **Determine the language direction.** Read Python errors from the **bottom up**; read C/C++ build failures or shell errors from the **top down**.
3. **Use scheduler diagnostics.** Check `sacct` (SLURM), `qacct` (UGE), or `condor_q -hold` (HTCondor) to verify exit codes and memory usage.
4. **Identify resource limits.** An exit status of **137** or a memory hold reason means your job needs a higher memory allocation.
5. **Set explicit pathing.** Ensure all `module load` commands, `TMPDIR` paths, and environment activations are written explicitly inside your job submission file.
