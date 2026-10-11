---
title: "OAuth 2.0 and OpenID Connect"
order: 15
book: "web-security"
---

## Mental model

OAuth 2.0 is delegated authorization; OpenID Connect adds an identity layer. Access tokens authorize resource access, while ID tokens convey authentication claims for a client. They are not interchangeable. Use maintained libraries and current authorization-code flows with PKCE where appropriate.

## Failure modes and design choices

Register exact redirect URIs, validate state, use nonce where required, and validate issuer, audience, signature, expiry, and protocol claims. Request narrow scopes. Protect refresh tokens, rotate or revoke them when supported, and prevent open redirects in callback flows.

## Verification and engineering practice

Test wrong issuer/audience, expired tokens, redirect mismatches, replay, account linking, key rotation, and token-type confusion. A JWT-shaped string is not automatically trustworthy.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
