---
layout: post
title: "Reshaping and Fusing Hidden Task Graphs: Optimizing Distributed HEP Workflows in Dask Vine"
date: 2026-10-20T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/reshaping-escience/graph-restructuring.png
categories:
  - research
  - publications
tags:
  - dask
  - task-vine
  - hpc
  - high-energy-physics
  - task-graph-restructuring
description: Introducing automatic task graph fusion and reshaping in Dask Vine using algebraic annotations to reduce end-to-end execution latency in HEP workflows by over 30%.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
  <div class="col-sm-12">
    {% include figure.liquid path="/assets/blog/2026/reshaping-escience/graph-restructuring.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

In a new paper presented at IEEE eScience 2026, **Barry Sly-Delgado** and Douglas Thain present a methodology for automatically restructuring distributed task graphs to boost the performance and fault tolerance of data-intensive workflows.

In the paper, **[Fusion and Reshaping of Hidden Task Graphs for High Energy Physics Applications](/assets/paper/pdf/reshaping-escience-2026.pdf)**, Barry introduces a framework within **Dask Vine** that leverages user-provided algebraic annotations to execute automatic task fusion and graph reshaping—improving end-to-end workflow latency by at least 30% without requiring changes to application code.

### The Problem: Hidden Inefficiencies in Automatically Generated DAGs

In High Energy Physics (HEP), frameworks like Coffea generate execution task graphs (Directed Acyclic Graphs, or DAGs) behind the scenes using high-level abstractions like Dask. While convenient, these automatically constructed task graphs are often invisible to the user and subject to major performance bottlenecks:

- **Task Granularity & Scheduling Overhead:** Fine-grained tasks create severe serialization, scheduling, and network communication overhead.
- **Massive Fan-In Bottlenecks:** Standard reductions often execute as flat operations, forcing a single merge task to stage gigabytes or terabytes of intermediate data. This creates extreme disk pressure, memory contention, and resource imbalance.
- **Fragile Fault Tolerance:** On opportunistic cluster resources (such as HTCondor), worker evictions during a large flat reduction can force massive recomputations from original inputs.

Because algebraic properties of reduction functions (such as variable arity, commutativity, and associativity) are not visible at the graph level, traditional workflow engines struggle to safely optimize these graph structures automatically.

### The Solution: Fusion and Reshaping via Semantic Annotations

Barry's solution introduces an intermediate optimization layer inside **Dask Vine**—the bridge connecting Dask DAG management with Task Vine distributed execution. The framework applies two primary graph rewrites prior to execution:

1. **Task Fusion:** Combines fine-grained tasks into single executable units. Vertical fusion merges linear dependency chains to pass intermediate results directly in memory rather than writing to disk. Horizontal fusion groups parallel tasks sharing identical parents or children to allow input reuse.
2. **Task Reshaping:** Automatically converts wide, flat reductions into balanced hierarchical reduction trees.
3. **Semantic Annotations:** Users mark reduction functions using lightweight Python decorators (e.g., `@merge`). These labels inform the workflow manager of algebraic properties, allowing safe graph transformations at compile time.

```python
from coffea import NanoEventsFactory
from ndcctools.taskvine import DaskVine
import awkward as ak

@merge  # Semantic decorator exposing associativity and variable arity
def merge_results(events):
    return ak.concatenate(events)

def write(events):
    return ak.to_parquet(events, "out")
```

### Evaluation on CMS Analysis Workflows

The authors evaluated the framework across three real-world CMS High Energy Physics applications: **RsTriPhoton** (three-photon searches), **DV5** (kinematic cut/ECF analysis), and **ttBar** (top-quark pair production) executed across UGE and HTCondor clusters.

**Key Findings:**

- **End-to-End Latency Reduction:** Combining task fusion and reduction reshaping reduced total workflow execution time by **over 30%** across all applications.
- **Data Movement Optimization:** Vertical and horizontal fusion significantly reduced unique intermediate data generation and network transfers by retaining intermediate results directly in memory.
- **Improved Fault Tolerance:** Under a simulated worker eviction regime (losing a worker node every minute on HTCondor), hierarchical reductions maintained steady task execution and recovered quickly, whereas flat reductions suffered massive recovery spikes and extended execution delays.

By introducing semantic labels to expose hidden function properties, Barry's work enables runtime graph optimization that converts rigid, fine-grained DAGs into highly efficient, resilient distributed executions.

---

### Resources

- **Paper PDF:** [Fusion and Reshaping of Hidden Task Graphs for High Energy Physics Applications](/assets/paper/pdf/reshaping-escience-2026.pdf)
