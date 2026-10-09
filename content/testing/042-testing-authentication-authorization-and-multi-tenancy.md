---
title: "Testing authentication, authorization, and multi-tenancy"
order: 42
book: "testing"
---

# Testing authentication, authorization, and multi-tenancy

Identity answers who a caller is; authorization answers what that caller may do to a particular resource.

## The mental model

Test roles, ownership, tenant boundaries, object-level access, expired and revoked sessions, privilege changes, invitation flows, and administrative paths. Verify authorization on the server for every relevant operation, not only by hiding UI controls.

## How to apply it

Build a permission matrix and exercise both allowed and denied actions. Include guessed IDs and direct API requests. Test privilege escalation paths and ensure background jobs enforce the correct tenant context. Use synthetic identities and short-lived test credentials.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Testing only a user’s own data misses cross-tenant leaks. A UI that hides a button is not a security boundary. Cached responses can leak across authorization contexts if cache keys are incomplete.

## Practice lab

Create two tenants with users of different roles and verify read, write, export, and delete permissions across every combination that matters.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
