---
title: "Choosing the right algorithm under constraints"
order: 58
book: "dsa"
---

# Choosing the right algorithm under constraints

The same task may have several valid solutions with different time, memory, simplicity, and reliability trade-offs. Constraints should drive the choice: n, value range, graph density, update frequency, memory ceiling, latency target, and whether inputs are adversarial.

## The core model

For small n, a clear O(n²) method can outperform a complex O(n log n) implementation. For large numeric targets, O(nC) DP may be impractical despite a modest item count. Sparse graphs favor adjacency lists; dense graphs may favor matrices or Floyd–Warshall for all-pairs distances.

## How to reason about it

Consider the cost of preprocessing and how often it is reused. Sorting once can be worthwhile for many queries; it may not be for a single query. Consider online versus offline access and whether the solution must support dynamic updates.

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

A common interview failure is jumping directly to a memorized pattern. State the constraints, choose a baseline, justify the optimization, and mention what would change if assumptions changed.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: compare at least two approaches for five tasks and record the input ranges where each is reasonable.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
