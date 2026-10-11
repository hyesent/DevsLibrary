---
title: "Diffie–Hellman key agreement"
order: 24
book: "cryptography-fundamentals"
---

# Diffie–Hellman key agreement

## Mental model

Diffie–Hellman lets two parties derive shared secret material over a public channel without transmitting the secret itself. Without authentication, an active attacker can establish separate keys with each party and sit between them.

## Failure modes and design choices

Key agreement alone does not identify the peer. Authentication must bind the exchange to the intended endpoint.

## Verification and engineering practice

Use an authenticated protocol such as TLS rather than hand-assembling ephemeral Diffie–Hellman. Prefer standardized groups or vetted elliptic-curve implementations and validate peer public values as required.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
