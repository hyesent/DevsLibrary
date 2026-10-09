---
title: "Complexity classes and intractability"
order: 42
book: "dsa"
---

# Complexity classes and intractability

Complexity theory classifies problems by how computational resources grow. P contains decision problems solvable in polynomial time by a deterministic model; NP contains decision problems whose proposed solutions can be verified in polynomial time. NP-complete problems are in NP and at least as hard as every problem in NP under polynomial reductions.

## The core model

A reduction transforms instances of one problem into another while preserving yes/no answers. To show NP-hardness, reduce a known hard problem to the target problem. A problem can be NP-hard without being in NP, for example when its outputs are not decision answers or verification is not polynomial.

## How to reason about it

In practice, intractable worst-case problems may still be manageable on real instances using approximation, heuristics, parameterized algorithms, branch-and-bound, or exploiting structure. Theoretical classification informs expectations but does not replace empirical measurement.

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

Avoid saying “NP means impossible” or assuming P≠NP is proven. It is an open question whether P=NP. Also distinguish exponential algorithms from algorithms whose practical performance depends heavily on parameters.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: explain reductions in plain language, classify a few decision problems, and compare exact, approximation, and heuristic approaches for a hard optimization task.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
