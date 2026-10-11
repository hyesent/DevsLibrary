---
title: "Error Handling and Information Disclosure"
order: 46
book: "web-security"
---

## Mental model

Public errors should not reveal stack traces, SQL, filesystem paths, secret values, or internal topology. Use consistent error structures and correlation IDs to connect responses to protected internal diagnostics.

## Failure modes and design choices

If an authorization or token-verification dependency fails, do not silently grant access. Sensitive recovery flows should avoid obvious account-enumeration signals. Debug mode and verbose errors must be disabled in production.

## Verification and engineering practice

Exercise parser, database, identity-provider, storage, and downstream failures; inspect both client responses and protected logs.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
