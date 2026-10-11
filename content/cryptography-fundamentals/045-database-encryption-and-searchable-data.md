---
title: "Database encryption and searchable data"
order: 45
book: "cryptography-fundamentals"
---

# Database encryption and searchable data

## Mental model

Disk and database encryption protect certain storage-loss scenarios, while application-level encryption can reduce exposure to database operators or backups. Querying encrypted data is difficult because ordinary indexes and predicates depend on plaintext structure.

## Failure modes and design choices

Deterministic encryption and blind indexes leak equality or frequency information; they are not equivalent to ordinary randomized encryption.

## Verification and engineering practice

State exactly which threat each encryption layer addresses. Separate key permissions from database permissions, protect backups, and evaluate leakage from metadata, access patterns, and deterministic representations.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
