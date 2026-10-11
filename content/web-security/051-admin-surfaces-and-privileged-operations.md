---
title: "Admin Surfaces and Privileged Operations"
order: 51
book: "web-security"
---

## Mental model

Admin interfaces concentrate power: exports, impersonation, permission changes, billing adjustments, deletion, and global configuration. A hidden URL or private network is not sufficient protection.

## Failure modes and design choices

Require strong authentication and step-up for high-impact operations. Separate duties or require dual approval when justified. Make destructive actions clear, audit who initiated and approved them, and scope impersonation tightly with visible indicators.

## Verification and engineering practice

Test direct API calls that bypass the UI, stale sessions after role changes, bulk actions, emergency accounts, and privilege review.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
