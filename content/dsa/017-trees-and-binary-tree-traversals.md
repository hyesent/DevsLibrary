---
title: "Trees and binary-tree traversals"
order: 17
book: "dsa"
---

# Trees and binary-tree traversals

A tree is a connected acyclic structure with hierarchical relationships. A binary tree has at most two children per node; a binary search tree adds an ordering invariant. Tree algorithms often depend on whether the tree is balanced, complete, or arbitrary.

## The core model

Depth-first traversals visit nodes in preorder, inorder, or postorder. Inorder traversal of a valid binary search tree produces sorted keys. Breadth-first traversal uses a queue and processes nodes by level. Traversal costs O(n) time and O(h) stack space for depth-first traversal, where h is tree height.

## How to reason about it

Recursive tree code is concise, but iterative traversal makes stack usage explicit. For a skewed tree, h can be n, so recursive traversal may overflow. For each tree routine, define behavior for an empty tree and decide whether the returned quantity is node count, edge count, height, or depth.

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

Do not assume a binary search tree is balanced. Inserting sorted keys into a naive BST can produce O(n) operations. Balanced trees maintain height logarithmic through rotations or other invariants.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement all traversals, compute height and diameter, validate a BST with bounds, and compare recursive versus iterative depth-first traversal.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
