---
title: "Amortized analysis"
order: 41
book: "dsa"
---

# Amortized analysis

Amortized analysis bounds the average cost per operation over a sequence, without assuming random inputs. It explains why a dynamic-array append may be occasionally expensive but cheap on average over many appends.

## The core model

The aggregate method sums total cost across n operations and divides by n. The accounting method assigns credits to operations to pay for future expensive work. The potential method defines a stored potential Φ and amortized cost as actual cost plus change in potential; potential must be bounded appropriately.

## How to reason about it

Dynamic array growth by a constant factor yields O(1) amortized append. A stack with multipop also has O(1) amortized cost per pushed element because each item can be popped at most once. Amortized guarantees are not the same as average-case analysis over a probability distribution.

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

Do not claim every operation is O(1) because amortized complexity is O(1); one operation may still cost O(n). The guarantee applies to sequences and the assumptions of the resizing policy.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: prove dynamic-array append amortized O(1), analyze a stack with multipop, and derive a potential function for a simple queue built from two stacks.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
