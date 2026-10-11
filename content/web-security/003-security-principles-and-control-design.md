---
title: "Security Principles and Control Design"
order: 3
book: "web-security"
---

## Mental model

Least privilege limits authority; defense in depth uses complementary controls; secure defaults begin restrictively; fail-secure behavior avoids granting access during uncertainty; complete mediation checks every protected action. Minimize attack surface by removing unused routes, methods, permissions, ports, packages, and administrative functions.

## Failure modes and design choices

Place controls at the boundary where they can enforce the relevant invariant: validate untrusted input, authorize the specific resource, use database constraints for integrity, restrict network reachability, and monitor important events. Duplicating one fragile check is not the same as independent defense layers.

## Verification and engineering practice

For each control, document the threat it addresses, what it cannot address, its failure mode, and how it is tested.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
