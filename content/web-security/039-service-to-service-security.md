---
title: "Service-to-Service Security"
order: 39
book: "web-security"
---

## Mental model

Internal traffic is not inherently trustworthy: services can be compromised or reached through SSRF. A flat private network can turn one foothold into broad access.

## Failure modes and design choices

Use distinct workload identities, short-lived credentials, narrow permissions, TLS where warranted, and network policies. Trust forwarded identity only from verified upstreams. Bound retries and make side effects idempotent so outages do not create retry storms or duplicate actions.

## Verification and engineering practice

Verify that compromising one low-privilege service does not grant unrelated database, queue, or secret access.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
