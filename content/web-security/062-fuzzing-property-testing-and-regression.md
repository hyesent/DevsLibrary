---
title: "Fuzzing, Property Testing, and Regression"
order: 62
book: "web-security"
---

## Mental model

Fuzzing generates inputs to discover crashes, hangs, parser bugs, and invariant violations. It is useful for file processors, serializers, parsers, and protocol handlers. Property tests assert laws across many generated values rather than only hand-written examples.

## Failure modes and design choices

Define valid properties carefully, minimize failing cases, and preserve every discovered defect as a regression test. For stateful APIs, generate action sequences such as create, share, revoke, delete, retry, and access. Bound CPU and memory during testing.

## Verification and engineering practice

Fuzz only systems you are authorized to test. Reproducibility and a clear invariant make findings actionable.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
