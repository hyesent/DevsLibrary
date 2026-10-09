---
title: "Visual regression and screenshot testing"
order: 28
book: "testing"
---

# Visual regression and screenshot testing

Visual tests detect changes in rendered appearance that functional assertions may miss.

## The mental model

A baseline screenshot is compared with a new render using exact pixels or perceptual thresholds. Rendering depends on browser version, fonts, device scale, viewport, animations, locale, and data. Component-level screenshots narrow the cause; full-page screenshots cover composition.

## How to apply it

Stabilize fonts, viewport, test data, and animation. Mask genuinely dynamic regions narrowly. Review diffs rather than automatically accepting them. Pair screenshot tests with semantic assertions because a pixel match cannot prove controls work or content is accessible.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Large masks can hide regressions; pixel-perfect comparisons can be noisy across platforms. A screenshot can match while keyboard interaction is broken. Keep baselines intentional and reviewed.

## Practice lab

Capture desktop and mobile states for a critical page, then intentionally change spacing, overflow, and typography to see how diffs reveal visual regressions.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
