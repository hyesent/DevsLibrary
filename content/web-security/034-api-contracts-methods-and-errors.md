---
title: "API Contracts, Methods, and Errors"
order: 34
book: "web-security"
---

## Mental model

An API exposes capabilities. Each endpoint needs a contract for identity, authorization, input schema, output fields, side effects, errors, and resource limits. Frontend code is not a trusted enforcement point.

## Failure modes and design choices

GET should be safe and not mutate state. Return only permitted fields using explicit response schemas; whole-model serialization can leak internal flags or sensitive metadata. Use consistent safe errors and inventory old API versions that may retain weaker controls.

## Verification and engineering practice

Test every method, version, alternate representation, and failure path. Use correlation IDs without exposing stack traces or secrets.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
