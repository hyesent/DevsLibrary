---
title: "Examples, Counterexamples, and Boundary Cases"
order: 7
book: "problem-solving"
---

Examples demonstrate behavior; counterexamples expose a rule that is too broad. Boundary cases reveal where behavior changes abruptly. Together they are among the cheapest tools for improving a solution before writing much code.

For a function that accepts ages from 0 through 120, ordinary examples such as 24 and 37 are not enough. Test -1, 0, 120, 121, a missing value, a decimal, a string, and a very large number. Each probes a different assumption: range, inclusivity, type, presence, and overflow or resource behavior.

Useful categories include:
- **Typical:** common valid input.
- **Minimum and maximum:** edges of allowed ranges.
- **Empty:** no items, blank text, no matches.
- **Singleton:** exactly one item.
- **Duplicates:** repeated values or identifiers.
- **Malformed:** structurally invalid input.
- **Adversarial:** crafted to trigger worst-case cost or unsafe behavior.
- **State-dependent:** expired, deleted, already processed, or concurrently modified.
- **Failure-path:** timeout, permission denial, partial response, unavailable dependency.

A counterexample can disprove a proposed algorithm. Suppose a function returns the first pair of numbers whose sum equals a target. Testing `[2, 7, 11]` with target `9` does not establish correctness. Try repeated values, negative numbers, no solution, multiple valid pairs, and an empty array. These reveal whether the algorithm accidentally assumes sorted, distinct, or positive inputs.

Boundary analysis is not the same as blindly testing every extreme. Choose cases based on the model and contract. If a date interval is half-open—start inclusive, end exclusive—then values exactly at both boundaries are essential.

Use a small table with input, expected output, and reason. The reason matters: it records which rule the case protects and helps prevent future regressions.

**Practice:** Design a boundary-focused test set for pagination with page size, cursor, and changing underlying data. Include the last page, deleted records, duplicate sort keys, and invalid page sizes.

**Connection:** Counterexamples support algorithm proof, property-based testing, security testing, and careful API design.
