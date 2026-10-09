---
title: "Tries and prefix search"
order: 19
book: "dsa"
---

# Tries and prefix search

A trie stores keys by shared prefixes. Each edge represents a symbol, and a terminal marker distinguishes a complete key from a prefix of another key. Search and insertion are O(L) in key length L, assuming child lookup is O(1) or otherwise accounted for.

## The core model

Tries support autocomplete, dictionary lookup, routing prefixes, and prefix enumeration. A simple node with a map of children is flexible but can be memory-heavy. Alternatives include fixed child arrays for small alphabets, compressed/radix tries that merge single-child paths, and ternary search tries.

## How to reason about it

Define normalization rules before inserting text: case folding, Unicode normalization, and tokenization determine whether two inputs share a path. Deletion should remove terminal status and prune nodes only when they no longer represent a key or prefix needed by another key.

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

A trie is not always better than a hash map. Hash maps are often more compact for exact lookup, while tries shine when prefix operations are frequent. Measure memory, alphabet size, and key distribution.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: implement insert/search/startsWith, list words for a prefix, and add deletion without breaking longer words that share the prefix.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
