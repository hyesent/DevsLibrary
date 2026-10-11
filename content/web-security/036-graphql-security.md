---
title: "GraphQL Security"
order: 36
book: "web-security"
---

## Mental model

GraphQL clients choose nested query structure, so risks include field-level authorization, resolver behavior, query complexity, batching, subscriptions, and error leakage. Hiding a field in the schema or frontend is not sufficient authorization.

## Failure modes and design choices

Enforce policy in resolvers or shared data access, cap depth and complexity, limit pagination and execution time, and protect against aliases or batches that amplify work. Introspection policy is deliberate operational choice, not a replacement for authorization.

## Verification and engineering practice

Test nested cross-tenant relationships, mutations, fragments, aliases, batching, subscriptions, and error behavior.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
