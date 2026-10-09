---
title: "Depth-first search and backtracking"
order: 22
book: "dsa"
---

# Depth-first search and backtracking

Depth-first search (DFS) follows one path as far as possible before retreating. It can be implemented recursively or with an explicit stack. DFS supports reachability, connected components, cycle detection, topological sorting, and many structural graph analyses.

## The core model

In directed graphs, cycle detection often distinguishes unvisited, active/on-stack, and finished vertices. Encountering an active vertex indicates a back edge and therefore a directed cycle. For undirected graphs, the parent edge must be treated specially so it is not mistaken for a cycle.

## How to reason about it

Backtracking explores a decision tree: choose a candidate, recurse, then undo the choice. The undo step restores the state for sibling branches. Pruning discards partial candidates that cannot lead to a valid solution. Search can still be exponential, so pruning and constraints are crucial.

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

Recursive DFS can overflow on a long path. Iterative DFS avoids call-stack limits but needs careful handling of when nodes are marked and when children are pushed. Global mutable state can also leak across branches if not restored.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: enumerate subsets, generate permutations without duplicates, solve a grid word search, and detect cycles in directed and undirected graphs.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
