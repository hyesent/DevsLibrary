---
title: "Cryptographic protocol composition"
order: 35
book: "cryptography-fundamentals"
---

# Cryptographic protocol composition

## Mental model

A protocol is more than the sum of its primitives. Message ordering, identities, context binding, downgrade behavior, replay protection, error handling, and state transitions determine whether primitives achieve the intended system property.

## Failure modes and design choices

Combining individually secure components can still produce a protocol that accepts an attacker-controlled identity or replays an old authorization.

## Verification and engineering practice

Use established protocols and protocol libraries. If designing a new protocol, write explicit state machines, define encodings and transcript binding, and obtain specialist review before deployment.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
