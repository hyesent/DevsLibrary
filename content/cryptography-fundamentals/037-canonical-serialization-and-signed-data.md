---
title: "Canonical serialization and signed data"
order: 37
book: "cryptography-fundamentals"
---

# Canonical serialization and signed data

## Mental model

Signatures and MACs operate on bytes, while applications often reason about objects. Different JSON key order, Unicode normalization, numeric formats, omitted fields, and duplicate keys can create disagreement about what was signed.

## Failure modes and design choices

A valid signature over one byte sequence can be interpreted as a different semantic object by a parser with different rules.

## Verification and engineering practice

Define a canonical serialization or sign a rigorously specified byte representation. Reject ambiguous encodings and duplicate fields; validate the decoded structure after cryptographic verification.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
