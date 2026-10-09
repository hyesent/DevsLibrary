---
title: "Data structures in real systems"
order: 43
book: "dsa"
---

# Data structures in real systems

Choosing a data structure is an engineering decision involving operation mix, scale, ordering, locality, memory, concurrency, and failure behavior. Big-O analysis narrows choices, but constant factors and workload distributions determine real performance.

## The core model

Arrays and hash maps are common defaults because they are compact and cache-friendly. Ordered trees support range queries and sorted iteration; heaps support repeated priority extraction; queues support scheduling; bloom filters provide probabilistic membership with false positives but no false negatives under standard assumptions.

## How to reason about it

For each candidate, list required operations and their frequency. A workload with many point lookups and few writes differs from one with frequent range scans or updates. Include serialization, persistence, allocation overhead, and thread-safety needs when choosing production structures.

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

Do not choose a complex structure because it is theoretically impressive. Standard libraries are generally better tested. Benchmark with representative data and include memory use, tail latency, and worst-case behavior when relevant.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: choose structures for a URL cache, leaderboard, job scheduler, autocomplete service, and time-series range-query system; defend each choice.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
