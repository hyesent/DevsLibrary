---
title: "Cryptographic agility and deprecation"
order: 49
book: "cryptography-fundamentals"
---

# Cryptographic agility and deprecation

## Mental model

Cryptographic agility is the ability to replace algorithms, key sizes, certificates, or formats without rebuilding the whole system. Agility must not become permissive negotiation that lets an attacker force a weaker option.

## Failure modes and design choices

A migration that accepts old and new formats forever can preserve the weakest option indefinitely.

## Verification and engineering practice

Version ciphertext formats and protocol capabilities, maintain an inventory of cryptographic dependencies, and define safe migration and rollback. Remove deprecated algorithms rather than leaving unlimited fallback paths.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
