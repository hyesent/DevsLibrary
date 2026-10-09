---
title: "Heaps and priority queues"
order: 16
book: "dsa"
---

# Heaps and priority queues

A binary heap is a complete binary tree commonly stored in an array. In a min-heap, each parent is no greater than its children. The root exposes the minimum; insertion and removal restore heap order in O(log n), while building a heap from an array can be O(n).

## The core model

For zero-based arrays, children of i are 2i+1 and 2i+2, and parent is floor((i-1)/2). Sift-up repairs after insertion; sift-down repairs after removing the root. A priority queue does not keep the entire array sorted—it guarantees only the parent-child heap property.

## How to reason about it

Heaps solve top-k, scheduling, merging sorted streams, Dijkstra’s algorithm, and event simulation. For top-k, choose min-heap or max-heap according to whether you want to retain the largest or smallest k elements. Lazy deletion can handle priorities that change when the heap API does not support efficient arbitrary updates.

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

A common mistake is assuming arbitrary search is O(log n); finding a particular non-root value is generally O(n). Tie-breaking may also matter: store a secondary sequence number when stable order among equal priorities is required.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement a min-heap, find the k largest values, merge k sorted lists, and simulate a task scheduler with priorities and tie-breaking.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
