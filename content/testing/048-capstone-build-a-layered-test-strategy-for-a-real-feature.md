---
title: "Capstone: build a layered test strategy for a real feature"
order: 48
book: "testing"
---

# Capstone: build a layered test strategy for a real feature

The capstone combines test design, automation, data isolation, integration confidence, security, and release decisions into one coherent plan.

## The mental model

Choose a feature such as a task manager, booking service, file library, or checkout. Define user stories and acceptance criteria, list risks, map behaviors to test levels, specify data fixtures, identify external dependencies, and set measurable release criteria.

## How to apply it

Deliver unit tests for domain rules; integration tests for persistence; contract tests for APIs; a small number of end-to-end journeys; accessibility checks; negative and security cases; and CI reporting. Document commands, environment setup, known gaps, and the rationale for each layer.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Do not try to test every possible input at every layer. Avoid redundant suites that all assert the same simple outcome. Balance confidence, speed, cost, maintainability, and the consequences of failure.

## Practice lab

Produce a test strategy, test matrix, executable suite, bug report, CI plan, and release risk assessment. Ask another developer to run it from a clean checkout using only the documentation.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
