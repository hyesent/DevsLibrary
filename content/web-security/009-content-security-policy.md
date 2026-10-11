---
title: "Content Security Policy"
order: 9
book: "web-security"
---

## Mental model

CSP lets browsers restrict scripts, resource sources, object embedding, form destinations, and framing. It is defense in depth against injection, especially when a strong script policy prevents arbitrary injected code from running. Broad script sources and unsafe inline/eval exceptions can make a policy ineffective.

## Failure modes and design choices

Prefer carefully deployed nonce- or hash-based script policies. Nonces must be unpredictable and unique per response. Third-party scripts are trusted code with page-level privileges. Begin in report-only mode where suitable, review violations, then enforce a policy compatible with required functionality.

## Verification and engineering practice

CSP does not replace output encoding, safe DOM APIs, sanitization, or authorization. Test production pages, error routes, reports, and seldom-used flows.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
