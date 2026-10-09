---
title: "Complexity analysis and asymptotic thinking"
order: 2
book: "dsa"
---

# Complexity analysis and asymptotic thinking

Complexity describes how resource use grows as input size grows. Time complexity counts a model of operations; space complexity distinguishes total memory from auxiliary memory. Big O is an asymptotic upper bound, not a stopwatch measurement and not automatically a tight bound.

## The core model

For a loop over n items, work is typically linear. Two nested loops each running n times often produce n² work. Repeatedly halving a search interval yields logarithmic work. Sequential phases add their costs; nested phases multiply only when their iteration counts actually depend on one another.

## How to reason about it

Use O, Ω, and Θ carefully: O bounds growth from above, Ω from below, and Θ gives a tight asymptotic bound. Analyze best, average, and worst cases when they differ. A hash table may be expected O(1) per lookup under assumptions while its pathological worst case can be worse.

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

Space analysis should account for recursion stacks, copied arrays, hash tables, output storage, and hidden allocations. An algorithm returning n results cannot use less than Ω(n) output space if all results must be materialized, though auxiliary space can still be O(1).

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: count operations for nested loops with triangular bounds, compare n log n and n² at increasing n, and explain why constant factors still matter for small inputs.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
