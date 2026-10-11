---
title: "Authentication, Authorization, Accountability"
order: 11
book: "web-security"
---

## Mental model

Authentication establishes who or what is calling; authorization decides whether that identity may perform an action on a particular resource; accountability enables later investigation. An authenticated user must not automatically gain access to every object.

## Failure modes and design choices

Model authorization around subject, action, resource, and relevant context such as tenant, resource state, or approval status. Enforce checks server-side and close to the protected operation. Default-deny behavior is safer than implicit permission. Audit high-impact actions without logging secrets or private payloads.

## Verification and engineering practice

Test permissions for each role, resource, action, and important state transition. A hidden UI button is not a security control.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
