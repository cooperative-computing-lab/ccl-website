---
layout: post
title: "Introducing X-Bucket"
date: 2026-04-09T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/introducing-x-bucket/fig1-system-overview.png
categories:
  - technical-articles
tags:
  - resource-allocation
  - workflows
description: In cluster-backed dynamic workflows, the allocator must reserve cores, memory, and related resources before each task runs, but its real footprint only shows up afterward. Dynamic workflows make that puzzle even messier. X-Bucket turns streaming measurements into bucketed predictions that stay general, free of priors, and online. Read on for how it stacks up.
toc: false
related_posts: false
---

Dynamic workflow systems enable local applications to scale out by decomposing their computational needs into task graphs on-the-fly and executing them on large clusters. However, this dynamic task generation raises a challenging resource allocation problem: upon scheduling, a task needs to be allocated some amount of resources, yet its resource consumption is only known after its execution.

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/introducing-x-bucket/fig1-system-overview.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

The figure above demonstrates the dynamicity of task generation in these workflow systems. On the manager node, the application first defines a large number of computations as functions and passes them via invocations to the workflow manager. The workflow manager takes care of packaging them into tasks by marshalling their arguments, detecting software dependencies, wrapping error handling code, etc., and resolves the inter-task dependencies into a dynamic task graph. Ready tasks are sent to the task allocator for resource allocation (e.g., cores, memory, disk, GPUs) before they arrive at the scheduler. The scheduler then maps tasks with a certain resource allocation into available workers for remote execution, where each task is run in a file system and resource sandbox. Upon task completion, workers send back the measured resource consumption of tasks to the task allocator for data collection purposes, and tasks' results to the application.

In addition to this inherent uncertainty, the resource allocation problem is further complicated by stochastic behaviors of workflows, which can be divided into two categories: Internal Stochasticity and External Stochasticity. Internal Stochasticity refers to random elements that are uncontrollable within the execution of a workflow, including (1) arbitrary ordering of task execution, where tasks are defined and submitted sequentially but executed in an arbitrary order due to a variety of factors (inter-task dependencies, data locality, etc.), (2) task specialization, in which tasks of different natures can be core-, memory-, or I/O-intensive, and (3) arbitrary structure of workflows, in which tasks are grouped into phases for coordination and computational purposes, resulting in a moving resource consumption distribution over time.

External Stochasticity then refers to random elements that are uncontrollable between executions of the same workflow, including (1) the current system state, where workflow execution performance is subject to arbitrary usage from workloads of co-located users (e.g., shared storage, underlying physical network), (2) evolution of workflows, as workflows over time are run with different input datasets, require software updates, or users can add or remove a certain number of tasks in the workflow task generation logic, and (3) inherent stochasticity of tasks, as some tasks can be stochastic (e.g., Monte Carlo simulations, SGD-based training).

To tackle the uncertainty of the resource allocation problem and address the stochasticity of workflows' execution, we introduce X-Bucket, a family of four resource allocation algorithms that meet four following criteria: (1) general-purpose, as they do not rely on task- or workflow-specific information, (2) prior-free, where only information of the current run is used, (3) online, in which algorithms predict resource allocations as workflows run, and (4) robust, as we expect good resource efficiency across a diverse set of workflow behaviors.

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/introducing-x-bucket/fig2-xbucket-integration.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

In the figure above, the diagram on the left shows how algorithms in the X-Bucket family fit in the components of a dynamic workflow system. When the workflow manager sends a ready task to the task allocator, it asks Bucket Composer, an object encapsulating the X-Bucket algorithms, for a resource allocation prediction. Once a task with that allocation finishes its execution, the task allocator forwards the resource record of the task to both Bucket Composer and the workflow manager so they can update their internal states. The diagram on the right shows the general bucketing approach, in which collected resource records are broken into several buckets, each with a probability value, which are then used in the prediction of the next task's resource allocation.

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/introducing-x-bucket/fig3-bucketing-algorithms.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

The figure above shows examples of how Greedy Bucketing and Exhaustive Bucketing, two sub-families in the X-Bucket family, work. While Greedy Bucketing algorithms recursively find an optimal break point and split a current region into two, Exhaustive Bucketing algorithms generate all possible combinations of bucket configurations, compute the associated expected resource wastes, and choose the one yielding the minimum value.

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/introducing-x-bucket/fig4-evaluation-results.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

The figure above shows a portion of the evaluation of the X-Bucket algorithms. In this figure, the rows are the resource types (cores, memory, and disk), and the columns are the evaluated workflows, including five synthetic workflows (Normal, Uniform, Bimodal, Trimodal, and Exponential) and three production workflows (ColmenaXTB, TopEFT, and LNNI). In each small figure, the first five bars are alternative algorithms: (1) Whole Machine, where each task is allocated a whole machine, (2) Max Seen, where each task is allocated the maximum resource consumption seen so far, (3) Min Waste and (4) Max Throughput, following their descriptions in Tovar et al. [2017], and (5) Quantized Bucketing, following their descriptions in Phung et al. [2021]. The last four bars are the X-Bucket algorithms, including PG-Bucket (Probabilistic Greedy Bucketing), PD-Bucket (Probabilistic Exhaustive Bucketing), DG-Bucket (Deterministic Greedy Bucketing), and DE-Bucket (Deterministic Exhaustive Bucketing). Results show that algorithms in the X-Bucket family consistently outperform alternative algorithms on all evaluated workflows, which we attribute to their designs in finding bucket configurations with minimum expected resource waste and to the four principles they follow: general-purpose, prior-free, online, and robust.
