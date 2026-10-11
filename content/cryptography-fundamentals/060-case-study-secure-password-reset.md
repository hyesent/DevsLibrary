---
title: "Case study: secure password reset"
order: 60
book: "cryptography-fundamentals"
---

# Case study: secure password reset

## Mental model

Password reset combines token entropy, expiry, one-time use, account binding, storage, delivery, and state transitions. A perfectly random token can still be abused if it is reusable, logged, or accepted for the wrong account.

## Failure modes and design choices

A reset token is a bearer credential. Treat it with the same care as a temporary password and prevent replay races.

## Verification and engineering practice

Generate a high-entropy token, store only a suitable verifier when practical, bind it to the account and purpose, enforce expiry and one-time consumption atomically, and avoid leaking whether an account exists.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
