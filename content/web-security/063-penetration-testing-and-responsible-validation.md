---
title: "Penetration Testing and Responsible Validation"
order: 63
book: "web-security"
---

## Mental model

Penetration testing evaluates realistic attack paths across code, identity, configuration, and infrastructure. Define written scope, authorization, prohibited actions, test windows, data handling, emergency contacts, and reporting expectations.

## Failure modes and design choices

A useful finding includes asset, preconditions, evidence, impact, root cause, remediation, and a regression test. Collect minimal sensitive data. Retest the underlying cause and related paths, not only the original payload.

## Verification and engineering practice

Testing is point-in-time evidence. Repeat it as roles, features, dependencies, and deployment architecture change.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
