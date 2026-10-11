---
title: "Open Redirects and URL Validation"
order: 30
book: "web-security"
---

## Mental model

Open redirects allow a trusted site to send users to attacker-controlled destinations, enabling phishing and sometimes token leakage. They commonly appear in login callbacks, logout, and return-to parameters.

## Failure modes and design choices

Prefer internal route identifiers or relative paths. For external links, parse URLs and strictly allowlist schemes and hosts; substring checks are unsafe. OAuth redirect URIs should match registered values exactly. Keep tokens out of URLs because history, referrers, logs, and analytics can retain them.

## Verification and engineering practice

Test scheme-relative URLs, user-info components, encoded characters, backslashes, unexpected ports, and complete redirect chains.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
