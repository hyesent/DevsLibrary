---
title: "PBKDF2, scrypt, bcrypt, and Argon2"
order: 19
book: "cryptography-fundamentals"
---

# PBKDF2, scrypt, bcrypt, and Argon2

## Mental model

These password-hashing schemes make guessing more expensive in different ways. PBKDF2 is widely standardized and can fit compliance constraints; bcrypt is established but has input-length and design constraints; scrypt and Argon2 increase memory costs, with Argon2id commonly recommended for new systems.

## Failure modes and design choices

A cost setting that is too low makes offline attacks cheaper; one set too high can enable denial of service against the login service.

## Verification and engineering practice

Prefer Argon2id where available and permitted; otherwise choose a supported scheme based on current guidance. Tune cost with measurements, impose sensible request limits, and rehash after successful authentication when parameters are outdated.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
