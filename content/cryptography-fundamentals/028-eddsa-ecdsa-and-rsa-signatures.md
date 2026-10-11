---
title: "EdDSA, ECDSA, and RSA signatures"
order: 28
book: "cryptography-fundamentals"
---

# EdDSA, ECDSA, and RSA signatures

## Mental model

Signature schemes differ in key representation, randomness requirements, performance, and ecosystem support. ECDSA requires careful nonce handling; deterministic variants reduce one source of failure but do not eliminate all implementation hazards. EdDSA designs simplify some operational requirements.

## Failure modes and design choices

Nonce leakage or reuse in ECDSA can reveal the private key, turning one signing mistake into complete identity compromise.

## Verification and engineering practice

Use the scheme specified by the protocol, with a maintained library and strict encoding checks. Never reuse ECDSA nonces and never write custom signature arithmetic.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
