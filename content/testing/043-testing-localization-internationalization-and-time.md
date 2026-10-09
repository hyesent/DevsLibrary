---
title: "Testing localization, internationalization, and time"
order: 43
book: "testing"
---

# Testing localization, internationalization, and time

Locale-sensitive behavior depends on language, number formats, calendars, time zones, text direction, and cultural conventions.

## The mental model

Test translated content, missing translation fallback, plural rules, date and currency formatting, long strings, right-to-left layout, Unicode normalization, and daylight-saving transitions. Store instants and local calendar dates according to domain meaning; they are not interchangeable.

## How to apply it

Run representative locales and time zones. Avoid brittle assertions on environment-dependent formatted strings unless the locale is controlled. Test around midnight, month boundaries, leap days, and daylight-saving transitions where relevant. Verify layouts do not clip translated content.

## Example and working method

Use a concrete scenario rather than an abstract test count. State the preconditions, action, expected evidence, and what the test cannot establish. For each important behavior, ask: what plausible defect would this test catch, and would the test actually fail if that defect were introduced?

A practical workflow is to define the contract, prepare isolated inputs, invoke the behavior through the appropriate boundary, inspect observable outcomes, and clean up all resources. Keep the test focused enough that a failure points toward a small area of the system. When dependencies are replaced, record which real-world assumptions still require integration or contract coverage.

## Failure modes and misconceptions

Assuming every day is 24 hours causes scheduling bugs. Sorting localized strings by raw code points may be wrong. Concatenating translated fragments can break grammar.

## Practice lab

Test a booking system across two time zones, a daylight-saving transition, and multiple locales; verify stored instants, displayed local time, and date-only fields.

## Review questions

1. What claim does this kind of test establish, and what important claim does it not establish?
2. Which setup assumption could make the test nondeterministic or misleading?
3. What realistic defect should cause this test to fail?
4. Which additional layer of evidence would raise confidence?
5. How would you keep the test maintainable as the implementation changes?

## Connection to the wider testing system

No test technique works alone. Connect this lesson to the test oracle, test data, failure diagnosis, and risk-based strategy. A good suite uses each layer for the evidence it can provide, avoids repeating the same weak assertion at every level, and communicates residual uncertainty honestly.
