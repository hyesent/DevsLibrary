---
title: "Case study: incident response for leaked keys"
order: 63
book: "cryptography-fundamentals"
---

# Case study: incident response for leaked keys

## Mental model

A key leak requires identifying the key’s uses, scope, exposure window, derived keys, encrypted data, signatures, and downstream trust relationships. Merely deleting the leaked string from source control does not invalidate copies.

## Failure modes and design choices

Rotation does not undo signatures already trusted, restore confidentiality for data whose key was stolen, or remove an attacker’s persistence automatically.

## Verification and engineering practice

Contain access, revoke or rotate the key, invalidate affected tokens or certificates, assess whether data must be re-encrypted, search logs and artifacts, and document residual risk. Preserve evidence without spreading secrets further.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
