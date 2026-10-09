---
title: "Stacks and queues"
order: 8
book: "dsa"
---

# Stacks and queues

A stack is last-in, first-out; a queue is first-in, first-out. Typical operations—push/pop and enqueue/dequeue—can be O(1) with appropriate representations. Stacks model nested work and undo histories; queues model arrival order, breadth-first search, and producer-consumer pipelines.

## The core model

A stack can be implemented with a dynamic array or linked nodes. A queue implemented by shifting an array on every dequeue is inefficient; use a circular buffer, a linked queue with head/tail pointers, or a deque. A circular buffer maps logical positions into a fixed buffer with modular arithmetic.

## How to reason about it

Monotonic stacks and queues maintain values in increasing or decreasing order to answer next-greater, next-smaller, sliding-window maximum, and histogram problems. Their linear performance comes from each element being inserted and removed at most once.

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

Common failures are popping an empty stack, confusing queue ends, mishandling wraparound, and using a general-purpose list operation that shifts all remaining elements. State what the structure’s front and back mean.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: validate brackets, evaluate postfix expressions, implement a queue with two stacks, and find the maximum of each window of width k.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
