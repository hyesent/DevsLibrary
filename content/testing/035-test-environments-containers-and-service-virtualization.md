---
title: "Test environments, containers, and service virtualization"
order: 35
book: "testing"
---

# Test environments, containers, and service virtualization

Environment parity improves confidence, but complete production duplication is often impractical.

## The mental model

Local, CI, staging, and production environments differ in credentials, topology, data volume, scale, and integrations. Containers and ephemeral environments can make dependencies repeatable. Service virtualization simulates external services when live access is costly or unsafe.

## How to apply it

Version environment configuration, provision dependencies reproducibly, and test migrations and startup behavior. Keep secrets outside source control. Make environment differences explicit. Use production-like services for high-risk integration assumptions and simulations for controlled edge failures.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A container does not guarantee parity if versions, network behavior, or configuration differ. Staging tests can pass with unrealistic data. Shared staging environments introduce contention and state pollution.

## Practice lab

Create an ephemeral test environment with a database and queue. Verify setup, migrations, health checks, test execution, and teardown after both success and failure.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
