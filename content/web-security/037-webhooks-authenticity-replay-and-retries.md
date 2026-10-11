---
title: "Webhooks: Authenticity, Replay, and Retries"
order: 37
book: "web-security"
---

## Mental model

A webhook URL or event name does not prove sender identity. Verify the provider's signature over the exact bytes and metadata specified by its protocol. Parsing and re-serializing a body before verification may change the signed representation.

## Failure modes and design choices

Authenticity does not guarantee freshness. Persist event IDs and make processing idempotent. Handle out-of-order delivery, bounded retries, dead-letter cases, and partial failure between recording an event and publishing work. Protect signing secrets and support rotation.

## Verification and engineering practice

Test invalid signatures, stale events, duplicate deliveries, timeouts after commit, secret rotation, and downstream outages.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
