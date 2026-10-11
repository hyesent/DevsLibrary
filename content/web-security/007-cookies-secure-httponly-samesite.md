---
title: "Cookies: Secure, HttpOnly, SameSite"
order: 7
book: "web-security"
---

## Mental model

Cookies are automatically attached when their scope and browser rules match. Secure limits transmission to HTTPS; HttpOnly prevents ordinary JavaScript access; SameSite limits some cross-site sending. None of these makes XSS harmless or universally replaces CSRF defenses.

## Failure modes and design choices

Prefer host-only cookies unless subdomain sharing is required. Choose intentional expiry, rotate session IDs after login and privilege changes, and use Secure and HttpOnly for session cookies. SameSite Strict, Lax, and None have different compatibility and navigation behavior; None requires Secure in modern browsers.

## Verification and engineering practice

Inspect real Set-Cookie headers and test login, logout, reset, cross-site navigation, subdomains, HTTPS redirects, and embedded flows.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
