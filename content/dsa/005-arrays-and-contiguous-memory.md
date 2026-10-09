---
title: "Arrays and contiguous memory"
order: 5
book: "dsa"
---

# Arrays and contiguous memory

An array stores elements in indexed order, commonly in contiguous memory for fixed-width values. Index access is O(1) because an address can be calculated from a base address and an offset. Searching is O(n) without additional structure; insertion in the middle requires shifting elements and is O(n).

## The core model

Distinguish fixed-size arrays from dynamic arrays. Dynamic arrays maintain a logical length and allocated capacity. When capacity is exhausted, growth usually allocates a larger buffer and copies elements; an individual append can be O(n), while append over many operations is amortized O(1) under geometric growth.

## How to reason about it

Arrays support traversal, two-pointer scans, prefix sums, sliding windows, in-place partitioning, and binary search when sorted. Their locality often makes them faster than pointer-heavy structures even when asymptotic complexity is equal.

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

Common errors include confusing index with length, mutating while iterating, assuming insert-at-front is constant time, and forgetting that slicing may copy data. Language semantics matter: some slices are views, some are copies, and nested arrays may be references.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement reverse-in-place, rotate by k, remove duplicates from a sorted array, merge sorted arrays, and compare repeated front insertion with append.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
