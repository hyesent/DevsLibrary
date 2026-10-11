---
title: "WebSockets and Server-Sent Events"
order: 38
book: "web-security"
---

## Mental model

Long-lived connections change when identity and permissions are checked. A user may lose access while a WebSocket or event stream remains open. Channel names and room IDs are resource identifiers, not proof of permission.

## Failure modes and design choices

Validate WebSocket Origin for browser cookie-based flows, authenticate connections, authorize subscriptions and messages, validate schemas, cap message size and frequency, and close or reauthorize connections after relevant changes. Protect pub/sub topics from arbitrary client subscription.

## Verification and engineering practice

Test reconnects, expired sessions, revoked permissions, slow consumers, duplicate messages, oversized payloads, and cross-tenant channels.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
