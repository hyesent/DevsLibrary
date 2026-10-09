---
title: "Threads, Processes, and the GIL"
order: 42
book: "python"
---

# Threads, Processes, and the GIL

## Core model

Threads share one process's memory and are useful for overlapping blocking I/O, but shared state creates coordination hazards. Processes have separate memory and can use multiple CPU cores for CPU-bound work, at the cost of startup and inter-process communication. The Global Interpreter Lock in standard CPython affects execution of Python bytecode across threads, though behavior depends on Python version, build, and native extensions.

## How it behaves in real code

A lock can prevent races but also introduce contention and deadlocks. Process workers require arguments and results to cross a serialization boundary in common designs, so large objects may be expensive to transfer. Concurrency is not automatically faster if the work is too small or coordination dominates.

## Reasoning exercise

Measure the bottleneck first. Choose threads for blocking I/O overlap, processes for suitable CPU-bound tasks, and async I/O for many concurrent waits supported by async libraries. Make shared-state ownership explicit.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
