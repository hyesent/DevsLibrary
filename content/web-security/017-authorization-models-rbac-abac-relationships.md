---
title: "Authorization Models: RBAC, ABAC, Relationships"
order: 17
book: "web-security"
---

## Mental model

RBAC grants permissions through roles; ABAC evaluates subject, resource, action, and environment attributes; relationship-based control derives access from owner, member, editor, or organizational relationships. Real systems often combine them.

## Failure modes and design choices

RBAC can be too coarse for per-document sharing; ABAC can become opaque if exceptions proliferate; relationship models need carefully defined inheritance. Protect every action and representation, including exports, search, bulk routes, and background work. Random identifiers reduce guessing but do not replace authorization.

## Verification and engineering practice

Build policy tests across identities, resource ownership, tenant, action, and state. Centralize policy consistently without creating an unreviewable authorization monolith.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
