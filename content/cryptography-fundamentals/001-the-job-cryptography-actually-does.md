---
title: "The job cryptography actually does"
order: 1
book: "cryptography-fundamentals"
---

# The job cryptography actually does

## Mental model

Cryptography lets parties establish properties about information despite an adversary who can observe, alter, replay, or fabricate messages. Confidentiality hides content; integrity detects unauthorized changes; authentication binds a message or peer to a key; and signatures support public verification of origin and integrity. These properties are distinct: encryption alone does not prove who sent a message, and a valid signature does not mean the signed claim is true.

## Failure modes and design choices

A design can use AES and still be insecure if it reuses a nonce, ignores authentication failures, or trusts the wrong public key. Cryptography is a system property, not a badge attached to a library.

## Verification and engineering practice

Start from the security goal, not from an algorithm name. Write down the attacker’s capabilities and the property that must hold even when the attacker controls the network. Then choose a protocol that composes the necessary primitives correctly.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
