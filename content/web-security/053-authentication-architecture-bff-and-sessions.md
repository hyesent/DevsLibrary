---
title: "Authentication Architecture: BFF and Sessions"
order: 53
book: "web-security"
---

## Mental model

A backend-for-frontend can keep provider tokens server-side and expose a session cookie; direct browser-token architectures simplify some calls but create token storage and refresh concerns. Neither pattern is secure without explicit boundaries.

## Failure modes and design choices

A BFF still needs CSRF protection and can create SSRF or authorization issues if it forwards arbitrary requests. Direct token clients need narrow audience/scope, safe refresh behavior, and XSS mitigation. Define login, callback, logout, MFA, account switching, and provider outage behavior.

## Verification and engineering practice

Document which component validates identity, how keys rotate, and how sessions are revoked. Test actual browser behavior and redirect flows.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
