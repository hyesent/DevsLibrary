---
title: "Frontend Security and Token Storage"
order: 52
book: "web-security"
---

## Mental model

Frontend code runs in a user-controlled environment. It can improve usability but cannot enforce permissions against a caller who can modify requests. Anything delivered to the browser is observable by the user.

## Failure modes and design choices

Browser-readable storage is exposed to injected script; HttpOnly cookies reduce direct token reads but require CSRF-aware design. Keep tokens out of URLs, minimize lifetime and scope, and do not embed secrets in frontend environment variables that become public assets.

## Verification and engineering practice

Inspect the production bundle, source maps, browser storage, exposed configuration, and server-side authorization.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
