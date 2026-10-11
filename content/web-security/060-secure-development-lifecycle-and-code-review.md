---
title: "Secure Development Lifecycle and Code Review"
order: 60
book: "web-security"
---

## Mental model

Integrate security into design, implementation, testing, release, and operation. Review depth should scale with exposure and consequence. Reviewers should ask where identity comes from, whether object authorization is enforced, and whether untrusted data enters interpreters.

## Failure modes and design choices

SAST, DAST, dependency scans, secret scans, and infrastructure scans cover different blind spots. Triage by reachability, exploitability, impact, and exposure. Exceptions need an owner, rationale, compensating controls, and a review date.

## Verification and engineering practice

Turn incident and penetration-test findings into reusable libraries, threat-model updates, and regression tests rather than fixing only one endpoint.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
