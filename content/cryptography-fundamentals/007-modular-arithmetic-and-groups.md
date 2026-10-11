---
title: "Modular arithmetic and groups"
order: 7
book: "cryptography-fundamentals"
---

# Modular arithmetic and groups

## Mental model

Many public-key constructions operate over finite groups. Modular addition and multiplication wrap around a modulus; inverses exist only under the appropriate coprimality conditions. Groups provide the algebraic structure behind Diffie–Hellman, elliptic-curve cryptography, and many proof techniques.

## Failure modes and design choices

An implementation can fail by accepting values outside the intended group or by mishandling exceptional points and non-canonical encodings.

## Verification and engineering practice

Practice modular inverses, exponentiation by squaring, group order, generators, and the difference between a group element and its representation. Keep classroom arithmetic separate from production parameter selection.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
