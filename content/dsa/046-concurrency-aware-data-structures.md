---
title: "Concurrency-aware data structures"
order: 46
book: "dsa"
---

# Concurrency-aware data structures

Concurrent data structures must remain correct when operations interleave. Thread safety can be provided through locks, atomic operations, immutable data, ownership rules, or specialized lock-free algorithms. The correct choice depends on throughput, contention, and required progress guarantees.

## The core model

Linearizability means each operation appears to take effect at one instant between invocation and response while respecting real-time order. Lock-free guarantees system-wide progress; wait-free guarantees each operation completes within a bounded number of its own steps. These guarantees are stronger than merely avoiding data races.

## How to reason about it

A concurrent queue must handle publication ordering and memory visibility, not just pointer updates. A thread-safe map may still require external coordination for multi-step invariants such as “check then insert.” Immutable snapshots can simplify readers at a memory cost.

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

Do not implement lock-free structures casually; memory reclamation, ABA problems, and memory models make them subtle. Prefer established libraries and test under stress, while recognizing that stress tests cannot prove correctness.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: identify race conditions in a shared counter and check-then-act cache, then compare a lock, atomic increment, and immutable snapshot design.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
