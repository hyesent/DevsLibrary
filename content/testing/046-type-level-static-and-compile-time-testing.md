---
title: "Type-level, static, and compile-time testing"
order: 46
book: "testing"
---

# Type-level, static, and compile-time testing

Some defects can be caught before runtime through type systems, static analysis, schemas, and compiler checks.

## The mental model

Type tests assert that valid programs compile and invalid programs are rejected. Static analysis searches for suspicious patterns; linters enforce conventions; schema checks validate data shapes. These checks complement runtime tests because types may not validate untrusted external data after compilation.

## How to apply it

Use strict compiler settings where practical and test public type APIs when library consumers rely on them. Keep type tests small and diagnostic. Validate external JSON at runtime and then narrow it to trusted domain types.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A successful type check cannot prove business logic or network behavior. Type assertions can bypass guarantees. Static-analysis suppressions should include justification and be revisited.

## Practice lab

For a TypeScript API client, assert inferred return types and rejection of invalid calls, then separately test runtime validation of malformed server JSON.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
