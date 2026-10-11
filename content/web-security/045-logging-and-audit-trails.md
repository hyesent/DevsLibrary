---
title: "Logging and Audit Trails"
order: 45
book: "web-security"
---

## Mental model

Logs can support detection and investigation but can also multiply a breach if they contain tokens, passwords, private content, or personal data. Record event type, outcome, actor/resource references, timestamp, and correlation IDs where justified.

## Failure modes and design choices

Operational logs and audit trails have different needs. Audit trails may need stronger integrity, access control, and retention. Sanitize untrusted values against log injection, synchronize clocks, and protect log search and export access.

## Verification and engineering practice

Test that high-risk events are visible without storing secrets, and that alerts lead to a defined response.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
