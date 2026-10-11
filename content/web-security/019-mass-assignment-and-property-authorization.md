---
title: "Mass Assignment and Property Authorization"
order: 19
book: "web-security"
---

## Mental model

Mass assignment binds request fields directly to internal models without controlling which properties the caller may set. A user editing a display name should not be able to set role, owner, tenant, price, verification, or billing status just because those fields exist on the model.

## Failure modes and design choices

Use explicit input schemas or DTOs for each operation and separate writable fields from server-managed fields. Validate nested objects and define omitted versus explicit-null behavior for partial updates. Property-level authorization may differ even when object-level access is allowed.

## Verification and engineering practice

Add privileged and unexpected fields to otherwise valid requests and verify they cannot alter protected state.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
