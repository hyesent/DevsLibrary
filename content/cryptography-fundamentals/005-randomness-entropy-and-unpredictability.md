---
title: "Randomness, entropy, and unpredictability"
order: 5
book: "cryptography-fundamentals"
---

# Randomness, entropy, and unpredictability

## Mental model

Keys, nonces, salts, and challenges need different randomness properties. Secret keys need unpredictability; nonces often need uniqueness rather than secrecy; salts need uniqueness and need not be secret. A long-looking value is not necessarily random, and statistical appearance alone does not prove unpredictability.

## Failure modes and design choices

If an attacker can predict a key-generation seed, a mathematically strong cipher cannot rescue the key.

## Verification and engineering practice

Use operating-system cryptographic random generators or vetted library APIs. Never seed a cryptographic generator from timestamps, process IDs, ordinary pseudo-random functions, or user names.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
