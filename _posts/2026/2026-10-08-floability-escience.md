---
layout: post
title: "Declare, Resolve, Reuse: Portable Data Handling for Notebook Workflows in Floability"
date: 2026-10-08T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/floability-escience/data-portability-gap.png
categories:
  - research
  - publications
tags:
  - floability
  - notebooks
  - hpc
  - data-portability
  - backpacks
description: Introducing a portable data layer for Floability that eliminates hard-coded paths and enables reproducible notebook execution across heterogeneous HPC clusters.
toc: false
related_posts: false

---

<div class="row justify-content-sm-center">
  <div class="col-sm-12">
    {% include figure.liquid path="/assets/blog/2026/floability-escience/data-portability-gap.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

In a new paper presented at IEEE eScience 2026, **Md Saiful Islam** along with co-authors Reyer Band, Jin Zhou, Tanu Malik, Kevin Lannon, and Douglas Thain address one of the most stubborn obstacles in computational science: data portability across High-Performance Computing (HPC) systems.

In their paper, **[Declare, Resolve, Reuse: A Portable Data Layer for Notebook Workflows Across HPC Systems](/assets/paper/pdf/floability-escience-2026.pdf)**, **Saiful** introduces an externalized, declarative data layer built for the **Floability** workflow engine. This framework expands on the "backpack" packaging abstraction, allowing data-intensive Jupyter notebooks to run seamlessly across disparate HPC environments without code modifications.

### The Problem: The Data Portability Gap

Jupyter notebooks are ubiquitous in exploratory science, yet studies reveal that up to three-quarters of published notebooks fail when re-executed end-to-end. While software environments are increasingly containerized or packaged with tools like Conda and Apptainer, data handling remains fragile.

As highlighted in **Figure 2** (above), scientific notebooks routinely embed site-specific assumptions into Python cells:

* Hard-coded absolute file paths (e.g., `/scratch/data...`) that break when transferred to another cluster.
* Ad-hoc download cells that re-fetch gigabytes of data on every single execution.
* Unset or site-dependent environment variables.

When a researcher attempts to move a notebook from Site A to Site B or Site C, the notebook code must be manually edited and rewritten into distinct, fragile variants.

### The Solution: Declare, Resolve, Reuse

Saiful's approach decouples data requirements from notebook code by introducing an explicit specification file (`data.yml`) managed by the Floability runtime. The architecture relies on three core tenets:

1. **Declare:** Workflows define input datasets, logical names, expected validation criteria (such as file size and SHA-256 checksums), and target runtime paths in a declarative YAML file. Profiles allow users to switch between dataset variants (e.g., `train_set` vs. `test_set`) while serving data to the notebook at the exact same relative target path.
2. **Resolve:** Floability abstracts access across heterogeneous sources—including Pelican federated storage, S3 object stores, HTTP endpoints, and local filesystems—with support for multi-source fallback policies.
3. **Reuse:** An HPC-local cache indexes datasets using a combination of the specification schema key and remote source metadata (such as ETag, modification time, and file size). Unchanged datasets are identified instantly without downloading full contents, letting repeat runs skip data transfers safely.

### Multi-Site Evaluation

To evaluate the portable data layer, Saiful tested three large-scale, data-intensive workflows:

* **DV5:** A High-Energy Physics (HEP) analysis running over ~108 GB of simulated LHC data across 44,010 tasks.
* **LFV:** A Lepton Flavor Violation analysis over ~7.5 GB of data.
* **DConv:** An image convolution workflow processing ~93 GB of GOES-16 satellite imagery across 48,528 tasks.

The evaluation deployed identical Floability backpacks across three distinct HPC facilities: **ND CRC** (HTCondor scheduler), **Purdue Anvil** (Slurm scheduler), and **TACC Stampede3** (Slurm scheduler).

**Key Findings:**

* **Zero Code Edits:** The exact same notebook code ran completely unchanged across all three systems, with site-specific configurations supplied strictly via CLI options.
* **Minimal Lookup Overhead:** Metadata-based cache key lookups took ~0.12 seconds for single files (up to 1 GB) and remained under 4.3 seconds even for complex dataset directories containing 10,000 files.
* **Streamlined Execution:** On repeat executions, cached dataset reuse completely removed data materialization and software environment creation from the critical runtime path.

By taking data movement and staging logic out of individual notebook cells, Saiful's work turns portable, repeatable scientific execution from an ad-hoc engineering chore into an automated property of the workflow.

---

### Resources

* **Paper PDF:** [Declare, Resolve, Reuse: A Portable Data Layer for Notebook Workflows Across HPC Systems](/assets/paper/pdf/floability-escience-2026.pdf)
* **Project Website:** [floability.github.io](https://floability.github.io)
* **Artifacts & Benchmarks:** [GitHub Repository](https://github.com/saifulislampi/floability-data-experiments)