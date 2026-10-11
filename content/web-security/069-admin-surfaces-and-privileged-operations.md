---
title: "Admin Surfaces and Privileged Operations"
order: 69
book: "web-security"
---

## Mental model

Admin interfaces concentrate authority over exports, impersonation, permissions, billing, deletion, and global configuration. A hidden URL or private network is not enough protection.

## Failure modes and design choices

Require strong authentication and step-up for high-impact actions; separate duties or require dual approval when justified. Audit initiator, approver, target, and outcome without logging secret values. Scope impersonation tightly and make it visible.

## Verification and engineering practice

Test direct API access, stale sessions after role changes, bulk operations, emergency accounts, and periodic privilege review.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
