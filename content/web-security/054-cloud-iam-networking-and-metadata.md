---
title: "Cloud IAM, Networking, and Metadata"
order: 54
book: "web-security"
---

## Mental model

Cloud failures often stem from excessive identity permissions or accidental exposure. Inventory roles, storage, public endpoints, secret stores, data flows, and workload identities. Separate deployment authority from runtime authority.

## Failure modes and design choices

Prefer short-lived workload identity over long-lived access keys. Restrict egress and public exposure. SSRF and metadata-service defenses must be considered together; private IP ranges are not inherently safe.

## Verification and engineering practice

Alert on privilege escalation, public-resource changes, unusual secret access, and audit-setting changes. Verify responders can revoke credentials and isolate workloads.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
