---
title: "Architecture Review Checklist"
order: 71
book: "web-security"
---

## Mental model

Review assets and trust boundaries; identity and object-level authorization; data interpreters and output contexts; concurrency, retries, caches, and stale permissions; secrets, dependencies, network reachability, and deployment provenance; monitoring, recovery, and rollback.

## Failure modes and design choices

For every major risk, record a control, owner, verification method, and residual risk. Check alternate routes, background jobs, exports, and administrative tools—not just the primary UI. Ask what changes if a dependency is compromised or a permission is revoked mid-workflow.

## Verification and engineering practice

A review is complete when the team can explain why the design holds under stated assumptions and how it will know when those assumptions stop holding.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
