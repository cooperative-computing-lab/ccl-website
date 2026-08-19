---
layout: post
title: "Shell Survival Skills: Terminal Tools Every HPC User Needs"
date: 2026-08-18T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/shell-survival-skills/Beginner's Guide to HPC.png

categories:
  - technical-articles
tags:
  - hpc
  - linux
  - bash
  - tmux
  - terminal
description: Keep your remote sessions alive across laptop disconnects, search massive log directories instantly, and save hours with custom shell shortcuts.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
  <div class="col-sm-12">
    {% include figure.liquid path="/assets/blog/2026/shell-survival-skills/Beginner's Guide to HPC.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

Working over SSH on a remote supercomputer means your active connection is always at the mercy of your network. A brief Wi-Fi drop, a VPN hiccup, or closing your laptop lid will abruptly close your SSH session—killing whatever interactive build, environment setup, or monitoring script you had running in that terminal window.

Beyond connection drops, navigating massive directory trees and digging through hundreds of job output files with basic commands quickly becomes tedious. Mastering a few quality-of-life Linux tools transforms the remote terminal from an unforgiving interface into a safe, efficient workspace.

## 1. Terminal Multiplexers: Bulletproof Your Remote Sessions

A **terminal multiplexer** like `tmux` (or GNU `screen`) creates a persistent session on the remote server that runs independently of your SSH connection. If your network disconnects, your remote programs keep running in the background. When you log back in, you simply reattach to the session exactly where you left off.

### Essential `tmux` Commands:

* **Start a new named session:**
```sh
tmux new -s workflow
```


* **Detach from a session (leaves it running in the background):**
Press `Ctrl+b`, release, then press `d`.
* **List all active sessions:**
```sh
tmux ls
```


* **Reattach to a running session:**
```sh
tmux attach -t workflow
```


* **Kill a finished session:**
```sh
tmux kill-session -t workflow
```


> **Pro Tip:** Always launch `tmux` on a login node *before* requesting an interactive compute session (`srun` or `qsub`). If your Wi-Fi drops mid-job, your interactive compute node allocation stays alive!

## 2. Searching Fast with `find` and `grep`

When running multi-job workflows, manual file inspection breaks down fast. Combining `find` (to locate files) and `grep` (to search file text) lets you audit log directories in seconds.

### Locate Specific Files with `find`

Locate files by name, age, or extension across deep directory hierarchies:

```sh
# Find all error logs modified in the last 24 hours
find ./logs/ -name "*.err" -mtime -1

# Find all Singularity image files in your scratch space
find /scratch/$USER -name "*.sif"
```

### Search Text Inside Logs with `grep`

Search through hundreds of output files without opening them individually:

```sh
# Search recursively (-r) for "OutOfMemory", displaying line numbers (-n)
grep -rn "OutOfMemory" ./logs/

# Case-insensitive search (-i) across all .err files
grep -i "error" slurm-*.err
```

### Combine Both Tools

Pass matching files directly into `grep` using the `-exec` flag:

```sh
find ./logs/ -name "job_*.out" -exec grep -H "FAILED" {} +
```

## 3. Shell Shortcuts: Custom Aliases in `~/.bashrc`

If you find yourself typing the same long cluster paths or complex monitoring commands every day, automate them using **shell aliases**.

An alias is a custom keyword mapped to a longer shell command. By adding aliases to your shell configuration file (`~/.bashrc`), they load automatically every time you log in.

### Useful HPC Aliases to Add to `~/.bashrc`:

```sh
# Open ~/.bashrc in your favorite editor (e.g., nano ~/.bashrc) and add:

# Fast directory navigation
alias myscratch='cd /scratch/$USER'
alias myproject='cd /project/labname/$USER'

# Quick scheduler status checks
alias sq='squeue -u $USER'
alias sqstat='squeue --format="%.18i %.9P %.12j %.8u %.2t %.10M %.6D %R"'

# Request a standard 2-hour interactive compute session
alias devnode='srun --cpus-per-task=4 --mem=16G --time=02:00:00 --pty bash'

# Colorized log checking
alias tailerr='tail -n 50 -f *.err'
```

After editing `~/.bashrc`, apply the changes immediately by running:

```sh
source ~/.bashrc
```

---

## Summary: The Shell Survival Checklist

1. **Never run critical interactive tasks in a bare SSH shell.** Wrap long interactive sessions inside `tmux` so network drops won't kill your progress.
2. **Use `grep -rn` to debug log folders instantly.** Scan entire directories for error keywords without opening files one by one.
3. **Use `find` to hunt down abandoned files.** Clean up old scratch files and large core dumps to keep your storage quota under control.
4. **Customize `~/.bashrc` with shortcuts.** Create aliases for your common cluster paths, job status checks, and interactive node requests.
