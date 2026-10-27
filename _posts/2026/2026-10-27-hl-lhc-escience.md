---
layout: post
title: "Hybrid Workflow Composition for Extreme-Scale Data Processing on the HL-LHC"
date: 2026-10-27T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/hl-lhc-escience/workflow-composition.png
categories:
  - research
  - publications
tags:
  - cms
  - hl-lhc
  - dagflowsim
  - grid-computing
  - workflow-composition
  - hpc
description: Introducing a policy-driven hybrid workflow composition framework and simulator for HL-LHC data processing that increases throughput by up to 3.8x while reducing network overhead by 14.9x.
toc: false
related_posts: false

---

<div class="row justify-content-sm-center">
  <div class="col-sm-12">
    {% include figure.liquid path="/assets/blog/2026/hl-lhc-escience/workflow-composition.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

In a new paper presented at IEEE eScience 2026, **Alan Malta Rodrigues** and Douglas Thain tackle one of the most pressing performance challenges in High-Throughput Computing (HTC): optimizing scientific workflow composition for petabyte-scale data processing.

In their paper, **[Hybrid Workflow Composition for Extreme-Scale Data Processing: A Case Study on the HL-LHC](/assets/paper/pdf/hl-lhc-escience-2026.pdf)**, **Alan** presents a formal taskset composition framework alongside **DAGFlowSim**, a discrete-event simulator that models multi-stage processing chains under heterogeneous resource constraints.

### The Problem: The Composition Extrema Gap

As High Energy Physics transitions to the High-Luminosity Large Hadron Collider (HL-LHC) era, processing pipelines face a nearly ten-fold increase in event trigger rates and data volume. Currently, workload management systems like CMS WMCore rely on two static execution models at opposite ends of the spectrum:

* **StepChain (Monolithic Grouping):** All sequential processing stages (tasksets) are merged into a single grid job running on a worker node. While this keeps intermediate data local to scratch disk, it leads to severe resource fragmentation. For instance, a step requiring 64 cores forces the entire monolithic job to request 64 cores for its entire duration, idling resources during low-intensity steps.
* **TaskChain (Full Decomposition):** Every taskset executes as an independent, standalone grid job. While this enables fine-grained resource allocation, every step transition forces intermediate data products to be staged to and from remote shared storage, overwhelming network bandwidth.

With modern workflows executing across heterogeneous grid, cloud, and High-Performance Computing (HPC) facilities, neither static extreme provides an efficient long-term solution.

### The Solution: Adaptive Hybrid Composition and DAGFlowSim

Alan's framework bridges this gap by systematically exploring hybrid workflow compositions—grouping dependent tasksets where data locality matters most while isolating tasksets with unique resource requirements. The architecture relies on three key components:

1. **Workflow Composition Engine:** Automatically parses Directed Acyclic Graphs (DAGs) and enumerates all valid group-based execution partitions under hardware and dependency constraints.
2. **DAGFlowSim Engine:** A high-fidelity, discrete-event simulation engine designed to evaluate thousands of workflow configurations under variable job durations, network bandwidth limits, and failure rates.
3. **Policy-Driven Score Function:** A multi-metric objective function that weights event throughput, CPU/memory utilization, and remote I/O footprint, allowing system operators to select optimal compositions based on site-specific operational priorities.

### Evaluation & Key Findings

The authors evaluated 16 distinct workflow compositions across 480 environmental scenarios (comprising 7,680 simulation runs) using CMS-calibrated baseline pipelines.

**Key Findings:**

* **Up to 3.8x Throughput Increase:** In heterogeneous workloads with varying resource demands, hybrid compositions avoid the severe over-provisioning penalties of monolithic jobs, yielding up to a 3.8x increase in event throughput.
* **14.9x Network Reduction:** By keeping heavy intermediate data local to worker scratch space, hybrid strategies reduce remote shared-storage transfers by up to 14.9x compared to fully independent task execution.
* **Pareto-Efficient Hybrids:** In realistic CMS processing pipelines, hybrid configurations (such as Construction 13, which groups heavy intermediate steps while keeping transient input/output steps independent) achieve maximum event throughput while cutting remote write storage overhead by ~3x.

By replacing static execution paradigms with workload-aware hybrid composition, Alan's work provides a quantitative, policy-driven foundation for next-generation scientific orchestration on the HL-LHC and beyond.

---

### Resources

* **Paper PDF:** [Hybrid Workflow Composition for Extreme-Scale Data Processing: A Case Study on the HL-LHC](/assets/paper/pdf/hl-lhc-escience-2026.pdf)
* **Simulator Repository:** [GitHub - DAGFlowSim](https://github.com/amaltaro/wflow_sim)