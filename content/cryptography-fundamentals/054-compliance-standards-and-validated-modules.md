---
title: "Compliance, standards, and validated modules"
order: 54
book: "cryptography-fundamentals"
---

# Compliance, standards, and validated modules

## Mental model

Standards and validation schemes constrain algorithms, parameters, module boundaries, and operational processes. A validated cryptographic module does not certify the entire application’s architecture or access-control model.

## Failure modes and design choices

Compliance is evidence against a defined checklist, not proof that every deployment is secure.

## Verification and engineering practice

Identify applicable jurisdictional and contractual requirements early, use approved modes and key sizes when mandated, and verify exactly what a certificate or validation covers.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
