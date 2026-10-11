---
title: "Common crypto anti-patterns"
order: 57
book: "cryptography-fundamentals"
---

# Common crypto anti-patterns

## Mental model

Common failures include custom ciphers, ECB for ordinary data, encryption without authentication, reused nonces, hard-coded keys, passwords hashed with SHA-256, homemade token formats, disabled certificate checks, and treating base64 as encryption.

## Failure modes and design choices

Base64 is reversible encoding. Obfuscation and secret variable names do not provide cryptographic confidentiality.

## Verification and engineering practice

Replace each anti-pattern with a named, maintained construction and document its security goal. When migrating, account for old ciphertext, key rotation, rollback, and compatibility rather than changing only the write path.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
