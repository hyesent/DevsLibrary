---
title: "Binary search trees and balanced trees"
order: 18
book: "dsa"
---

# Binary search trees and balanced trees

A binary search tree maintains that keys in the left subtree precede the node and keys in the right subtree follow it, according to the comparator. Search, insertion, and deletion take O(h), where h is height; this is O(log n) only when height is logarithmic.

## The core model

Deletion has three major cases: leaf, one child, and two children. In the two-child case, replace with the inorder successor or predecessor, then remove that replacement node from its original location. Duplicate keys require an explicit policy: reject, count multiplicity, or consistently place equal keys on one side.

## How to reason about it

AVL and red-black trees rebalance after updates to bound height. Rotations preserve inorder ordering while changing local shape. B-trees and B+ trees use many keys per node and are especially useful for storage systems and databases because they reduce disk/page accesses.

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

A hand-written tree must preserve every invariant through all rotations and deletion paths. In production, prefer a trusted standard-library ordered map/set unless learning or special constraints justify a custom implementation.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement BST search/insert/delete, trace rotations, and explain why a B-tree is a good fit for disk-backed indexes.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
