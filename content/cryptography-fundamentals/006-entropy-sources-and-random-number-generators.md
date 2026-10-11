---
title: "Entropy sources and random-number generators"
order: 6
book: "cryptography-fundamentals"
---

# Entropy sources and random-number generators

## Mental model

An entropy source collects unpredictable physical or system events; a cryptographic DRBG expands a seed into a stream with defined security properties. Modern operating systems combine and condition entropy and expose a secure interface to applications.

## Failure modes and design choices

Do not build a bespoke entropy pool because a sample looks random. Entropy estimation and safe conditioning are subtle.

## Verification and engineering practice

Use the platform CSPRNG. Let the operating system handle initialization and reseeding unless building a specialized system with expert review. Understand fork, VM snapshot, container, and early-boot concerns in environments that duplicate process state.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
