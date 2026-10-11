---
title: "Brute Force First, Then Refine"
order: 8
book: "problem-solving"
---

Brute force is a systematic baseline: enumerate the possibilities and check which satisfy the requirement. It is often inefficient, but its simplicity makes it useful for validating an idea and for producing a correctness reference.

Suppose you need to find whether an array contains a pair summing to a target. The direct method checks every pair. For an array of length \(n\), there are roughly \(n(n-1)/2\) pairs, so the time grows quadratically. The advantage is that the method is easy to explain: every possible pair is checked.

A refinement begins by asking where repeated work occurs. A hash set can remember values already seen, allowing each new value to check whether its complement has appeared. Under typical hash-table assumptions, expected time becomes linear, at the cost of additional memory. This optimization changes the resource trade-off, not the underlying requirement.

Keep the baseline around as a mental model or test oracle. For small random inputs, compare the optimized solution's answer against the brute-force result. If they disagree, the simpler implementation often helps reveal the defect.

Do not optimize by intuition alone. State the expected input size, latency budget, memory limit, and worst-case concerns. For tiny inputs, a simple quadratic method may be easier to maintain and fast enough. For huge inputs, its growth may make it unusable.

Refinement can target several different costs:
- fewer repeated calculations;
- better data structures;
- less allocation or copying;
- better I/O batching;
- parallel work where coordination costs are justified;
- caching where results remain valid;
- early termination when the contract permits it.

**Practice:** Create a brute-force method to detect duplicate identifiers, then refine it using a set. Compare time and memory and define what should happen if identifiers are case-sensitive.

**Connection:** This workflow supports algorithm design, query optimization, caching, and performance engineering.
