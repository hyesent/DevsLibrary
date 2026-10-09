---
title: "Graphs: representations and terminology"
order: 20
book: "dsa"
---

# Graphs: representations and terminology

A graph consists of vertices and edges. Graphs may be directed or undirected, weighted or unweighted, connected or disconnected, and may contain cycles or parallel edges depending on the model. A correct solution begins by identifying these properties.

## The core model

Adjacency lists use O(V+E) memory and are typically best for sparse graphs. An adjacency matrix uses O(V²) memory and offers O(1) edge lookup, making it useful for dense graphs or small fixed vertex sets. Edge lists are convenient for algorithms that process edges globally, such as Kruskal’s algorithm.

## How to reason about it

Clarify whether edges have direction and whether weights may be negative. In a directed graph, reachability is asymmetric. An undirected edge is usually represented in both adjacency lists. For disconnected graphs, a traversal from one source does not visit every vertex.

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

Common failures include confusing vertex IDs with array indices, counting undirected edges twice, assuming connectivity, and using a weighted algorithm on unweighted assumptions. Validate IDs and decide how self-loops and duplicate edges are handled.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: represent the same graph as an adjacency list, matrix, and edge list; compare their memory and operation costs for sparse and dense cases.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
