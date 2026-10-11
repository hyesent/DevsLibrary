---
title: "Cache Security and Private Responses"
order: 47
book: "web-security"
---

## Mental model

A cache can turn a local authorization error into a broad data leak. Its key must include every dimension that changes a response: user, tenant, permission, locale, query, and content negotiation as appropriate.

## Failure modes and design choices

Use cache directives matching sensitivity. A shared CDN must not cache authenticated responses under a key that ignores identity. Role changes, logout, and revocation may require purging or short expiration. An unguessable cache key is not authorization.

## Verification and engineering practice

Test cross-user responses, tenant switches, permission changes, redirects, errors, stale signed URLs, and actual intermediary behavior.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
