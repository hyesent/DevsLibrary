---
title: "Business-Logic Abuse and Workflow Security"
order: 68
book: "web-security"
---

## Mental model

Valid requests can still be used in invalid ways: repeated coupons, duplicate refunds, manipulated prices, skipped approvals, reused invitations, or double spending. These failures often arise from missing business invariants rather than parsing bugs.

## Failure modes and design choices

Model workflows as explicit states and transitions. Calculate authoritative values on the server, use atomic updates and durable idempotency, and account for concurrent requests, retries, and delayed jobs. Do not trust client-supplied totals or status flags.

## Verification and engineering practice

Write abuse-case tests with valid identities and well-formed requests. Security requires understanding the business rule the system must preserve.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
