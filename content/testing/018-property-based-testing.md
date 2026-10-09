---
title: "Property-based testing"
order: 18
book: "testing"
---

# Property-based testing

Property-based testing checks general laws across many generated inputs rather than a handpicked list alone.

## The mental model

A property states an invariant: sorting preserves the multiset of values; encode/decode round-trips; normalization is idempotent; adding a zero amount preserves a total. A generator creates structured cases and a shrinking process reduces failures to simpler counterexamples.

## How to apply it

Start with a precise property and constrain generators to valid domains. Include invalid domains separately. Seed failing runs for reproducibility and keep generators realistic enough to explore meaningful states. Combine properties with example-based tests for named business rules.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A vague property can merely restate an assumption. Unbounded random inputs can produce unrealistic cases or slow tests. Passing thousands of generated cases does not guarantee correctness, but counterexamples often expose overlooked assumptions.

## Practice lab

Test a parser round-trip and a money operation invariant. When a failure appears, preserve the minimized counterexample as a normal regression case if it captures an important edge.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
