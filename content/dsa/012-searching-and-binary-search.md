---
title: "Searching and binary search"
order: 12
book: "dsa"
---

# Searching and binary search

Linear search checks candidates one by one and works without ordering. Binary search repeatedly halves a monotonic search interval, achieving O(log n) comparisons, but requires a sorted or otherwise monotonic predicate. Binary search is not simply “find an item in a sorted array”; it can find the boundary where a condition changes from false to true.

## The core model

Choose an interval convention and preserve it. For a closed interval [lo, hi], the loop and updates differ from a half-open interval [lo, hi). Compute mid as lo + (hi-lo)//2 in fixed-width integer environments to avoid overflow. Decide how duplicates should be handled: any match, first match, or insertion point.

## How to reason about it

A lower-bound search finds the first position whose value is at least target; upper-bound finds the first position greater than target. These primitives answer count-in-range queries and insertion-position problems. Binary search on answer applies when feasibility is monotonic across candidate answers.

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

Typical bugs are infinite loops from incorrect updates, excluding a possible answer, using binary search on a non-monotonic predicate, and assuming duplicates are unique. Write the invariant and return meaning before coding.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement lower bound, upper bound, first and last occurrence, rotated-array search, and minimum feasible capacity for a monotonic feasibility predicate.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
