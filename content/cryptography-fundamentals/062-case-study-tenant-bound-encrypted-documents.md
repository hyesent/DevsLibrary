---
title: "Case study: tenant-bound encrypted documents"
order: 62
book: "cryptography-fundamentals"
---

# Case study: tenant-bound encrypted documents

## Mental model

A multi-tenant document store must prevent ciphertext from being substituted across tenants, records, or purposes. Encryption alone does not ensure that the requesting user is authorized to access the object.

## Failure modes and design choices

Associated data detects context substitution but does not decide who is allowed to request decryption.

## Verification and engineering practice

Bind tenant ID, record ID, schema version, and purpose into authenticated associated data; independently enforce authorization before decryption; and audit key-use permissions.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
