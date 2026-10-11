---
title: "Forward secrecy and ephemeral keys"
order: 26
book: "cryptography-fundamentals"
---

# Forward secrecy and ephemeral keys

## Mental model

Forward secrecy aims to protect past session traffic if a long-term authentication key is later compromised. Ephemeral key agreement creates fresh session secrets that are not recoverable solely from the long-term key.

## Failure modes and design choices

Forward secrecy cannot protect data already copied from an endpoint, nor can it help if ephemeral secrets are captured while active.

## Verification and engineering practice

Understand which keys are static and which are ephemeral, how session secrets are erased, and what gets retained in logs or crash dumps. Use modern protocol configurations that provide forward secrecy.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
