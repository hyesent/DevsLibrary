---
title: "Third-Party Integrations and Vendor Risk"
order: 59
book: "web-security"
---

## Mental model

Every integration extends the trust boundary. Inventory the data and authority granted to email providers, analytics, identity platforms, payment processors, support widgets, and storage systems.

## Failure modes and design choices

Minimize shared data and permissions. Third-party browser scripts execute with page privileges; consider CSP or constrained frames. Webhooks require signature verification, replay handling, and idempotency. Define outage, termination, data export, and deletion plans.

## Verification and engineering practice

Reassess vendors when permissions or data use changes. A public font and an identity provider do not deserve identical review depth.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
