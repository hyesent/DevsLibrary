---
title: "Approximation and online algorithms"
order: 55
book: "dsa"
---

# Approximation and online algorithms

Approximation algorithms trade exact optimality for bounded error on hard optimization problems. An approximation ratio compares the algorithm’s solution value with the optimum under a defined minimization or maximization convention.

## The core model

Online algorithms make decisions as data arrives without knowing the future. Competitive analysis compares their performance with an ideal offline algorithm. Caching, scheduling, and streaming are common online settings. Randomization may improve expected competitive behavior.

## How to reason about it

Heuristics can be useful without formal guarantees, but state that honestly. A greedy approximation for a hard problem may have a provable ratio; a local-search heuristic may instead be judged empirically across benchmarks.

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

Do not quote an approximation ratio without its assumptions, direction, and objective. For minimization, a ratio of 2 usually means cost at most twice optimum; for maximization the convention is often expressed differently.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: compare greedy set cover intuition with its approximation guarantee, and analyze a simple online caching policy.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
