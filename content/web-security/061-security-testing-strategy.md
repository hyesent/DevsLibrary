---
title: "Security Testing Strategy"
order: 61
book: "web-security"
---

## Mental model

No single test or scanner proves an application secure. Combine unit tests for policy logic, integration tests for database and middleware boundaries, end-to-end tests for user journeys, property testing, fuzzing, and deployment checks.

## Failure modes and design choices

Test both allowed and denied behavior. Build a matrix linking each threat to a control and verification method. Use synthetic data and authorized isolated targets; uncontrolled testing can disrupt shared systems or expose real data.

## Verification and engineering practice

Prioritize based on impact and exploitability. A clean scan is evidence about that tool's coverage, not proof of no vulnerabilities.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
