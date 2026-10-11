---
title: "Message authentication codes"
order: 15
book: "cryptography-fundamentals"
---

# Message authentication codes

## Mental model

A MAC authenticates data to parties sharing a secret key. HMAC combines a hash function with a carefully designed keyed construction; CMAC is based on a block cipher. A plain hash of a message is not a MAC because anyone can recompute it.

## Failure modes and design choices

A MAC proves that some holder of the shared key produced the tag; it does not distinguish which holder, and it does not provide public non-repudiation.

## Verification and engineering practice

Use standard MAC APIs and compare tags with constant-time primitives where the platform requires it. Include domain labels and unambiguous framing when the same key serves multiple message types.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
