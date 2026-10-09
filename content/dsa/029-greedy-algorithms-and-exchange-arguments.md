---
title: "Greedy algorithms and exchange arguments"
order: 29
book: "dsa"
---

# Greedy algorithms and exchange arguments

A greedy algorithm makes a locally preferred choice and commits to it. Greedy methods can be efficient, but a locally attractive choice is not automatically globally optimal. A proof must establish why an optimal solution can be transformed to include the greedy choice without becoming worse.

## The core model

Common proof tools include exchange arguments, cut properties, stays-ahead arguments, and matroid structure. Interval scheduling by earliest finishing time is a classic greedy strategy because choosing the earliest finish leaves maximum room for later compatible intervals.

## How to reason about it

Greedy algorithms work for activity selection, Huffman coding, some scheduling problems, and MSTs, but fail for many coin systems and knapsack variants. Test candidate strategies against brute force on small inputs to discover counterexamples before attempting a proof.

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

The most common mistake is presenting examples as proof. Another is selecting the wrong local score—shortest duration, highest value, earliest deadline, and best value/weight ratio solve different objective structures.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: prove interval scheduling, find a counterexample to a greedy coin strategy, and compare fractional knapsack with 0/1 knapsack.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
