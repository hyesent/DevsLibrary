---
title: "Test data design and isolation"
order: 24
book: "testing"
---

# Test data design and isolation

Reliable tests require data that is representative, controlled, and independent between scenarios.

## The mental model

Fixtures are known starting data; factories create varied records; builders express valid domain objects; seeds populate environments. Data strategy includes privacy, referential integrity, uniqueness, lifecycle, scale, and cleanup. Isolated data prevents tests from competing over shared records.

## How to apply it

Prefer creating the minimum scenario data in the test. Use synthetic data rather than copied personal production data. Give each test or worker unique identifiers, and clean up safely. For complex domains, builders should encode valid defaults while making important variations explicit.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Global fixtures can hide dependencies and cause order sensitivity. Random data without a reproducible seed makes failures hard to reproduce. Cleanup that deletes by broad criteria can damage shared environments.

## Practice lab

Design test factories for users, teams, and orders. Show how to create two tenants and verify one tenant cannot see another tenant’s records.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
