---
title: "JWT Validation and Pitfalls"
order: 16
book: "web-security"
---

## Mental model

JWT is a token format, not an architecture. A signed JWT normally provides integrity and issuer authenticity, not confidentiality; its payload is generally readable. Validate signatures with an explicitly allowed algorithm and trusted key source, expected issuer and audience, expiry, and required application claims.

## Failure modes and design choices

Do not trust token-provided algorithm or key URLs blindly. An access token intended for one API should not automatically work at another. A valid signature does not grant every permission. Revocation is difficult when tokens remain valid until expiry, so define lifetimes and revocation strategy deliberately.

## Verification and engineering practice

Test altered signatures, wrong audience, wrong issuer, expired tokens, unexpected algorithms, revoked identities, and key rotation. Prefer maintained libraries.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
