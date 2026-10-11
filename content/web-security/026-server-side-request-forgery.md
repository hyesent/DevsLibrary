---
title: "Server-Side Request Forgery"
order: 26
book: "web-security"
---

## Mental model

SSRF occurs when an application fetches an attacker-influenced URL and can reach destinations the caller should not control. Internal dashboards, databases, cloud metadata, and control planes may be more sensitive than public websites.

## Failure modes and design choices

Avoid arbitrary URL fetching when a fixed provider suffices. Otherwise parse URLs, restrict schemes and hosts, validate resolved addresses, block prohibited ranges, reapply policy after redirects, and enforce network egress controls. DNS rebinding and time-of-check/time-of-use gaps defeat simple string checks.

## Verification and engineering practice

Test in controlled environments with internal test endpoints. Bound redirects, response size, time, and concurrency; do not probe third-party infrastructure without authorization.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
