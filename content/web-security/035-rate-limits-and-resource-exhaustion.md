---
title: "Rate Limits and Resource Exhaustion"
order: 35
book: "web-security"
---

## Mental model

Rate limiting can reduce credential stuffing, scraping, reset abuse, email floods, expensive searches, and denial of service. Choose keys carefully: IP-only limits harm shared networks; account-only limits can let attackers lock out victims.

## Failure modes and design choices

Combine identity, tenant, IP, concurrency, cost, and risk signals. Bound request size, query complexity, time, pagination, fan-out, and job quotas. Decide whether a limiter outage fails open or closed; either choice has security and availability costs.

## Verification and engineering practice

Test legitimate bursts, distributed traffic, retry storms, shared NATs, and limiter-store failure.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
