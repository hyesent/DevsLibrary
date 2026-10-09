---
title: "Matrices and multidimensional arrays"
order: 50
book: "dsa"
---

# Matrices and multidimensional arrays

A matrix is an indexed grid, but its storage layout may be row-major, column-major, or nested independent arrays. A traversal’s index order affects cache locality. Rectangular grids, ragged arrays, and sparse matrices are distinct representations with different invariants.

## The core model

For grid algorithms, define whether coordinates are (row,column), what counts as a neighbor, and how boundaries are handled. Four-direction and eight-direction adjacency produce different graphs. Flattening a grid can map (r,c) to r*width+c when rows have equal width.

## How to reason about it

Two-dimensional prefix sums answer rectangle sums using inclusion-exclusion. In-place rotation, transpose, and spiral traversal require careful index bounds. Sparse matrices often use coordinate lists, CSR, or CSC representations to avoid storing zeros.

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

Confusing row and column limits or using height where width belongs creates bugs that may pass square-grid tests. Always include non-square grids and empty dimensions.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: rotate a matrix, traverse a grid, compute rectangle sums, and count connected components in a binary matrix.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
