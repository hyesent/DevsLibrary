---
title: "CORS Is Not Authentication"
order: 8
book: "web-security"
---

## Mental model

CORS determines whether browser JavaScript may read certain cross-origin responses. It is not an identity check or a firewall; command-line clients and servers do not rely on browser CORS enforcement. A simple request may be sent before the browser blocks the calling script from reading the response.

## Failure modes and design choices

Use an explicit origin allowlist, narrow methods and headers, and credentialed access only where necessary. Never reflect arbitrary Origin values. Credentialed CORS cannot use a wildcard allow-origin grant. CORS does not repair missing server-side authorization or CSRF protection.

## Verification and engineering practice

Test preflight and non-preflight requests, credentials, redirects, unusual origins, and caching behavior. Confirm unauthorized clients still fail at the server.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
