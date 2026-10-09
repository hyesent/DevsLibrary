---
title: "Bit manipulation and bitsets"
order: 15
book: "dsa"
---

# Bit manipulation and bitsets

Bits encode powers of two in a binary representation. AND tests shared set bits, OR combines them, XOR toggles differing bits, and NOT flips bits subject to the language’s integer width and signed representation. A bit mask can represent a small set compactly.

## The core model

Common operations include testing bit k with x & (1<<k), setting it with x | (1<<k), clearing it with x & ~(1<<k), and toggling it with x ^ (1<<k). In languages with fixed-width integers, shifts by the width or into a sign bit can have special or undefined behavior; use documented semantics.

## How to reason about it

XOR has useful identities: x^x=0 and x^0=x, making it helpful for parity and certain single-unique-element problems. Bitsets can accelerate membership and set operations when the universe is bounded and dense enough.

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

Bit tricks can obscure intent. Avoid clever arithmetic unless it is justified by constraints, and test negative numbers, overflow, shift widths, and language-specific operator precedence. Arbitrary-precision integers behave differently from fixed-width machine integers.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: count set bits, test power-of-two values, represent a permission set, and compare a bitset approach with a hash set for a bounded universe.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
