---
title: "Containers and Runtime Hardening"
order: 55
book: "web-security"
---

## Mental model

Containers package applications but are not automatically strong security boundaries. Runtime configuration controls process privilege, filesystem access, capabilities, network exposure, and secret access.

## Failure modes and design choices

Run as non-root where practical, use maintained minimal images, remove build tools from runtime images, avoid privileged mode, set resource limits, and keep secrets out of image layers. Pinning a vulnerable image does not make it safe; updates still matter.

## Verification and engineering practice

Inspect the deployed image's user, capabilities, writable paths, ports, secrets, dependencies, and behavior under resource exhaustion.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
