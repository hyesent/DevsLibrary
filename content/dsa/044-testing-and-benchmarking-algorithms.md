---
title: "Testing and benchmarking algorithms"
order: 44
book: "dsa"
---

# Testing and benchmarking algorithms

Algorithm testing should verify correctness over examples, edge cases, randomized inputs, and adversarial shapes. A brute-force implementation is often a useful oracle for optimized solutions on small inputs. Property-based tests check invariants that should hold across many generated inputs.

## The core model

Useful properties include sorting preserves the multiset and produces nondecreasing order; a shortest path’s reconstructed edge weights sum to its reported distance; a tree traversal visits every reachable node exactly once; and union-find connectivity is symmetric and transitive.

## How to reason about it

Benchmark separately from correctness tests. Warm up runtimes when relevant, repeat trials, report distributions rather than one lucky timing, and control input generation. Avoid measuring printing, disk I/O, or setup unless those costs are part of the target workload.

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

A faster algorithm may appear slower on tiny inputs due to overhead. Avoid overfitting to one machine or one data distribution, and never infer asymptotic complexity from a single benchmark curve.

Compare this approach with simpler or more general alternatives before adopting it. An asymptotically better method may cost more memory or implementation complexity; a specialized method may rely on stronger assumptions. Prefer the simplest method that meets the actual constraints and whose correctness can be explained.

## Practice and mastery

Practice: differential-test binary search, sorting, shortest paths, and DP against small reference implementations; benchmark across multiple input sizes.

### Self-check

- Explain the technique without relying on memorized code.
- State its invariant or recurrence precisely.
- Give a counterexample to at least one tempting but incorrect approach.
- Derive time and auxiliary-space complexity.
- Test one normal case, one boundary case, and one adversarial case.

### Extension challenge

Modify the problem so one assumption changes—for example, data is no longer sorted, weights can be negative, updates arrive online, duplicates matter, or memory is constrained. Decide whether the original technique still applies. If it does not, identify the exact assumption that fails and choose a replacement.
