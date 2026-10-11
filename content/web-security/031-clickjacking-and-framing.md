---
title: "Clickjacking and Framing"
order: 31
book: "web-security"
---

## Mental model

Clickjacking overlays or frames a sensitive interface so users activate controls they did not intend. It matters for administrative actions, account settings, and other high-impact workflows.

## Failure modes and design choices

Use CSP frame-ancestors to define permitted embedders and X-Frame-Options where compatibility requires it. Framing controls do not replace authorization, CSRF protection, or clear transaction confirmation. Legitimate embedding needs an explicit, narrow trust policy.

## Verification and engineering practice

Test login, payment, admin, error, and embedded pages. Avoid broad wildcard frame permissions.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
