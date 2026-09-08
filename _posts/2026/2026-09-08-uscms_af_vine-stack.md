---
layout: post
title: "The Vine CMS Analysis Stack: Use Case at Notre Dame"
date: 2026-09-08T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/uscms_af_vine-stack/banner.png

categories:
  - news
tags:
  - ccl
  - lab-updates
  - coffea
  - taskvine
  - cms
description: Ben presented his work on the Vine CMS analysis stack this week.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
  <div class="col-sm-12">
    {% include figure.liquid path="/assets/blog/2026/uscms_af_vine-stack/banner.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

---

This week, Ben, presented his work on the **[Vine CMS analysis stack](https://github.com/cooperative-computing-lab/vine-cms-analysis-stack)** during the US CMS Analysis Facilities monthly meeting.

The Vine CMS analysis stack is a reference stack for running CMS analysis workflows with **[Coffea](https://github.com/scikit-hep/coffea)** on top of **[TaskVine](https://cctools.readthedocs.io/en/stable/taskvine)**, orchestrated by **[VineReduce](https://github.com/cooperative-computing-lab/vine-reduce)**. It does not depend on Notre Dame resources, so it can work anywhere there is a Python environment and either local cores or a batch cluster (HTCondor, SLURM, SGE, ...) to point workers at.

You can view his presentation slides **[HERE](/assets/blog/2026/uscms_af_vine-stack/USCMS_AF_vine-stack.pdf)**.
