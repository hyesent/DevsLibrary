---
title: "Safe Downloads and Content-Disposition"
order: 29
book: "web-security"
---

## Mental model

Serving a file influences how browsers interpret its bytes. User-controlled HTML or SVG served inline from a privileged origin can create script-execution risk. Content type, disposition, caching, and origin all matter.

## Failure modes and design choices

Use validated content handling, safe filenames, attachment disposition where appropriate, and nosniff protection. Consider serving active untrusted content from a separate origin without application cookies. Private downloads need authorization or carefully scoped signed URLs; caches must not mix users.

## Verification and engineering practice

Test inline preview, direct download, content-type mismatch, filename edge cases, cache behavior, and revocation.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
