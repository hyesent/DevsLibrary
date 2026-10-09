---
title: "Backtracking, constraint search, and pruning"
order: 31
book: "dsa"
---

# Backtracking, constraint search, and pruning

Backtracking incrementally constructs a candidate and abandons it when it can no longer lead to a valid solution. The search tree represents choices; constraints reject partial assignments; pruning uses stronger reasoning to avoid exploring branches that cannot improve or complete a solution.

## The core model

A clean pattern is choose, recurse, unchoose. The unchoose step must restore every piece of state modified by the choice. For optimization, branch-and-bound tracks the best complete solution and uses a bound to prune any partial state that cannot beat it.

## How to reason about it

Order choices to expose contradictions early, use constraint propagation where possible, and exploit symmetry to avoid equivalent branches. A promising heuristic can improve practical search time without changing correctness if it only changes exploration order.

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

Search remains exponential in the worst case for many NP-hard problems. Do not promise polynomial performance based on a few easy examples. Distinguish pruning that is logically safe from a heuristic cutoff that can sacrifice completeness or optimality.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: solve N-Queens, Sudoku-style constraints, and subset sum. Document the state, choices, constraints, and exact condition that makes pruning safe.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
