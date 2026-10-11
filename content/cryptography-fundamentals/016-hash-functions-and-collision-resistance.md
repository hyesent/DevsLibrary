---
title: "Hash functions and collision resistance"
order: 16
book: "cryptography-fundamentals"
---

# Hash functions and collision resistance

## Mental model

A cryptographic hash maps arbitrary-length input to a fixed-size digest. Important properties include preimage resistance, second-preimage resistance, and collision resistance. These are separate properties, and their security levels scale differently with digest length.

## Failure modes and design choices

A digest detects changes only when the expected digest is itself trusted. An attacker who can replace both file and digest can replace both consistently.

## Verification and engineering practice

Use modern, standardized hashes such as SHA-256 or SHA-384 for general cryptographic hashing, following protocol requirements. Hash exact, well-defined byte sequences and version the data format where needed.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
