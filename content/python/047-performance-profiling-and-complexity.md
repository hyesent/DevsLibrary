---
title: "Performance, Profiling, and Complexity"
order: 47
book: "python"
---

# Performance, Profiling, and Complexity

## Core model

Optimization should begin with measurement because intuition often misidentifies the bottleneck. Profiling reveals where CPU time is spent; memory profiling reveals allocation and retention patterns; benchmarks compare specific workloads. A microbenchmark can mislead when it does not represent production data or end-to-end overhead.

## How it behaves in real code

Algorithmic complexity explains how work scales, but constant factors, I/O, allocation, cache behavior, and interpreter overhead also matter. Replacing a clear algorithm with a complex one is justified only when evidence shows a meaningful bottleneck and tests preserve behavior.

## Reasoning exercise

Record a baseline, profile realistic input, change one cause, and measure again. Include latency distribution and memory use where relevant, not just average runtime on a tiny sample.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
