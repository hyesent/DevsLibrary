---
title: "Shortest paths: Dijkstra, Bellman–Ford, and beyond"
order: 24
book: "dsa"
---

# Shortest paths: Dijkstra, Bellman–Ford, and beyond

Shortest-path algorithms depend on edge weights. BFS solves unweighted or equal-weight edges. Dijkstra solves nonnegative weighted graphs by repeatedly finalizing the smallest tentative distance. Bellman–Ford supports negative edges and can detect reachable negative cycles.

## The core model

Dijkstra uses a min-priority queue and relaxes edges: if dist[u]+w improves dist[v], update the distance and predecessor. Many implementations insert updated entries instead of decrease-key; ignore stale queue entries when popped. The usual complexity with a binary heap is O((V+E) log V).

## How to reason about it

Bellman–Ford relaxes all edges V−1 times; a further improvement indicates a reachable negative cycle. Floyd–Warshall computes all-pairs shortest paths in O(V³) time and O(V²) memory, appropriate only for relatively small dense graphs. Choose the algorithm from graph size, density, and weight constraints.

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

Never use Dijkstra when negative edges are possible without a proven alternative condition. Avoid overflow when adding large distances, and represent unreachable vertices separately from a legitimate numeric distance.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement Dijkstra with parent reconstruction, compare it to Bellman–Ford on negative edges, and use Floyd–Warshall on a small matrix.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
