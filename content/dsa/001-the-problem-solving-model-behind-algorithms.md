---
title: "The problem-solving model behind algorithms"
order: 1
book: "dsa"
---

# The problem-solving model behind algorithms

Begin by separating a problem statement from an implementation. An algorithm is a finite, precise procedure that maps valid inputs to outputs while satisfying stated constraints. Data structures determine how information is represented; algorithms determine how it is transformed. Strong solutions make assumptions explicit, preserve invariants, and explain why every input class is handled.

## The core model

Write a contract before coding: define input shape, output shape, valid ranges, duplicate behavior, ordering requirements, mutation rules, and what should happen for empty or invalid input. Translate vague words such as “fast” into constraints: n may be 10^3 or 10^7, values may be negative, and memory may be limited.

## How to reason about it

Use a four-pass workflow: understand and restate; work through examples; choose a model and prove it; implement, test, and measure. For example, “find two values that sum to target” could require any pair, indices, unique value pairs, or all pairs. Those are different problems and can require different algorithms.

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

Common failure: coding the first plausible approach before clarifying output semantics. Another is testing only the sample. Build examples for smallest input, largest plausible input, duplicates, negatives, already-sorted input, and cases where no answer exists.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: choose a familiar task and write its contract, assumptions, edge cases, and a brute-force baseline before choosing an optimization.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
