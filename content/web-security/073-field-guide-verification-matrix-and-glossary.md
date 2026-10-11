---
title: "Field Guide, Verification Matrix, and Glossary"
order: 73
book: "web-security"
---

## Mental model

For every feature, identify the asset, attacker capability, trust boundary, invariant, enforcement point, verification test, and recovery action. Login needs secure password storage and session rotation; APIs need object-level authorization and bounded resource use; uploads need private storage and safe serving; deployments need artifact integrity and scoped credentials.

## Failure modes and design choices

Remember the distinctions: authentication establishes identity; authorization grants a specific action; CORS governs browser script response access; CSRF abuses automatic browser credentials; XSS executes attacker-controlled content in a trusted origin; SSRF causes server-side requests to attacker-influenced destinations; idempotency makes retries safe; least privilege limits authority.

## Verification and engineering practice

Revisit this field guide whenever a system gains a new role, endpoint, dependency, data category, deployment path, or external integration. Security is a continuing practice, not a final checkbox.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
