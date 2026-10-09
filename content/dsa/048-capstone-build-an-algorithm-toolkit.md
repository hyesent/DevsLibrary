---
title: "Capstone: build an algorithm toolkit"
order: 48
book: "dsa"
---

# Capstone: build an algorithm toolkit

A toolkit capstone should demonstrate reusable implementations with explicit contracts, complexity notes, tests, and clear failure behavior. Select a compact but coherent set: binary search, union-find, heap, BFS/DFS, topological sort, Dijkstra, and a DP example.

## The core model

For every implementation, document accepted input shapes, mutation behavior, duplicate handling, numeric assumptions, complexity, and unsupported cases. Keep interfaces small and separate data representation from algorithm logic so that tests can substitute different graphs or arrays.

## How to reason about it

Build a test suite with ordinary examples, boundary cases, randomized small cases, and cross-checks against simple reference implementations. Add benchmarks only after correctness is stable. If a language has a trusted standard library implementation, compare behavior and performance rather than assuming your version is better.

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

The capstone is not complete merely because code runs. Review naming, invariants, test coverage, overflow, memory behavior, and whether complexity claims match the actual implementation. Include a short design note explaining trade-offs.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Deliverable: a small documented library, tests, example usage, complexity table, and a retrospective listing the hardest bugs and the evidence used to resolve them.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
