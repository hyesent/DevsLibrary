---
title: "Capstone: Secure Document Sharing"
order: 72
book: "web-security"
---

## Mental model

Design a system where users upload documents, share with selected people, revoke access, and create expiring links. Clarify whether links are bearer capabilities, whether recipients need accounts, what revocation means for active downloads, and whether previews can be cached.

## Failure modes and design choices

Define owner/viewer/editor permissions and enforce them on detail APIs, search, thumbnails, exports, background jobs, and storage. Use high-entropy share tokens, expiry and revocation, safe file processing, private storage, short-lived signed URLs, safe rendering, CSRF protection, and audit events without logging tokens or document contents.

## Verification and engineering practice

Test cross-tenant access, revoked links, altered IDs, races between revocation and download, misleading files, cache leakage, retries, account deletion, and storage failure. Deliver a threat model, data model, API contracts, test matrix, deployment controls, and incident playbook.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
