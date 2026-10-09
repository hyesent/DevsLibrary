---
title: "String matching: KMP, Z, and rolling hashes"
order: 37
book: "dsa"
---

# String matching: KMP, Z, and rolling hashes

Naive substring search compares a pattern at every possible starting position and can take O(nm). KMP preprocesses a prefix-function table so mismatches reuse information already learned, achieving O(n+m) time. The Z algorithm computes the longest prefix match starting at each position.

## The core model

The prefix function for a pattern records the longest proper prefix that is also a suffix for each prefix. On mismatch, KMP falls back to a shorter border instead of restarting from zero. Carefully distinguish pattern index and text index and define the empty-pattern behavior.

## How to reason about it

Rolling hashes map substrings to numeric fingerprints so equality checks can be fast after prefix-hash preprocessing. Hash collisions are possible, so use adequate moduli or double hashing and verify candidates when correctness is critical. Suffix arrays and suffix automata support richer string queries at higher implementation complexity.

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

String matching edge cases include repeated prefixes, overlapping matches, empty patterns, Unicode normalization, and hash overflow. Do not assume a hash is a proof of equality.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement KMP and Z, find all overlapping pattern matches, and compare exact matching with a rolling-hash approach.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
