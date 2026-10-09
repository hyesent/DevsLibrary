---
title: "Fenwick trees and segment trees"
order: 35
book: "dsa"
---

# Fenwick trees and segment trees

A Fenwick tree (binary indexed tree) supports prefix aggregation and point updates in O(log n) using the binary structure of index values. It is compact and especially effective for sums or other suitable associative operations with appropriate update semantics.

## The core model

A segment tree stores aggregate information over intervals. It supports point updates and range queries in O(log n); lazy propagation can support range updates when the aggregate and update operation can be composed correctly. The tree’s node meaning and merge operation must be defined explicitly.

## How to reason about it

Fenwick trees are simpler for prefix sums and can support range sums through prefix differences. Segment trees are more flexible for min/max, gcd, custom aggregates, and range updates. Iterative segment trees can reduce recursion and improve constant factors.

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

Not every operation supports every update strategy. For example, a prefix-min Fenwick tree cannot generally handle arbitrary increases and decreases the same way it handles additive sums. Lazy propagation bugs often come from applying updates to children twice or forgetting to push pending state.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement point-update/range-sum with Fenwick, range-min with segment tree, and range-add/range-sum with lazy propagation.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
