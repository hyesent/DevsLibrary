---
title: "Divide and conquer and recurrence solving"
order: 30
book: "dsa"
---

# Divide and conquer and recurrence solving

Divide and conquer splits a problem into smaller subproblems, solves them, and combines their results. Merge sort and binary search are standard examples. The method is useful when subproblems are smaller and independent enough that recursion reduces total work.

## The core model

A recurrence such as T(n)=aT(n/b)+f(n) describes a recursive algorithm’s cost. The Master Theorem covers common regular cases, but not every recurrence. Recursion-tree analysis and substitution are useful when theorem assumptions do not apply. Include partitioning, combining, and allocation costs in f(n).

## How to reason about it

Quicksort partitions around a pivot; balanced partitions yield O(n log n), while repeatedly poor partitions yield O(n²). Randomized or introspective strategies reduce pathological risk. Divide-and-conquer can also reduce memory movement or enable parallelism.

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

Do not apply the Master Theorem mechanically when subproblem sizes differ greatly, f(n) does not satisfy regularity conditions, or the recurrence is not in the required form. State assumptions about n and rounding.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: derive recurrences for merge sort, binary search, and balanced versus unbalanced quicksort, then solve them using two different methods.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
