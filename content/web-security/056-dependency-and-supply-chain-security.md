---
title: "Dependency and Supply-Chain Security"
order: 56
book: "web-security"
---

## Mental model

Applications inherit risk from packages, registries, plugins, build tools, container images, CI actions, and vendor services. A compromised dependency may execute with application or build privileges.

## Failure modes and design choices

Maintain dependency inventories, lockfiles, update processes, and package review. Scanners detect known issues but not all malicious behavior. Protect publishing rights and CI credentials; untrusted pull-request code should not access production secrets.

## Verification and engineering practice

For a suspected compromise, identify affected versions and artifacts, rebuild from trusted sources, rotate exposed credentials, and investigate downstream access.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
