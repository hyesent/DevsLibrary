---
title: "Linked lists and pointer reasoning"
order: 7
book: "dsa"
---

# Linked lists and pointer reasoning

A linked list stores nodes connected by references. A singly linked node points to the next node; a doubly linked node also points backward. Accessing the k-th element requires traversal, so indexed access is O(n), while insertion or deletion at a known node can be O(1) if the necessary links are available.

## The core model

Track head, tail, and sometimes length explicitly. Empty, one-node, and two-node lists are special cases worth testing. To delete a node from a singly linked list, the predecessor is usually needed to redirect its next pointer. A tail pointer makes append O(1) but must be updated on deletion of the final node.

## How to reason about it

Fast/slow pointers can find a midpoint or detect a cycle. Reversing a list iteratively requires preserving the next reference before redirecting a link; otherwise the remainder becomes unreachable. Dummy/sentinel nodes can simplify edge cases by making head insertion look like an ordinary insertion.

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

Linked lists are not automatically faster than arrays: allocation overhead, poor cache locality, and pointer chasing can make them slower in practice. They are useful when structural insertion/deletion is central and nodes are already located.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: reverse a list, find its midpoint, detect a cycle with Floyd’s algorithm, merge sorted lists, and remove the n-th node from the end.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
