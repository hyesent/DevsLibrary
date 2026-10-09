---
title: "Accessibility testing"
order: 27
book: "testing"
---

# Accessibility testing

Accessibility testing checks whether people with different abilities can perceive, operate, understand, and use the product.

## The mental model

Automated tools detect some issues, such as missing names, invalid ARIA relationships, and contrast problems, but they cannot fully judge keyboard flow, clarity, or screen-reader usability. Combine automated checks with semantic inspection, keyboard testing, zoom/reflow, and assistive technology where feasible.

## How to apply it

Test headings and landmarks, accessible names, focus order and visibility, dialogs, error announcements, labels, contrast, target size, reduced motion, and status changes. Use native HTML semantics before adding ARIA. Include disabled and error states.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

A zero-violation automated report does not certify accessibility. ARIA can make a bad interaction more complex rather than fixing it. Mouse-only testing misses keyboard traps and focus loss.

## Practice lab

Run an automated scan, then complete a core journey with keyboard only. Verify focus movement, accessible names, form error association, and announcement of asynchronous results.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
