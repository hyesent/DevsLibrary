---
title: "Data Classification, Minimization, and Retention"
order: 44
book: "web-security"
---

## Mental model

Classify public, internal, personal, financial, authentication, and restricted data according to impact. Collect the minimum needed, because every extra field creates copies in logs, backups, analytics, exports, and third parties.

## Failure modes and design choices

Define retention and deletion across primary records, caches, files, backups, indexes, and logs. Legal or audit retention may require restricted storage rather than immediate erasure. Privacy requires purpose limitation and transparency in addition to encryption and access control.

## Verification and engineering practice

Use synthetic test data, restrict exports, document retention exceptions, and map where sensitive fields flow.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
