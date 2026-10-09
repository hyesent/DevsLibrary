---
title: "Dynamic programming: recognize the shape"
order: 26
book: "dsa"
---

# Dynamic programming: recognize the shape

Dynamic programming (DP) applies when a problem has overlapping subproblems and an optimal substructure or recurrence that combines smaller states. A state must capture exactly the information needed to determine future decisions; a recurrence defines how states depend on smaller states.

## The core model

Top-down memoization computes only states reached by recursion and caches results. Bottom-up tabulation chooses an order in which dependencies are already available. Define base cases, state meanings, transition equations, and answer extraction explicitly. A vague state definition is the most common source of wrong DP.

## How to reason about it

Estimate complexity as number of distinct states multiplied by work per state. A two-dimensional DP over n and capacity C often costs O(nC), which is pseudo-polynomial because C’s numeric value—not its bit-length—controls work. Memory can sometimes be reduced by retaining only the prior rows, but iteration direction may then become essential.

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

DP is not a magic label for any recursive problem. If subproblems do not overlap, divide-and-conquer may be simpler. If the state omits information that affects future choices, the recurrence may appear plausible but be incorrect.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: define states and transitions for climbing stairs, coin change, and longest common subsequence before writing code.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
