---
title: "Privacy, Compliance, and Data Lifecycle"
order: 67
book: "web-security"
---

## Mental model

Compliance frameworks can structure controls and evidence but do not guarantee application safety. Identify personal or regulated data, purposes, flows, access, retention, processors, and jurisdictions; seek qualified legal guidance for binding interpretations.

## Failure modes and design choices

Minimize collection, limit purposes, disclose relevant practices, and define deletion across records, files, backups, indexes, analytics, and logs. Security protects data but does not replace privacy principles or user rights.

## Verification and engineering practice

Maintain evidence of access reviews, retention policies, vendor reviews, incident exercises, and documented risk decisions.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
