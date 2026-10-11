---
title: "Distinguishing XSS, CSRF, and CORS"
order: 33
book: "web-security"
---

## Mental model

XSS means attacker-controlled content executes in the target origin. CSRF means a victim's browser sends an authenticated request the victim did not intend. CORS governs whether browser scripts may read certain cross-origin responses. They are different mechanisms.

## Failure modes and design choices

XSS can often bypass CSRF token defenses; CORS does not stop curl or server-side callers; SameSite reduces some cookie sending but does not fix unsafe DOM insertion. Ask whether the attacker needs same-origin script execution, only request sending, or cross-origin response reading.

## Verification and engineering practice

Design separate tests and controls for each class. Do not treat browser security as one switch.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
