---
title: "Requirements and Abuse Cases"
order: 4
book: "web-security"
---

## Mental model

A security requirement describes a protected outcome, not a brand of technology. “Use JWT” is not a security outcome; “a user cannot read another tenant's invoice by changing its identifier” is testable. Pair normal user stories with abuse cases: replay, forgery, out-of-order actions, scale abuse, privilege changes, and unexpected roles.

## Failure modes and design choices

Turn requirements into acceptance tests. For tenant isolation, test detail reads, updates, search, exports, background jobs, bulk endpoints, and download URLs. Include recovery and observability requirements, and record accepted residual risks with owners and reassessment triggers.

## Verification and engineering practice

If a requirement cannot be tested or tied to an observable outcome, clarify it before treating it as satisfied.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
