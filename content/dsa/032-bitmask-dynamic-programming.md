---
title: "Bitmask dynamic programming"
order: 32
book: "dsa"
---

# Bitmask dynamic programming

Bitmask DP encodes a subset of a small universe as bits in an integer. A state such as dp[mask] can represent the best result after selecting exactly the items in mask. Adding or removing an element becomes a bit operation, and iterating submasks supports subset transitions.

## The core model

A common assignment DP uses dp[mask] where the number of set bits determines the next person or task. Each state may try every unselected choice, yielding O(n·2^n) time and O(2^n) memory. Subset convolution-style algorithms can be more complex and need careful constraints.

## How to reason about it

Bitmask DP is effective for small n—often around 20, depending on transition cost and language memory—because 2^n grows quickly. It can solve travelling-salesperson variants, assignment, subset partition, and state-compression puzzles.

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

Ensure masks fit the integer width and avoid confusing a mask’s numeric value with the number of elements it contains. Use popcount or a maintained count, and define whether the empty subset is a valid state.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: count subsets with a property, solve a small assignment problem, and formulate Held–Karp DP for travelling salesperson.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
