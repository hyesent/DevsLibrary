---
title: "Minimum spanning trees and union-find"
order: 25
book: "dsa"
---

# Minimum spanning trees and union-find

A spanning tree connects all vertices of a connected undirected graph without cycles. A minimum spanning tree (MST) minimizes the total weight among spanning trees. Kruskal sorts edges and accepts an edge when it joins two different components; Prim grows one tree by choosing the lightest crossing edge.

## The core model

Disjoint-set union (DSU), also called union-find, supports find and union operations. Path compression and union by size/rank make operations nearly constant amortized time. Kruskal’s sorting dominates at O(E log E). Prim is often implemented with a priority queue and adjacency lists.

## How to reason about it

If the graph is disconnected, Kruskal returns a minimum spanning forest rather than one spanning tree. Negative edge weights are allowed for MSTs. Do not confuse an MST with a shortest-path tree: the former minimizes total tree weight, the latter minimizes distance from a source.

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

DSU represents components, not arbitrary path distances. Union operations must only merge roots; incorrect parent updates can corrupt the structure. For dynamic edge deletions, ordinary DSU is not sufficient.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement DSU, run Kruskal by hand, compare Prim and Kruskal on sparse and dense graphs, and explain why MST and shortest-path objectives differ.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
