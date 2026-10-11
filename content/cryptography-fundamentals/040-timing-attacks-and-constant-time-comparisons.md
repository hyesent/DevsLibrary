---
title: "Timing attacks and constant-time comparisons"
order: 40
book: "cryptography-fundamentals"
---

# Timing attacks and constant-time comparisons

## Mental model

If comparison time depends on the first differing byte, repeated observations may reveal secret material such as authentication tags or tokens. Network noise complicates measurement but does not make timing leakage irrelevant.

## Failure modes and design choices

Constant-time comparison does not fix an endpoint that leaks the secret through logs, response codes, or a different code path.

## Verification and engineering practice

Use constant-time comparison functions supplied by the language or crypto library for secret values. Do not write early-return loops for MACs, password-reset tokens, or secret identifiers.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
