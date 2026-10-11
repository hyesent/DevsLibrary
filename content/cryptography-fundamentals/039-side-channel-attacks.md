---
title: "Side-channel attacks"
order: 39
book: "cryptography-fundamentals"
---

# Side-channel attacks

## Mental model

Side channels leak information through timing, power, cache behavior, memory access, error differences, or resource consumption. They can undermine a correct mathematical construction without breaking its abstract security assumption.

## Failure modes and design choices

Constant-time behavior is a property of compiled code on real hardware, not merely of source code that looks branchless.

## Verification and engineering practice

Use constant-time cryptographic implementations, avoid secret-dependent branches and memory access in sensitive code, normalize externally visible errors, and rely on platform primitives with documented side-channel protections.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
