---
title: "Parallel algorithms and work-span reasoning"
order: 57
book: "dsa"
---

# Parallel algorithms and work-span reasoning

Parallel algorithms distribute work across processors, but speedup depends on available parallelism, communication, synchronization, and memory bandwidth. Amdahl’s law bounds speedup when part of the workload is inherently serial.

## The core model

Work is total operations; span is the longest dependency chain. Parallel execution time is bounded below by both work divided by processor count and span. Divide-and-conquer algorithms often expose parallelism, while shared mutable state can introduce contention.

## How to reason about it

Parallel reductions need associative operations for safe regrouping. Floating-point addition is not perfectly associative, so parallel results can differ slightly from sequential ones. Determinism, reproducibility, and race freedom are design requirements, not optional polish.

Treat the representation and its invariant as the center of the design. First state what each variable, node, index, or state means. Then identify the operation that preserves that meaning. If the algorithm has repeated steps, explain why each step makes progress and why no valid answer is lost. For complexity, count the dominant operations and include storage that the implementation actually allocates.

A useful review checklist is:

1. What exact input and output contract is promised?
2. Which assumptions make this technique valid?
3. What invariant must remain true after each step?
4. What happens for empty, minimal, duplicate, extreme, or malformed inputs?
5. What is the worst-case time and auxiliary space, and which assumptions support the bound?
6. Is there a simpler reference implementation that can act as a correctness oracle?

## Worked reasoning pattern

Consider a small example and trace the state after every meaningful operation. Do not skip the transition that seems obvious: that is often where off-by-one, duplicate-handling, or invariant bugs hide. After the trace, explain why the same transition works for an arbitrary valid input rather than only for the chosen example.

When implementing in a real language, check integer width, recursion limits, collection semantics, mutation behavior, and library guarantees. Pseudocode can express the idea, but production correctness depends on language-specific details as well.

## Failure modes and trade-offs

More threads do not guarantee lower latency. Scheduling overhead, false sharing, synchronization, and oversubscription can make a parallel version slower for small tasks.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: estimate the maximum speedup from a serial fraction, design a parallel map-reduce pipeline, and identify races in a shared accumulator.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
