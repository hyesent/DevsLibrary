---
title: "Component and UI testing"
order: 13
book: "testing"
---

# Component and UI testing

UI tests should verify the contract users experience rather than a component’s private implementation.

## The mental model

A component test renders a component in a controlled environment, supplies props or user actions, and checks accessible output and state transitions. Include loading, empty, success, error, disabled, and permission-limited states when relevant.

## How to apply it

Query by role, label, text, or other user-facing semantics. Simulate realistic interaction sequences. Test whether state is communicated accessibly, including validation messages and focus behavior. Use visual regression testing selectively for layouts where appearance itself is the requirement.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Testing internal state variables or implementation-specific hook calls makes tests fragile. Snapshotting an entire DOM tree often produces noisy diffs and does not establish usability. A simulated DOM cannot fully substitute for a real browser.

## Practice lab

For a search component, test typing, debounce behavior, no results, request failure, keyboard interaction, and an accessible status announcement.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
