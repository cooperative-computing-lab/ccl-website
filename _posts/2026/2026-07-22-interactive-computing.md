---
layout: post
title: "Interactive Computing: Jupyter Notebooks and VS Code on Compute Nodes"
date: 2026-07-22T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/interactive-computing/hero-image.png
categories:
  - technical-articles
tags:
  - hpc
  - vscode
  - jupyter
  - open-ondemand
  - ssh
description: Bridge the gap between local, GUI-based development and remote cluster compute without crashing login nodes or violating HPC policies.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/interactive-computing/hero-image.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

Developing code locally inside a Jupyter Notebook or stepping through lines of Python with VS Code's debugger is a fast, intuitive way to work. But when your local machine runs out of RAM, CPU cores, or GPU memory, you pack up your workflow and move to a High-Performance Computing (HPC) cluster.

Once there, many researchers hit an immediate friction point: clusters are traditionally built around non-interactive batch scripts submitted to job schedulers like SLURM or Grid Engine. Switching from an interactive graphical editor back to pure command-line scripts and print-statement debugging can feel like stepping backward in time.

Fortunately, you don't have to give up your interactive tools to use a supercomputer. You just need to know how to bridge local GUIs with remote cluster compute—**without breaking cluster rules.**

## The Cardinal Sin: Running Servers on Shared Login Nodes

When you SSH into a cluster, you land on a **login node** (or head node). Think of the login node as a shared front porch. It is meant exclusively for light administrative tasks: editing text files, organizing directory trees, checking queue status, and submitting job scripts.

The most common mistake new cluster users make is running `jupyter notebook` or connecting VS Code's Remote-SSH plugin directly to the login node.

### Why this breaks the cluster:

* **VS Code Server (`.vscode-server`)** spins up background Node.js processes, language servers, file watchers, and extension host daemons that constantly index workspace directories.
* **Jupyter Notebooks** execute heavy data manipulation, model training, and plotting live inside the server process.

Login nodes are shared simultaneously by hundreds of users. When an interactive server process starts hogging gigabytes of RAM and maxing out CPU cores, the entire command-line interface bogs down for everyone else. To prevent system crashes, administrators install automated automated watcher scripts that will abruptly **kill any long-running or high-memory user process on a login node.**

To run these tools properly, your server processes **must run on a compute node.**

## Strategy 1: SSH Port Forwarding (`ssh -L`)

If you want to run Jupyter or VS Code manually, you can use **SSH Local Port Forwarding** (`ssh -L`). This technique creates a secure tunnel between a port on your local laptop, through the login node, and directly into an active compute node.

### Step 1: Request an Interactive Compute Session

Before launching any server, request a temporary allocation on a compute node using your cluster's scheduler:

```sh
# Request 2 CPU cores, 16GB RAM, and 2 hours on SLURM
srun --tasks=1 --cpus-per-task=2 --mem=16G --time=02:00:00 --pty bash
```

Once your shell transfers you to a compute node, take note of the node's hostname (e.g., `node042.cluster.internal`).

### Step 2: Launch the Server on the Compute Node

Start your Jupyter server on the compute node, making sure to disable automatic browser opening:

```sh
# Load your Python module or activate your Conda environment first
module load python
jupyter notebook --no-browser --port=8888
```

Terminal output will provide a URL containing a security token (e.g., `http://localhost:8888/?token=a1b2c3d4...`).

### Step 3: Establish the SSH Tunnel from Your Local Laptop

Open a **new terminal tab on your local laptop** (not on the cluster) and set up the tunnel using `ssh -L`:

```sh
# Syntax: ssh -L [Local_Port]:[Compute_Node_Hostname]:[Remote_Port] [Username]@[Login_Node]
ssh -L 8888:node042.cluster.internal:8888 netid@cluster.university.edu
```

This command forwards traffic from your laptop's local `localhost:8888` through the login node jump host directly to port `8888` on compute `node042`.

### Step 4: Access the Interface

Open your local web browser and navigate to `http://localhost:8888`. Paste the security token generated in Step 2, and you now have a full Jupyter GUI running on dedicated cluster hardware!

> **VS Code Remote Tip:** When using VS Code's Remote SSH extension on shared systems, home directory file locking can sometimes break connections. Refer to resources like [Notre Dame's CRC VS Code Documentation](https://docs.crc.nd.edu/general_pages/v/vscode.html) for cluster-specific settings, such as enabling **"Lockfiles In Tmp"** in your extension settings to ensure seamless reconnects.

## Strategy 2: Open OnDemand (The Modern Web Portal)

Setting up SSH tunnels manually works well, but it requires managing port numbers, tokens, and multiple terminal windows. Many modern HPC centers simplify this entirely by deploying **Open OnDemand (OOD)**.

Open OnDemand is an open-source, web-based portal that gives you graphical access to cluster resources straight through a web browser without needing any local SSH configuration or command-line tunneling.

### How Open OnDemand Works:

1. **Log in via Web Browser:** Navigate to your university's Open OnDemand URL (e.g., `ondemand.crc.nd.edu`) and authenticate with your institutional login.
2. **Select an Interactive App:** Choose **Jupyter**, **VS Code**, **RStudio**, or **MATLAB** from the interactive applications menu.
3. **Configure Your Resource Allocation:** A form will ask you to specify your required resources (number of CPUs, GPUs, RAM amount, and maximum runtime).
4. **Launch:** Click **Launch**.

Under the hood, Open OnDemand automatically writes a job script, submits it to the cluster scheduler (SLURM/Grid Engine), waits for a compute node to be allocated, launches the server process, builds a secure web proxy, and presents a **"Connect"** button in your browser window.

Because Open OnDemand routes all compute through scheduled jobs, you get the full speed of dedicated compute hardware and GPUs without violating cluster usage policies or risking process kills on login nodes.

---

## Summary: The Interactive Computing Checklist

Interactive development and HPC compute can easily coexist if you follow these rules:

1. **Never run Jupyter Notebooks or VS Code Server processes on login nodes.** Keep login nodes clean for light editing and job submission.
2. **Check for Open OnDemand first.** If your site hosts an Open OnDemand portal, use it for one-click interactive web sessions.
3. **Allocate compute nodes before launching servers manually.** Always start with an interactive job allocation (`srun` or `qsub`).
4. **Tunnel securely with `ssh -L`.** Forward local ports through the login host to the specific compute node hosting your active server.
5. **Clean up when finished.** Terminate your interactive compute sessions and close notebook servers when you finish working so cluster resources return to the queue for other researchers.
