---
title: "Secrets Management and Rotation"
order: 41
book: "web-security"
---

## Mental model

Secrets include API keys, database credentials, signing keys, webhook secrets, certificates, and recovery material. Do not commit them or embed them in public frontend bundles. Environment variables are useful but are not automatically a full secret-management system.

## Failure modes and design choices

Scope secrets by workload, environment, and purpose. Use secret managers or workload identity where available, audit access without logging values, and test rotation. When a secret leaks, revoke it, assess what it could access, inspect relevant events, and consider dependent credentials.

## Verification and engineering practice

Deleting a secret from the latest commit does not erase repository history, logs, forks, artifacts, or copies.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
