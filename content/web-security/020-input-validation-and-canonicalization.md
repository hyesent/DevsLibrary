---
title: "Input Validation and Canonicalization"
order: 20
book: "web-security"
---

## Mental model

Validate shape, length, type, range, enum membership, and domain rules at trust boundaries. Syntax validity and semantic validity differ: a well-formed date may still violate business rules. Reject unexpected fields where mass assignment could affect privileged properties.

## Failure modes and design choices

Canonicalization matters when equivalent values have multiple representations: encoded separators, Unicode normalization, case, dot segments, and repeated decoding. Normalize once at a defined boundary and ensure downstream layers interpret values consistently. Bound body size, nesting, and processing time.

## Verification and engineering practice

Test malformed and ambiguous inputs against the actual parser. Do not rely on repeated ad hoc decoding or one regular expression as a universal defense.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
