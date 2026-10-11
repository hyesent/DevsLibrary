---
title: "Security Metrics and Actionable Alerts"
order: 70
book: "web-security"
---

## Mental model

Monitoring should answer whether attacks are increasing, controls are failing, privileged actions are unusual, and compromise can be detected before harm expands. Counts alone do not measure security.

## Failure modes and design choices

Track meaningful signals such as suspicious exports, privilege changes, repeated denied access, unusual secret retrieval, and outbound connections. Give each alert an owner, severity, runbook, and expected response. Avoid high-cardinality labels that leak personal data or create cost.

## Verification and engineering practice

Test alerts with controlled simulations and verify that responders receive enough safe context to act.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
