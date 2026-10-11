---
title: "Tenant Isolation and BOLA"
order: 18
book: "web-security"
---

## Mental model

Broken Object-Level Authorization occurs when an API accepts an object identifier but fails to verify the caller's permission for that object. This can happen even when authentication is correct. IDs may be sequential, UUIDs, slugs, filenames, or nested references; obscurity is not authorization.

## Failure modes and design choices

Derive tenant context from authenticated identity and verified membership, not blindly from a client-supplied tenant ID. Scope data access by tenant where possible. Include caches, search indexes, exports, storage, analytics, and queued jobs in the isolation model. Re-check access when delayed jobs execute if permissions may change.

## Verification and engineering practice

Use two test tenants and attempt cross-tenant read, update, delete, search, export, nested-resource access, batch operations, and stale signed-link use.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
