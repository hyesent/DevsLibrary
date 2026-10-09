---
title: "Strings, encodings, and text algorithms"
order: 6
book: "dsa"
---

# Strings, encodings, and text algorithms

A string is a sequence of text units, but the unit differs by language: bytes, UTF-16 code units, Unicode code points, or grapheme clusters. “Character at index i” is not universally one user-perceived character. Text algorithms must state their encoding and normalization assumptions.

## The core model

For ASCII-like restricted input, frequency arrays can count characters efficiently. For general Unicode, use suitable maps or library operations and decide whether comparisons are case-sensitive, normalization-aware, locale-aware, or byte-exact. A visually identical string can have different code-point sequences.

## How to reason about it

Basic string operations include traversal, concatenation, slicing, prefix/suffix checks, substring search, and parsing. Repeated immutable concatenation in a loop can become quadratic; builders or joining a list may be linear overall.

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

Text security and correctness problems include treating bytes as characters, splitting inside multibyte sequences, normalizing only one side of a comparison, and confusing code points with grapheme clusters such as emoji sequences.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: determine whether two strings are anagrams under a stated character model, reverse words while preserving punctuation rules, and explain when byte equality differs from visual equality.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
