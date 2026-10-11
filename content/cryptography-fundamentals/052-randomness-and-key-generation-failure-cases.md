---
title: "Randomness and key-generation failure cases"
order: 52
book: "cryptography-fundamentals"
---

# Randomness and key-generation failure cases

## Mental model

Failures include repeated seeds after VM cloning, weak early-boot entropy, predictable embedded-device state, accidental deterministic generation, and key generation under a broken platform source. These failures may affect many keys at once.

## Failure modes and design choices

If many devices share the same seed or key, attackers can exploit a fleet-wide weakness rather than targeting one device.

## Verification and engineering practice

Use platform-supported key generation, monitor system health, and design embedded provisioning around real entropy and secure manufacturing. Never replace a failed CSPRNG with a timestamp-based fallback.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
