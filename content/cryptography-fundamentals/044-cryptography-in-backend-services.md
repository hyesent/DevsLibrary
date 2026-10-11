---
title: "Cryptography in backend services"
order: 44
book: "cryptography-fundamentals"
---

# Cryptography in backend services

## Mental model

Backend services handle key access, identity, tenant boundaries, retries, logs, queues, and distributed failure. Security can fail when encrypted payloads are routed to the wrong tenant or decryption is granted to a broad service identity.

## Failure modes and design choices

Encryption does not replace authorization. A service that can decrypt every tenant’s data may still be an unacceptable trust boundary.

## Verification and engineering practice

Use workload identity and least-privilege KMS permissions, bind ciphertext to tenant and record context with AEAD associated data, and define how key outages and partial failures behave.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
