---
title: "Correctness, invariants, and proof"
order: 3
book: "dsa"
---

# Correctness, invariants, and proof

A correct algorithm returns the required answer for every input allowed by its contract. Examples increase confidence; a proof explains why the method works generally. Loop invariants state a property that remains true at a specific point in each iteration.

## The core model

A loop-invariant proof has initialization, maintenance, and termination. Show the property holds before the first iteration, that one iteration preserves it, and that termination plus the invariant implies the desired result. For binary search, an invariant can maintain that the target—if present—lies inside the current candidate interval.

## How to reason about it

For recursive algorithms, prove a base case and an inductive step: smaller valid subproblems are solved correctly, and combining them produces the correct result for the original problem. State the measure that decreases so recursion terminates.

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

Watch boundary semantics. Is an interval closed [lo, hi] or half-open [lo, hi)? Mixing these conventions creates off-by-one errors. Define what each variable means and update it to preserve that meaning.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: prove linear search, binary search, and maximum-finding correct. For each, write the invariant before writing code.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
