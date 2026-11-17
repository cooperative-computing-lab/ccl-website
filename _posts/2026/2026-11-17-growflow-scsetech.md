---
layout: post
title: "GROWFLOW: Low-Latency Computational Fluid Dynamics at the Edge for Real-Time Digital Agriculture"
date: 2026-11-17T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/growflow-scsetech/growflow-architecture.png
categories:
  - research
  - publications
tags:
  - growflow
  - edge-computing
  - hpc
  - digital-agriculture
  - iot
  - cfd
  - xgfabric
description: Introducing GROWFLOW, an asynchronous online/offline IoT system that decouples sub-second edge inference from remote HPC fluid dynamics simulations for real-time agricultural decision support.
toc: false
related_posts: false

---

<div class="row justify-content-sm-center">
  <div class="col-sm-6">
    {% include figure.liquid path="/assets/blog/2026/growflow-scsetech/growflow-architecture.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

In a new paper accepted to the IEEE Smart Connected Systems and Emerging Technologies Conference (IEEE SCSETech 2026), Liubov Kurafeeva, Benjamin Carter, **Ryan Hartung**, Alan Subedi, Avhishek Biswas, Michael Fay, Shantenu Jha, Chandra Krintz, Andre Merzky, **Douglas Thain**, Mehmet Can Vuran, and Rich Wolski  introduce a distributed modeling architecture that bridges the gap between resource-constrained edge sensors and high-performance computing (HPC) clusters.

In their paper, **GROWFLOW: Low-latency Computational Fluid Dynamics at the Edge for Real-time Agricultural Decision Support**, they demonstrate how asynchronous model refreshing enables sub-second physical inference in dynamic, field-scale environments.

### The Problem: The Time-Scale Mismatch in Smart IoT Systems

Modern cyber-physical systems—such as precision agriculture, smart infrastructure, and environmental monitoring—increasingly rely on high-fidelity physics models to infer conditions across large spaces from sparse sensor networks. However, deploying these models at the edge creates a fundamental systems bottleneck:

* **Computationally Expensive Physics:** High-resolution simulations like Computational Fluid Dynamics (CFD) require massive remote HPC resources and take tens of minutes to execute, making them far too slow for real-time edge decision-making.
* **Intermittent Edge Connectivity:** Field deployments often rely on bandwidth-limited or intermittent wireless links, meaning local edge nodes cannot block on remote data centers.
* **Model Staleness:** Because environmental conditions (such as wind speed and direction) shift continuously, static surrogate models trained on historical data rapidly lose accuracy over time.

### The Solution: An Asynchronous Online/Offline Loop

Built atop the open-source **xGFabric** distributed platform and the **CSPOT** log-based runtime, **GROWFLOW** resolves this time-scale mismatch by splitting execution into two continuous, decoupled loops:

1. **Online Edge Inference:** Deployed on an on-site Intel NUC cluster, the online path continuously ingests local weather station streams and serves spatial wind-field predictions using a lightweight **Principal Component Regression (PC-R)** surrogate model. Because inference never waits on remote HPC jobs, predictions remain non-blocking and resilient to network disruptions.
2. **Offline HPC Simulation & Retraining:** In parallel, remote HPC nodes continuously ingest newly captured sensor boundary conditions to run parallel **OpenFOAM** CFD simulations (generating ~6.5 million 3D wind vectors), map them onto a 12,920-point spatial grid, and retrain updated PC-R surrogate models.
3. **First-Class Staleness Management:** Rather than retraining on a rigid schedule, each offline iteration begins immediately upon the completion of the last, publishing fresh surrogate models asynchronously back to the edge to keep model staleness bounded.

### Field-Scale Deployment & Key Findings

The team deployed and evaluated GROWFLOW at a commercial 4-acre **Citrus Under Protective Screens (CUPS)** facility in California, where dense mesh enclosures create complex internal microclimates that impact spray planning and frost mitigation.

**Key Findings:**

* **Over 1,000x Latency Reduction:** Once trained, the PC-R surrogate computes wind-field predictions across all **12,920 spatial locations in under one second** on edge hardware—compared to ~22.7 minutes for a direct CFD simulation.
* **Continuous 31-Minute Refresh Cadence:** Across continuous multi-node HPC execution, the end-to-end offline simulation and retraining pipeline completed in an average of **31.2 minutes**, keeping operational model staleness between 0.5 and 1 hour.
* **Bounded Prediction Error:** With continuous asynchronous refreshing, surrogate prediction error (MAE of ~0.65–1.0 m/s) remained comparable to the manufacturer-reported uncertainty of the physical weather sensors (0.44–0.88 m/s). Without refresh, error degraded substantially over 24 hours.

By treating model staleness as a measurable systems property and decoupling edge execution from remote simulation, GROWFLOW provides a scalable blueprint for real-time, adaptive intelligence across the edge-to-HPC continuum.

---

### Resources

* **Paper PDF:** [Here](/assets/paper/pdf/growflow-2026.pdf)
* **Project Website:** [xGFabric](https://sites.google.com/view/xgfabric)
