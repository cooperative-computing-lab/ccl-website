---
layout: post
title: "Demystifying Cluster Storage: CephFS, Scratch, and I/O Bottlenecks"
date: 2026-09-01T12:00:00-05:00
author: Cooperative Computing Lab
image: /assets/blog/2026/cluster-storage/beginners-guide-to-hpc.png

categories:
  - technical-articles
tags:
  - hpc
  - storage
  - cephfs
  - io-performance
  - scratch
description: Understand shared parallel filesystems vs. local storage, why small files crash metadata servers, and how to optimize your job's I/O performance.
toc: false
related_posts: false
---

<div class="row justify-content-sm-center">
  <div class="col-sm-12">
    {% include figure.liquid path="/assets/blog/2026/cluster-storage/beginners-guide-to-hpc.png" title="" class="img-fluid rounded z-depth-1" zoomable=true %}
  </div>
</div>

---

Shared network filesystems, CephFS, Lustre, or NFS, are the backbone of high-performance computing clusters. They allow hundreds of compute nodes to seamlessly read and write to the same central directories simultaneously.

However, shared parallel storage operates under vastly different physical constraints than a local laptop SSD. When users treat shared network storage like a personal hard drive, they often encounter mysterious slowdowns, hit unexpected quota limits, or bring storage responsiveness to a crawl for the entire cluster.

## The Small File Problem: Why 100,000 Small Files Destroy Performance

Parallel network filesystems are optimized for **high bandwidth throughput**, meaning they excel at streaming massive, multi-gigabyte files (like large dataset archives or continuous checkpoint files) across dedicated network hardware.

They perform poorly, however, when handling **small file I/O operations**.

### Metadata Bottlenecks Explained

Every file creation, directory listing, read, write, and deletion request requires a communication step with the filesystem's **Metadata Server (MDS)**. The MDS tracks file ownership, directory trees, permissions, and physical storage locations (inodes).

* Writing **one 10GB binary file** requires **1 metadata request** to allocate space, followed by continuous high-speed data streaming.
* Writing **100,000 tiny 100KB log files** requires **100,000 individual metadata requests**, forcing the MDS server to handle constant network handshakes and lock updates.

When a batch job generates thousands of tiny intermediate files or reads an uncompressed dataset of tiny images directly from shared storage, the metadata server becomes overloaded. This creates massive I/O latency, causing job execution to stall and slowing down directory navigation cluster-wide.

## Decoding Storage Quotas: Capacity vs. Inodes

When a job fails with `Disk quota exceeded` or `No space left on device`, your immediate instinct is to check your disk space usage. But cluster storage quotas track two completely separate limits:

1. **Block Quota (Capacity):** The physical amount of raw data storage allocated to your user or project (measured in GB or TB).
2. **Inode Quota (File Count):** The total number of individual files and directories allowed in your space, regardless of file size.

Creating hundreds of thousands of small logs, virtual environments, or temporary output files will max out your **Inode quota** long before you consume your block storage allocation. Once your inode limit is reached, the operating system blocks the creation of new files—even if you have terabytes of unused disk space remaining.

## Leveraging Node-Local `/tmp` Space Safely

To bypass network latency, protect metadata servers, and prevent quota exhaustion, heavy file operations should take place on **node-local storage** (such as fast local NVMe or SSD drives mounted at `/tmp` or `$TMPDIR`).

Node-local storage sits directly inside the compute node hosting your job, bypassing the shared network network entirely.

### The Recommended Node-Local Workflow Pattern:

Structure your submission script to stage files locally during job execution:

```sh
#!/bin/bash
#SBATCH --job-name=fast_io_job

# 1. Define a temporary directory unique to this job on local node storage
LOCAL_DIR="/tmp/$USER/$SLURM_JOB_ID"
mkdir -p "$LOCAL_DIR"

# 2. Copy and uncompress input datasets from central storage to local storage
cp /scratch/username/dataset.tar.gz "$LOCAL_DIR/"
tar -xzf "$LOCAL_DIR/dataset.tar.gz" -C "$LOCAL_DIR/"

# 3. Execute your program using local /tmp paths for input and intermediate output
python3 my_training_script.py --data-dir "$LOCAL_DIR/dataset" --out-dir "$LOCAL_DIR/output"

# 4. Pack final results into a single archive file and move back to shared storage
tar -czf "$LOCAL_DIR/final_results.tar.gz" -C "$LOCAL_DIR/output" .
cp "$LOCAL_DIR/final_results.tar.gz" /scratch/username/results/job_${SLURM_JOB_ID}_results.tar.gz

# 5. Clean up local node space before exiting
rm -rf "$LOCAL_DIR"
```

---

## Summary: The Cluster Storage Hygiene Checklist

1. **Avoid uncompressed datasets.** Bundle datasets into a single archive (`.tar`, `.zip`, `.h5`, or `.sqlite`) before transferring them to shared storage.
2. **Monitor both quota metrics.** Check both your byte allocation and file count allocations using your cluster's quota tools (e.g., `myquota` or `ceph df`).
3. **Stage temporary files on `/tmp`.** Use local node storage (`$TMPDIR` or `/tmp`) for fast read/write operations during execution.
4. **Aggregate output logs.** Buffer runtime output in memory or write progress to a single structured log file rather than generating individual files per iteration.
5. **Always clean up local directories.** Include explicit cleanup commands (`rm -rf`) in your job script to ensure local scratch disk space stays clean for subsequent users.
