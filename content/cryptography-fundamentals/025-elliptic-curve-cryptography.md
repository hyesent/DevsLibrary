---
title: "Elliptic-curve cryptography"
order: 25
book: "cryptography-fundamentals"
---

# Elliptic-curve cryptography

## Mental model

Elliptic-curve cryptography uses group operations on points over finite fields. Carefully chosen curves can provide strong security with compact keys and signatures. The implementation must handle point encodings, subgroup conditions, and exceptional cases correctly.

## Failure modes and design choices

Short keys do not imply weak security, and a mathematically sound curve can still be undermined by invalid-point handling or side channels.

## Verification and engineering practice

Use established algorithms and platform libraries—such as X25519 for key agreement and Ed25519 for signatures where supported by the protocol. Do not invent curve parameters or implement curve arithmetic for production use.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
