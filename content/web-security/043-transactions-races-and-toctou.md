---
title: "Transactions, Races, and TOCTOU"
order: 43
book: "web-security"
---

## Mental model

TOCTOU occurs when a condition is checked and state changes before the operation relies on that check. Inventory, coupon redemption, balances, file paths, and permissions are common examples.

## Failure modes and design choices

Use atomic conditional updates, transactions, locks, or suitable isolation according to the invariant and database. A transaction does not automatically cover email, object storage, or external APIs; outbox patterns, idempotency, or compensation may be needed. A timeout does not prove the commit failed.

## Verification and engineering practice

Test concurrent requests, retries, permission revocation during queued work, and partial failure after an external side effect.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
