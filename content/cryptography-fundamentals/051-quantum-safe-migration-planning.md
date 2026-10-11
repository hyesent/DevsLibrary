---
title: "Quantum-safe migration planning"
order: 51
book: "cryptography-fundamentals"
---

# Quantum-safe migration planning

## Mental model

Migration spans certificates, clients, gateways, embedded devices, protocol negotiation, message formats, hardware, vendors, and stored data. The hardest problem may be discovering cryptographic use rather than changing a library call.

## Failure modes and design choices

A hybrid design is only as sound as its exact composition, downgrade handling, and implementations.

## Verification and engineering practice

Build a cryptographic bill of materials, rank assets by confidentiality lifetime and migration difficulty, test interoperability, and define fallback policy carefully. Track standards and vendor support rather than relying on marketing claims.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
