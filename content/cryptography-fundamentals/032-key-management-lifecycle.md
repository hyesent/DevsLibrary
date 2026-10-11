---
title: "Key management lifecycle"
order: 32
book: "cryptography-fundamentals"
---

# Key management lifecycle

## Mental model

Keys move through generation, provisioning, activation, rotation, suspension, revocation, backup, recovery, and destruction. Different keys have different lifetimes and exposure risks; rotation policy must consider data volume, protocol requirements, and recovery capability.

## Failure modes and design choices

A rotation plan that has never been tested can create an outage or permanently orphan encrypted data.

## Verification and engineering practice

Maintain an inventory of keys, owners, purposes, locations, access policy, expiry, and rotation procedure. Separate duties where risk warrants it, log privileged use, and rehearse emergency rotation.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
