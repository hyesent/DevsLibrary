---
title: "Cryptography in JavaScript and browsers"
order: 43
book: "cryptography-fundamentals"
---

# Cryptography in JavaScript and browsers

## Mental model

Browser cryptography must contend with XSS, extensions, compromised dependencies, storage semantics, and the fact that delivered code can access secrets available to it. Web Crypto exposes vetted primitives but does not design a secure protocol for the application.

## Failure modes and design choices

A non-extractable key can still be used by malicious same-origin JavaScript if that code can invoke the relevant operation.

## Verification and engineering practice

Prefer Web Crypto APIs for supported operations and keep key usages narrow. Understand extractable versus non-extractable keys, secure contexts, origin boundaries, and the limits of storing tokens in local storage or IndexedDB.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
