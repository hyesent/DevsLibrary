---
title: "Requirements, oracles, and testability"
order: 2
book: "testing"
---

# Requirements, oracles, and testability

A test needs an oracle: a defensible way to decide whether an observed result is correct.

## The mental model

Requirements become testable when they identify inputs, conditions, outcomes, constraints, and failure behavior. An oracle may be a specified value, invariant, reference implementation, schema, golden file, contract, or independently calculated result. Ambiguous phrases such as “fast,” “friendly,” and “handles errors well” need measurable acceptance criteria.

## How to apply it

Use examples for concrete cases and properties for general truths. For a cart, examples may specify totals for particular items; a property might state that adding a zero-priced item never changes the total. Keep expected results independent from the production code so a shared bug cannot make both agree.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A weak oracle merely repeats the implementation: `expect(result).toEqual(calculateUsingSameFormula(input))` may validate the same defect twice. Snapshot comparisons can also bless a wrong output when reviewers approve changes without understanding them.

## Practice lab

For a login flow, define valid and invalid inputs, lockout behavior, network failures, accessibility outcomes, and security constraints. State exactly what evidence proves each requirement.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
