---
title: "File Handling Beyond Uploads"
order: 50
book: "web-security"
---

## Mental model

File handling includes preview, download, archive extraction, conversion, and cleanup. Content type, disposition, origin, caching, and parser behavior influence whether bytes are interpreted actively or merely downloaded.

## Failure modes and design choices

Serve untrusted active content from a separate origin when appropriate, use safe filenames and attachment disposition, bound archive expansion, and keep private objects behind authorization or narrow signed URLs. Ensure caches cannot mix users.

## Verification and engineering practice

Test preview versus download, content-type mismatch, symlinks, archive bombs, revocation, and deletion of derived copies.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
