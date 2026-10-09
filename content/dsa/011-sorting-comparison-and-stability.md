---
title: "Sorting: comparison and stability"
order: 11
book: "dsa"
---

# Sorting: comparison and stability

Sorting orders elements according to a comparison relation. A comparator should be consistent and ideally define a strict weak ordering; inconsistent comparisons can make library sorts behave unpredictably. Stability means equal-key elements preserve their original relative order.

## The core model

Insertion sort is simple and adaptive for small or nearly sorted arrays, with O(n²) worst-case time. Merge sort has O(n log n) time and stable behavior when ties are merged carefully, usually using O(n) auxiliary storage for arrays. Quicksort is often fast in practice but has O(n²) worst-case behavior without safeguards.

## How to reason about it

Heapsort provides O(n log n) worst-case time and O(1) auxiliary array space in typical implementations, but is not stable. Production libraries may use hybrid algorithms to combine fast average performance, stable guarantees, and robust worst-case behavior.

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

Sorting is often a preprocessing step that simplifies later tasks: deduplication, interval merging, two-pointer scans, ranking, and binary search. Account for whether the input may be mutated and whether a stable order is needed.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: compare algorithms by worst-case time, memory, stability, and adaptiveness; sort records by multiple keys while preserving intended tie-breaking.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
