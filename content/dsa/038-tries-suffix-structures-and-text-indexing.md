---
title: "Tries, suffix structures, and text indexing"
order: 38
book: "dsa"
---

# Tries, suffix structures, and text indexing

Beyond basic prefix tries, text indexes support queries over many substrings. Suffix arrays sort suffix starting positions; the longest-common-prefix array captures shared prefixes between adjacent suffixes. Suffix automata compactly represent substring information in a state graph.

## The core model

Suffix arrays can answer substring search with binary search over suffixes, typically O(m log n) for pattern length m with straightforward comparisons, while LCP-aware variants can improve repeated work. Building a suffix array efficiently requires careful algorithms; library availability should influence implementation choices.

## How to reason about it

Choose a structure based on query workload: prefix trie for dictionary prefixes, suffix array for many static text queries, suffix automaton for distinct-substring properties, and a simple scan for one-off searches. Memory and implementation risk are part of the decision.

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

Advanced indexes are easy to over-engineer. Benchmark realistic text sizes and query distributions, and verify implementations against brute force on small random strings.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: count distinct substrings using suffix-array/LCP reasoning and compare prefix-oriented queries with arbitrary-substring queries.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
