---
title: "Post-quantum cryptography"
order: 50
book: "cryptography-fundamentals"
---

# Post-quantum cryptography

## Mental model

A sufficiently capable fault-tolerant quantum computer would threaten widely used RSA and elliptic-curve public-key systems through known quantum algorithms. Symmetric cryptography and hashes are affected differently; practical migration also involves protocol sizes and compatibility.

## Failure modes and design choices

Harvest-now-decrypt-later risk matters for data that must remain confidential for many years, even if a capable quantum attacker is not available today.

## Verification and engineering practice

Inventory where public-key cryptography protects long-lived confidentiality or identity, follow current standards and platform roadmaps, and assess hybrid key establishment during transition. Do not invent home-grown post-quantum combinations.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
