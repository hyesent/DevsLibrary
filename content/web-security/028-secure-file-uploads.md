---
title: "Secure File Uploads"
order: 28
book: "web-security"
---

## Mental model

A filename extension and browser-supplied content type do not prove file type. Validate size, count, allowed formats, parser behavior, and authorization. Use generated storage names, keep uploads outside executable web roots, and avoid serving untrusted active content from a privileged application origin.

## Failure modes and design choices

Consider maintained decoders, re-encoding, scanning, quarantine, and sandboxing according to risk. Private objects need authorization or narrow short-lived signed URLs. Treat uploads as a lifecycle: quarantine, validate, process, approve, serve, expire, delete. Limit parser time and memory.

## Verification and engineering practice

Test misleading extensions, malformed files, oversized metadata, archive bombs, cross-user access, partial uploads, and storage failures.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
