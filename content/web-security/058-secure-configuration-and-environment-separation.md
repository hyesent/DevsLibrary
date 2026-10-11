---
title: "Secure Configuration and Environment Separation"
order: 58
book: "web-security"
---

## Mental model

Configuration can disable security: debug mode, permissive CORS, public storage, weak cookies, default credentials, or exposed admin routes. Keep development, test, staging, and production credentials and resources separate.

## Failure modes and design choices

Validate critical settings at startup and fail clearly rather than silently falling back to unsafe defaults. Track effective configuration, not just the intended file. Version-control templates and review exceptions; never place secret values in public client builds.

## Verification and engineering practice

Automate checks for HTTPS, cookie attributes, CSP, allowed origins, debug settings, database grants, public storage, and exposed ports.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
