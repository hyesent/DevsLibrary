---
title: "Backups, recovery, and encrypted archives"
order: 48
book: "cryptography-fundamentals"
---

# Backups, recovery, and encrypted archives

## Mental model

Backups preserve data but also multiply copies of ciphertext, metadata, and sometimes keys. Recovery procedures must remain possible after key rotation, staff turnover, service failure, or loss of a hardware device.

## Failure modes and design choices

Strong encryption with lost keys is indistinguishable from permanent data loss. Recovery is part of the security design.

## Verification and engineering practice

Test restoration using the real key hierarchy and access controls. Protect recovery material separately, define retention and deletion semantics, and document who can authorize emergency access.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
