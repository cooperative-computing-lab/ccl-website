---
layout: post
title: "SciWIND at IPDPS 2026"
date: 2026-06-03T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/ipdps2026-highlights/ipdps-hero-image.png
categories:
  - news
tags:
  - news
  - conference
description: CCL third-year PhD student Jin Zhou traveled to IPDPS 2026 in New Orleans to present SciWIND on node-local storage for data-intensive high-energy physics workflows.
toc: false
related_posts: false
pinned_to_home: false
---

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/ipdps2026-highlights/ipdps-hero-image.png" title="IPDPS 2026" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

This May CCL third-year PhD student **Jin Zhou** traveled to New Orleans for **[IPDPS 2026](https://www.ipdps.org/)**, the 40th IEEE International Parallel & Distributed Processing Symposium, held at the Marriott on Canal Street from May 25 to 29. He presented our paper [**SciWIND: Effectively Exploiting Node-Local Storage for Data-Intensive High-Energy Physics Workflows**](https://ccl.cse.nd.edu/assets/paper/pdf/sciwind-ipdps-2026.pdf), which looks at how to use node-local scratch more deliberately when large HEP workflows run on opportunistic clusters and workers fail mid-run. The talk was a nice cap on a line of work the lab has been pushing through TaskVine and our HEP collaborations, and it was good to put the system in front of people who live with scheduling, storage, and workflow engines every day.

Between sessions Jin followed the **[conference program](https://ssl.linklings.net/conferences/ipdps/ipdps2026_program/views/at_a_glance.html)**: tutorials and workshops on the first two days, then the main track, keynotes, and plenty of hallway conversations. IPDPS still has that familiar mix of parallel algorithms, distributed systems, and applications at scale. AI was clearly a hot topic this year, showing up in keynotes, panels, and hallway chats about training and inference at scale. A few questions after the SciWIND talk turned into longer conversations about eviction recovery, disk pressure on shared filesystems, and where workflow runtimes should own policy versus leave it to the user. New Orleans helped too, with late walks along Canal Street and coffee between sessions that made the week feel less like a sprint and more like a real meeting of the community.

<div class="row justify-content-sm-center">
<div class="col-sm-12">
{% include figure.liquid path="/assets/blog/2026/ipdps2026-highlights/conference-photo.png" title="Jin Zhou at IPDPS 2026" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
</div>

Thanks to everyone who came to the SciWIND session and to the IPDPS organizers for another smooth run. We are glad the paper is out in the proceedings and happy to keep the conversation going with groups wrestling with the same storage and resilience headaches in production science workflows.
