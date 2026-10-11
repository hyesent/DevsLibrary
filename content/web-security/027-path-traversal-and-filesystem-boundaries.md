---
title: "Path Traversal and Filesystem Boundaries"
order: 27
book: "web-security"
---

## Mental model

Path traversal lets attacker-controlled paths escape an intended directory or select unintended resources. It appears in downloads, archive extraction, template lookup, and file processing. Avoid concatenating user fragments into filesystem paths.

## Failure modes and design choices

Prefer opaque server-generated storage keys. When paths are unavoidable, normalize with platform path functions, resolve the final path, and verify containment after normalization. String-prefix checks can fail with separators, symlinks, case rules, and sibling directories. Archives need entry-count, size, depth, and expansion limits.

## Verification and engineering practice

Test encoded separators, dot segments, mixed separators, symlinks, Unicode edge cases, and malicious archive metadata in an isolated environment.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
