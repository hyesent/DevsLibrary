---
title: "RSA: what it does and what it does not"
order: 23
book: "cryptography-fundamentals"
---

# RSA: what it does and what it does not

## Mental model

RSA is based on arithmetic involving a modulus formed from large primes. Its security is related to the difficulty of factoring under accepted assumptions, but safe use requires standardized padding and protocol constraints.

## Failure modes and design choices

Textbook RSA is deterministic and malleable; inventing padding or using the wrong scheme can invalidate the expected security.

## Verification and engineering practice

Use RSA only through a vetted library and standardized schemes such as RSA-OAEP for encryption or RSA-PSS for signatures when appropriate. Choose key sizes and certificate profiles according to current policy.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
