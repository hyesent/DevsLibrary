---
title: "Testing build systems, configuration, and feature flags"
order: 45
book: "testing"
---

# Testing build systems, configuration, and feature flags

Software can pass source-level tests and still fail because its build, configuration, or runtime flags are wrong.

## The mental model

Build tests verify artifacts, environment variable validation, asset paths, code splitting, source maps, migrations, startup, and feature-flag behavior. Configuration is an input to the system and should have explicit defaults, validation, and failure modes.

## How to apply it

Test a production build rather than only a development server. Validate missing and malformed configuration early. Test flag-on and flag-off behavior, flag interactions, and cleanup of expired flags. Avoid putting secrets in client bundles or build logs.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A dev server can hide path and asset issues that appear after deployment. A flag tested only in one state can leave the other path broken. Environment variables may be embedded at build time rather than runtime.

## Practice lab

Build and serve the production artifact in CI, run a smoke test, inspect the output for secrets, and verify configuration failures are clear and safe.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
