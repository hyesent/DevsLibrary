---
title: "Choosing a primitive: decision framework"
order: 58
book: "cryptography-fundamentals"
---

# Choosing a primitive: decision framework

## Mental model

Selection begins with the property needed: confidentiality, integrity, password verification, key establishment, signatures, or derivation. Then consider interoperability, platform support, standards, performance, key lifecycle, and the attacker model.

## Failure modes and design choices

Do not choose a primitive just because it is familiar. A correct primitive for the wrong job is still a design failure.

## Verification and engineering practice

Use this default map: AEAD for message confidentiality plus integrity; password KDF for passwords; MAC for shared-key authenticity; signature for public verification; KDF for key derivation; established TLS for network channels.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
