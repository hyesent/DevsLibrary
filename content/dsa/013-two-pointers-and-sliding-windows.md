---
title: "Two pointers and sliding windows"
order: 13
book: "dsa"
---

# Two pointers and sliding windows

Two pointers use coordinated indices to exploit ordering or a constrained interval. Sliding windows maintain a contiguous range and update its state as one end moves. These techniques can reduce nested-loop solutions from O(n²) to O(n) when each pointer advances only a bounded number of times.

## The core model

For a sorted two-sum problem, compare the sum at the left and right ends and move the pointer that can improve it. For a variable-size window with nonnegative values, expand until a condition is met and shrink while it remains valid. The monotonicity assumption matters: negative values can invalidate common sum-window logic.

## How to reason about it

Maintain window state incrementally—sum, frequency map, distinct count, or maximum structure. Each add/remove operation should be efficient. State the invariant that makes the current window valid and explain why discarded starts never need to be revisited.

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

A common mistake is applying sliding window to a condition that is not monotonic, or forgetting to remove the departing element’s contribution. Be precise about inclusive endpoints and whether an empty window is allowed.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: longest substring without repeated characters, minimum-size subarray with a positive threshold, pair sum in sorted data, and maximum sum over a fixed-width window.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
