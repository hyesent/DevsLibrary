---
title: "Breadth-first search"
order: 21
book: "dsa"
---

# Breadth-first search

Breadth-first search (BFS) explores a graph in layers from a source using a queue. In an unweighted graph, the first discovered distance to a vertex is the minimum number of edges from the source. With adjacency lists, BFS runs in O(V+E).

## The core model

Mark vertices when they are enqueued, not only when dequeued, to avoid inserting the same vertex repeatedly. Store a distance array and optionally a parent array to reconstruct shortest paths. For disconnected graphs, run BFS from every unvisited vertex if the task requires a full traversal.

## How to reason about it

BFS is appropriate for minimum-hop routes, level order, bipartite checking, grid movement with uniform edge costs, and multi-source distance fields. Multi-source BFS enqueues all starting points at distance zero, then expands outward.

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

BFS does not solve general weighted shortest paths. If edge costs differ, use an algorithm designed for weights; if all weights are 0 or 1, 0–1 BFS with a deque can be appropriate.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: shortest path in a maze, level of each node, nearest source in a grid, and reconstruct a shortest path using parent pointers.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
