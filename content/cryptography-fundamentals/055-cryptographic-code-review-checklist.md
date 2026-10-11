---
title: "Cryptographic code review checklist"
order: 55
book: "cryptography-fundamentals"
---

# Cryptographic code review checklist

## Mental model

Review should examine algorithm selection, API misuse, key and nonce lifecycle, encoding, error handling, trust anchors, logging, versioning, and authorization around cryptographic operations. The surrounding application often carries the largest risks.

## Failure modes and design choices

A call to a strong API is not sufficient if its result is ignored or its key is accessible to an unintended principal.

## Verification and engineering practice

Trace data from input through serialization, encryption/signing, storage, transport, verification, and action. Search for raw primitives, custom random sources, disabled certificate checks, hard-coded keys, and ignored verification results.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
