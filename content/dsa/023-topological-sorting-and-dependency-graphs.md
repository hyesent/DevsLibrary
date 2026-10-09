---
title: "Topological sorting and dependency graphs"
order: 23
book: "dsa"
---

# Topological sorting and dependency graphs

A topological ordering of a directed acyclic graph (DAG) places every vertex before its outgoing dependents. It exists only when the graph has no directed cycle. Dependency resolution, build systems, course prerequisites, and task scheduling often reduce to this model.

## The core model

Kahn’s algorithm computes indegrees, queues all zero-indegree vertices, then removes them and decrements neighbors. If fewer than V vertices are output, a cycle exists. DFS-based ordering pushes vertices after processing descendants; reverse finishing order gives a topological order when no cycle is present.

## How to reason about it

Multiple valid orderings may exist. If a deterministic order matters, choose a deterministic queue or priority queue policy. Critical-path calculations can be performed over a DAG by processing vertices topologically and propagating earliest finish times.

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

A common bug is reversing the direction of dependency edges. If task A must happen before B, encode A→B. Define the edge semantics explicitly before implementing the algorithm.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: detect a cycle in course prerequisites, produce a valid build order, and calculate earliest completion time when each task has a duration.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
