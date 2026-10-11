---
title: "Session Lifecycle and Revocation"
order: 14
book: "web-security"
---

## Mental model

Sessions need unpredictable identifiers, protected transport, careful scope, expiry, rotation, and invalidation. Rotate identifiers after login, privilege elevation, and credential changes to reduce session fixation. Idle expiry limits unattended use; absolute expiry bounds total lifetime.

## Failure modes and design choices

Logout should invalidate the server-side session or ensure a copied token can no longer be accepted. Stateless tokens complicate immediate revocation and permission changes. Short lifetimes, refresh-token rotation, introspection, or server-side session state are trade-offs, not free security upgrades.

## Verification and engineering practice

Test concurrent sessions, logout, password reset, role changes, stolen-session response, and account disablement. Never log raw session identifiers.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
