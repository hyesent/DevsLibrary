---
title: "Cross-Site Request Forgery"
order: 23
book: "web-security"
---

## Mental model

CSRF tricks a browser into sending an authenticated request the user did not intend, often because cookies attach automatically. The attacker may not need to read the response. Never use GET for state-changing operations.

## Failure modes and design choices

Use anti-CSRF tokens and appropriate SameSite cookies; origin validation can add another layer. Correct methods and content types help but are not complete defenses. XSS can often bypass token-based CSRF protection because injected script runs within the trusted origin.

## Verification and engineering practice

Test sensitive mutations, login CSRF, embedded contexts, redirects, and actual browser cookie behavior. For high-impact actions, consider reauthentication or transaction-specific confirmation.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
