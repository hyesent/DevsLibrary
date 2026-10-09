---
title: "Monotonic stacks and queues"
order: 33
book: "dsa"
---

# Monotonic stacks and queues

A monotonic stack keeps values in increasing or decreasing order by removing dominated entries as new values arrive. This enables next-greater/smaller queries, histogram area, and span calculations in linear total time even when an obvious nested loop is quadratic.

## The core model

For next greater element, scan left to right and pop indices whose values are smaller than the current value; the current element is their first greater element. Store indices rather than values when positions or widths are needed. Decide whether equal values should pop based on strict versus non-strict comparisons.

## How to reason about it

A monotonic deque supports sliding-window minima or maxima. Remove expired indices from the front and dominated indices from the back. Each index enters and leaves at most once, giving O(n) time.

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

Off-by-one width errors are common in histogram problems: when a bar is popped, determine the nearest smaller boundary on each side and compute width accordingly. Duplicates require consistent tie rules.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: next greater element, daily temperatures, largest rectangle in a histogram, and sliding-window maximum.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
