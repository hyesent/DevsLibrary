---
title: "Intervals, sweep lines, and event ordering"
order: 34
book: "dsa"
---

# Intervals, sweep lines, and event ordering

Interval problems depend on endpoint semantics: [a,b], [a,b), and (a,b] behave differently when endpoints touch. State whether intervals represent continuous time, discrete indices, or resources and whether touching intervals overlap.

## The core model

Sorting by start or end simplifies merging, scheduling, and conflict detection. Sweep-line algorithms convert geometric or temporal events into ordered points and maintain active state. Event tie-breaking is critical: for half-open intervals, an end at t may be processed before a start at t; for closed intervals, overlap semantics differ.

## How to reason about it

Coordinate compression maps a large set of distinct coordinates to compact indices while preserving order. It is useful for range queries, Fenwick trees, and segment trees when only relative order matters, not the numeric gaps.

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

A frequent bug is using <= in one comparison and < in another without considering the endpoint model. Negative coordinates and large coordinate ranges can also overflow naive array-based representations.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: merge intervals, determine minimum meeting rooms, count overlaps with a sweep line, and explain how tie order changes the answer.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
