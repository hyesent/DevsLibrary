---
title: "Testing browser compatibility and responsive behavior"
order: 44
book: "testing"
---

# Testing browser compatibility and responsive behavior

Web behavior can vary across engines, viewport sizes, input methods, and platform capabilities.

## The mental model

Compatibility testing targets supported browser versions and engines, touch and pointer input, keyboard interaction, zoom, reduced motion, high contrast preferences, and responsive breakpoints. Feature detection is generally more robust than assuming a particular browser identity.

## How to apply it

Choose a support matrix based on actual users and product requirements. Prioritize core journeys across engines, then target high-risk visual or API differences. Use device emulation for breadth but real devices for behaviors emulation cannot faithfully represent.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Testing only the developer’s browser leaves engine-specific behavior undiscovered. A screenshot at one viewport cannot prove responsive behavior. Do not add brittle user-agent branches without a clear need.

## Practice lab

Create a browser/viewport matrix for navigation, forms, dialogs, and data tables. Select combinations by user impact and feature risk.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
