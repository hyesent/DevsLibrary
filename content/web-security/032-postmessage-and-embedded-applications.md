---
title: "postMessage and Embedded Applications"
order: 32
book: "web-security"
---

## Mental model

postMessage crosses window or frame boundaries. Use a specific target origin when sending sensitive data. Receivers should validate event.origin, expected source where relevant, message type, schema, and state transition before acting.

## Failure modes and design choices

Origin checking alone may be insufficient if an allowed origin hosts untrusted content. Do not send sensitive data to wildcard targets. Window references can navigate, so design an explicit protocol with request IDs, versioning, timeouts, and limited capabilities.

## Verification and engineering practice

Test forged, duplicate, stale, unexpected, and out-of-order messages, including navigation during an exchange.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
