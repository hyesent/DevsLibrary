---
title: "Hash tables and hash sets"
order: 9
book: "dsa"
---

# Hash tables and hash sets

A hash table maps keys to storage locations using a hash function and collision-resolution strategy. A set stores unique membership; a map associates keys with values. Lookup, insertion, and deletion are expected O(1) under suitable hash distribution and load-factor assumptions, not an unconditional worst-case guarantee.

## The core model

Collisions occur when distinct keys map to the same bucket. Chaining stores multiple entries per bucket; open addressing searches alternative slots. Resizing controls load factor but costs O(n) during a resize, usually amortized across operations. Hashing and equality must agree: equal keys must produce equal hashes.

## How to reason about it

Hash structures are powerful for frequency counting, deduplication, membership checks, grouping, and complement lookup. They trade ordering and memory for speed. If deterministic ordering or range queries are required, a sorted array or balanced search tree may fit better.

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

Pitfalls include mutable keys whose hash-relevant state changes, poor custom hashes, accidentally relying on iteration order, adversarial keys, and assuming average-case guarantees in a hostile environment. Language runtimes may randomize hashing for security.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: build a frequency map, find the first repeated item, group anagrams, and solve two-sum while explaining the invariant maintained by the map.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
