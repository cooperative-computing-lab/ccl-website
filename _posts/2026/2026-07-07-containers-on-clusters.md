---
layout: post
title: "Conda, Modules, and Containers: How to Manage Your Software Without Breaking the Cluster"
date: 2026-07-07T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/containers-on-clusters/conda-logo.png
categories:
  - technical-articles
tags:
  - hpc
  - conda
  - modules
  - containers
  - hpc
description: Managing software on a shared supercomputer is completely different from your personal laptop. Here is how to use Modules, Conda, and Containers effectively without exhausting your storage or crashing the cluster.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/containers-on-clusters/conda-logo.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

If you are transitioning from running code on your personal laptop to using a high-performance computing (HPC) cluster, you are about to encounter a major cultural shock: **you do not have `sudo` privileges.** On your own machine, installing a new tool is as simple as running `sudo apt-get install`, `brew install`, or clicking an installer. On a shared cluster, these commands will reward you with a blunt `Permission denied`. This restriction isn't just bureaucratic cruelty; it is a fundamental safety measure. In a shared environment with hundreds of users, giving everyone root access would lead to broken configurations, security breaches, and software chaos.

So, how do you install the specific libraries, languages, and tools your research requires? 

HPC systems use three primary tools for software management: **Environment Modules**, **Conda**, and **Containers**. Each has its own strengths, and using them correctly will save you days of troubleshooting—and keep you from accidentally drawing the ire of the cluster administrators.

## Level 1: Environment Modules (The Built-In Way)

Before you try to download or compile anything yourself, you should check if the cluster administrators have already installed it for you. HPC systems use an environment management tool called **Modules** to manage hundreds of pre-installed, highly optimized software packages.

Because different researchers need different versions of the same software (e.g., Python 3.8 vs. Python 3.11, or different versions of CUDA), these packages sit dormant on the system until you explicitly ask for them.

### Key Commands to Know:

* **`module avail`**: Displays a massive list of all software packages pre-compiled on the cluster. You can filter this by adding a keyword, such as `module avail python` or `module avail gcc`.
* **`module load <package>`**: Injects the chosen software into your current terminal session. For example, running `module load python/3.10.8` updates your environment so that typing `python` points directly to that specific version.
* **`module list`**: Shows you which modules are currently active in your session.
* **`module purge`**: Clears out all loaded modules, giving you a clean slate. This is incredibly useful if two software packages are conflicting with one another.

### Why you should use them:
Modules are pre-compiled specifically for the cluster’s underlying hardware. This means they are often optimized to run significantly faster than a generic version you download off the internet. Best of all, they take up exactly zero bytes of your personal storage quota. **Always check `module avail` first.**

## Level 2: Conda / Miniconda (The User-Space Way)

What happens when you need a Python library or a niche scientific package that isn’t in the module list? For most data scientists and researchers, the immediate answer is **Conda**. 

Conda allows you to create completely isolated "sandboxes" (environments) where you can install any package version you want entirely within your user account. However, Conda comes with two massive pitfalls that frequently break beginners' workflows.

### Pitfall #1: The Home Directory Trap
By default, when you run `conda create` or `conda install`, Conda downloads and extracts files into a hidden folder in your home directory (`~/.conda` or `~/.cache`). 

On almost all HPC clusters, your home directory (`/home/username`) has a **strict, tiny storage quota** (often between 10GB and 50GB) intended only for configuration files and source code. Because modern data science environments (especially those involving PyTorch or TensorFlow) can easily balloon to 10GB+ per environment, running a few installations can completely max out your storage quota. When this happens, you won't even be able to log in or run basic commands.

#### The Fix: Redirect Conda to Storage or Scratch
Before installing anything with Conda, tell it to store its environments and package caches in your lab's high-capacity group folder or a fast scratch directory. You can do this by creating or editing a configuration file named `.condarc` in your home directory:

```yaml
# ~/.condarc
envs_dirs:
  - /scratch/username/conda/envs
  - /project/labname/shared_conda/envs
pkgs_dirs:
  - /scratch/username/conda/pkgs
```

Replace `/scratch/username/` or `/project/labname/` with the actual high-capacity data paths provided by your cluster administrators.

### Pitfall #2: Compiling on the Login Node

When you log into a cluster, you land on a "login node." This node is a shared hallway where hundreds of users are editing files and submitting jobs.

Running a heavy command like `conda env create -f environment.yml` fires up intense CPU and memory processes to resolve dependencies and compile code. Doing this on a login node will slow down the terminal experience for everyone else on the cluster and will usually trigger an automated system script that kills your process mid-installation.

#### The Fix: Use an Interactive Compute Session

Whenever you need to build or modify a Conda environment, request a temporary compute node using SLURM's interactive mode:

```sh
# Request an interactive shell on a compute node for 1 hour
srun --tasks=1 --cpus-per-task=2 --mem=8G --time=01:00:00 --pty bash
```

Once your terminal transfers you to a compute node (e.g., `user@node042`), you can safely run your Conda installation commands without affecting anyone else.

## Level 3: Containers (The Bulletproof Way)

Sometimes, even Conda isn't enough. If your workflow requires a complex web of system libraries, an entirely different operating system (like a specific version of Ubuntu when the cluster runs Rocky Linux), or you want to replicate an exact software pipeline from a published paper, you need **containers**.

In the commercial tech world, **Docker** is the king of containers. However, Docker is fundamentally incompatible with shared HPC clusters because running Docker requires a background process (daemon) with root privileges. If you could run Docker on a cluster, you could easily bypass security and access other users' data.

### Apptainer / Singularity to the Rescue

To solve this, the HPC community developed **Apptainer** (formerly known as Singularity). Apptainer allows you to run containers completely in "user space" without needing `sudo`.

Instead of dealing with background daemons, Apptainer compresses an entire container environment into a single, portable file ending in `.sif` (Singularity Image Format).

### Key Commands to Know:

1. **Download and Convert a Docker Image:**
You can pull almost any public image directly from Docker Hub, and Apptainer will automatically translate it into an HPC-safe `.sif` file:
```sh
apptainer pull ubuntu_python.sif docker://python:3.11-slim
```


2. **Execute a Command Inside the Container:**
To run your code using the software isolated inside that container image, use `exec`:
```sh
apptainer exec ubuntu_python.sif python3 my_script.py
```


3. **Run an Interactive Shell Inside the Container:**
If you want to look around inside your containerized operating system environment:
```sh
apptainer shell ubuntu_python.sif
```



### Why you should use them:

Containers are the ultimate tool for **scientific reproducibility**. Once you find a container configuration that works, that `.sif` file will run exactly the same way on your university cluster, a national lab supercomputer, or a cloud instance five years from now.

## Summary: The Software Management Checklist

To keep your account active and the cluster running smoothly, run through this mental checklist every time you need new software:

1. **Check `module avail` first.** If it’s already installed by the system administrators, load it and move on.
2. **Check your storage quotas.** Run your cluster's quota check command (like `myquota` or `lfs quota`) to ensure your home directory isn't on the verge of filling up.
3. **Configure your `.condarc` file.** Never leave Conda on its default settings; always point your environment and package directories to a high-capacity scratch or group folder.
4. **Never install software on a login node.** Use `srun` to spin up an interactive compute session before compiling or running extensive installers.
5. **Use Apptainer for complex pipelines.** If a workflow requires intricate system dependencies or absolute reproducibility, skip the installation headaches entirely and look for a container image.

