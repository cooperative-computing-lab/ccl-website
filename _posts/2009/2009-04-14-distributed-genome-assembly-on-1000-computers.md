---
layout: "post"
title: "Distributed Genome Assembly on 1000 Computers"
date: 2009-04-14T14:16:00+00:00
author: "Douglas Thain"
image: "/assets/blog/2009/distributed-genome-assembly-on-1000-computers/assembly-2d2be04138.gif"
description: "Lately, my research group has been collaborating with Prof. Scott Emrich on several problems in bioinformatics. Our students Chris Moretti and Mike Olson hav…"
toc: false
related_posts: true
tags: [genome assembly, abstractions, bioinformatics]
---

Lately, my research group has been collaborating with Prof. Scott Emrich on several problems in bioinformatics. Our students Chris Moretti and Mike Olson have been building a system for carrying out whole-genome assembly problems on campus grids. They recently got it scaled up to run on nearly 1000 nodes spread across Notre Dame, Purdue, and Wisconsin, making the problem complete in a few hours instead of a few weeks. We are excited to move the system into production use to start working on some real assembly problems.

Here is what the genome assembly problem looks like from a computer science perspective. As you should remember from biology class, your entire genetic makeup is encoded into a long string of DNA, which is a chemical sequence of base pairs that we represent by the letters A, T, C, and G. A sequencing device takes a biological sample, and through some chemical manipulations can extract the DNA and produce your entire string of DNA, which is some 2 billion characters (bases) long:
<span style="font-family: courier new;">
AGTCGATCGATCGATAATCGATCCTAGCTAGCTACGA
</span>
Except that it isn't that simple. The chemical process of extracting the sequence runs out of energy after about 100-1000 characters. depending on the exact process in use. Instead what you end up with is a large set of "reads" which are random substrings from the entire genome. For example, here are three random substrings of the previous string:
<br/>
<span style="font-family: courier new;">
<br/>

1.  ATCCTAGCTAGCTACGA
    </span>
    <span style="font-family: courier new;">
2.  AGTCGATCGATCG
    </span>
    <span style="font-family: courier new;">
3.  CGATCGATAATCGATCCTAG
</span>

Now, you have to examine all of the reads, and figure out which ones overlap. In principle, you want to compare all of them to each other with the All-Pairs framework, but that would be computationally infeasible. Instead, there are a number of heuristics that can be used to generate candidate pairs, which then can be matched in detail and then assembled. For example, the three reads from before overlap like this:
<span style="font-family: courier new;">
AGTCGATCGATCGATAATCGATCCTAGCTAGCTACGA
</span>
<br/>
<span style="font-family: courier new;">
</span>
<br/>
<span style="font-family: courier new;">
.....................................
</span>
<br/>
<span style="font-family: courier new;">
</span>
<br/>
<span style="font-family: courier new;">
AGTCGATCGATCG........................
</span>
<span style="font-family: courier new;">
<br/>
</span>
<br/>
<span style="font-family: courier new;">
.......CGATCGATAATCGATCCTAG..........
</span>
<span style="font-family: courier new;">
<br/>
</span>
<br/>
<span style="font-family: courier new;">
....................ATCCTAGCTAGCTACGA
</span>
There are many wide open questions of exactly what heuristics to use in selecting candidates, performing alignments, and completing the assembly. Our job is to give researchers a modular framework that allows them to try many different kinds of algorithms, using hundreds or thousands of CPUs to complete the job quickly.
<br/>
<p>
 We started with the work queue framework from the Wavefront abstraction. An assembly master process reads the candidates and sequences from disk, builds small units of work, and sends them out to worker processes running on various grids. No particular alignment code is baked into the system. Instead, the user provides an alignment program written in whatever language they find convenient. The system moves the executable and the necessary files out to the execution node, and puts it to work.
</p>
<div class="row justify-content-sm-center">
 <div class="col-sm-12">
  {% include figure.liquid path="/assets/blog/2009/distributed-genome-assembly-on-1000-computers/assembly-2d2be04138.gif" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
 </div>
</div>
<p>
 Here is an example of the system in action on a multi-institutional grid. The X axis shows time, and the various lines show number of tasks running (red), percent complete (blue), and cumulative speedup (green). We started by running a worker on one workstation, then another, then on a 32-node cluster, then on the Notre Dame campus grid, then on Condor pools at Purdue and Wisconsin, growing up to nearly 700 CPUs total. About halfway through, we forced a failure by unplugging the workstation running the master. Upon restarting, the master loaded the completed results, and picked up right where it left off.
</p>
<p>
 I'm looking forward to putting our system into a production mode and attacking some really big problems.
</p>
