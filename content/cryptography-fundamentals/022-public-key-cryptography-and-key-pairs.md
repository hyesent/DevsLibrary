---
title: "Public-key cryptography and key pairs"
order: 22
book: "cryptography-fundamentals"
---

# Public-key cryptography and key pairs

## Mental model

Public-key systems use mathematically related public and private keys. Public-key operations enable key establishment, encryption in some schemes, or signatures, while private-key protection and correct public-key binding remain essential.

## Failure modes and design choices

A public key is not trustworthy merely because it is public. The system must bind it to the intended person, server, device, or service.

## Verification and engineering practice

Keep the terms separate: key agreement establishes shared secret material; public-key encryption encrypts to a recipient; signatures authenticate signed data. Modern protocols often combine asymmetric key establishment with symmetric AEAD.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
