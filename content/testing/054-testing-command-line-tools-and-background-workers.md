---
title: "Testing command-line tools and background workers"
order: 54
book: "testing"
---

# Testing command-line tools and background workers

Command-line tools and workers have contracts too: arguments, exit codes, standard output/error, filesystem effects, and signals.

## The mental model

CLI tests invoke the program with arguments and environment, then inspect exit status, output streams, and created files. Worker tests feed jobs and verify state changes, retry behavior, acknowledgements, and shutdown. Isolate the working directory and use temporary resources.

## How to apply it

Test missing and invalid arguments, help output, permissions, interrupted work, and nonzero exit on failure. Keep stdout machine-readable when promised; send diagnostics to stderr. Workers should stop cleanly and not acknowledge uncompleted work.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Tests that run against the developer’s current directory can overwrite files. Checking only output text may miss incorrect exit codes. Background jobs may pass while leaving timers or handles running.

## Practice lab

Write CLI tests for help, a successful conversion, malformed input, and output-file permissions. Add a worker test for a transient failure and graceful shutdown.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
