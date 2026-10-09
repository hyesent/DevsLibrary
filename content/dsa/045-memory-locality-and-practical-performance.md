---
title: "Memory, locality, and practical performance"
order: 45
book: "dsa"
---

# Memory, locality, and practical performance

Memory complexity includes payloads, object headers, references, allocator overhead, temporary copies, and recursion frames. Cache locality can make contiguous arrays much faster than pointer-heavy structures because nearby data can be fetched together.

## The core model

A structure with O(n) memory can still be too large if each logical item has a large object overhead. Compact representations, typed arrays, bitsets, and streaming algorithms may reduce footprint. Streaming is useful when the full input need not be retained.

## How to reason about it

External-memory algorithms optimize disk/page transfers rather than CPU operations alone. Database and storage algorithms often favor sequential access, batching, and B-tree structures. Parallel algorithms add synchronization, communication, and contention costs that ordinary single-thread complexity misses.

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

Watch accidental quadratic copying, unbounded caches, recursion depth, and materializing huge intermediate collections. Profile allocation and peak memory, not just elapsed time.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: compare array-of-objects with compact arrays, rewrite a materializing pipeline as a stream, and estimate memory for millions of records.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
