---
title: "Streaming algorithms and sketches"
order: 56
book: "dsa"
---

# Streaming algorithms and sketches

Streaming algorithms process data in one or a few passes while retaining limited memory. They are valuable when data exceeds RAM, arrives continuously, or must be processed with low latency.

## The core model

Exact counting may require memory proportional to the number of distinct keys. Sketches such as Bloom filters, Count-Min Sketch, and HyperLogLog trade exactness for compact summaries with defined error characteristics. Each sketch answers a specific class of queries; they are not interchangeable.

## How to reason about it

Reservoir sampling maintains a uniform sample from an unknown-length stream. Sliding-window streams require special treatment because old items expire. Mergeability is useful in distributed systems when partial summaries can be combined without retaining raw data.

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

Probabilistic summaries can produce false positives or approximate counts. Communicate error bounds and confidence assumptions to callers; never treat approximate membership as exact authorization logic.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: design a stream counter, choose a sketch for cardinality estimation, and explain which queries the chosen summary cannot answer.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
