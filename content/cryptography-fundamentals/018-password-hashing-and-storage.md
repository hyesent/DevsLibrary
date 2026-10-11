---
title: "Password hashing and storage"
order: 18
book: "cryptography-fundamentals"
---

# Password hashing and storage

## Mental model

Passwords have low and uneven entropy, so ordinary fast hashes let attackers test guesses cheaply. Password hashing uses a salt and a deliberately expensive, memory-hard or computationally costly function such as Argon2id, with parameters calibrated to the deployment.

## Failure modes and design choices

A salt is not a secret and does not make weak passwords strong; it prevents shared precomputation and makes equal passwords hash differently.

## Verification and engineering practice

Use a maintained password-hashing library, unique random salt per password, and parameters benchmarked on production-like hardware. Store algorithm and parameter metadata so hashes can be upgraded after successful login.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
