---
title: "Disjoint sets and connectivity queries"
order: 36
book: "dsa"
---

# Disjoint sets and connectivity queries

Disjoint-set union maintains a partition of elements into non-overlapping components. Find returns a representative; union merges two components. Path compression and union by rank/size provide nearly constant amortized operation cost across a sequence of operations.

## The core model

DSU is useful for incremental connectivity, Kruskal’s MST algorithm, grouping equivalent items, and detecting whether an edge connects already-connected vertices. Track component count by decreasing it only when a union truly merges distinct roots.

## How to reason about it

Ordinary DSU is designed for merges, not arbitrary splits. If edges can be deleted, offline techniques such as reverse processing or segment-tree-over-time methods may help, but the basic structure alone cannot undo arbitrary unions.

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

A subtle error is attaching a root to a non-root or updating size/rank on every union attempt. Find must return the representative after compression, and union should compare representatives first.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: count connected components, detect a cycle in an undirected edge stream, and compute a minimum spanning forest with Kruskal.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
