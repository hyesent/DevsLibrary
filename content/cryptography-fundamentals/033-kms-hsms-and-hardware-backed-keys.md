---
title: "KMS, HSMs, and hardware-backed keys"
order: 33
book: "cryptography-fundamentals"
---

# KMS, HSMs, and hardware-backed keys

## Mental model

A key-management service centralizes policy, auditing, and cryptographic operations. Hardware security modules can protect key material and enforce approved operations, but neither a KMS nor an HSM automatically fixes excessive permissions or unsafe application design.

## Failure modes and design choices

A key that never leaves an HSM can still be abused by an application that has permission to decrypt everything.

## Verification and engineering practice

Choose based on threat model, compliance, availability, latency, recovery, and operational burden. Restrict who can invoke which operations, separate administration from use, and test service outages and recovery.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
