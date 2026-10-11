---
title: "Threat models and security claims"
order: 2
book: "cryptography-fundamentals"
---

# Threat models and security claims

## Mental model

A threat model states assets, trust boundaries, adversary capabilities, assumptions, and unacceptable outcomes. “Secure” is incomplete without a scope: secure against passive observers, active network attackers, a compromised endpoint, a malicious administrator, or a future quantum-capable adversary are different claims.

## Failure modes and design choices

Cryptography cannot keep plaintext secret from a fully compromised endpoint that must display that plaintext. It may still protect stored copies, other users, or network links.

## Verification and engineering practice

List what the attacker can read, modify, inject, delay, replay, and compromise. Separate cryptographic assumptions from operational assumptions such as key custody, entropy availability, and endpoint integrity.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
