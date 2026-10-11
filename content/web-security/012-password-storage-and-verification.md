---
title: "Password Storage and Verification"
order: 12
book: "web-security"
---

## Mental model

Never store plaintext passwords or use a fast general-purpose hash alone. A stolen database enables offline guessing. Use a maintained password-specific hashing implementation such as Argon2id, scrypt, or an appropriately configured bcrypt implementation, with a unique salt per password.

## Failure modes and design choices

Benchmark parameters against the application's latency and hardware budget. Too little work helps attackers; excessive work can enable denial of service. A salt is not secret. A pepper can add defense in depth but creates key-management requirements. Prefer long passwords, block known-compromised choices, allow password managers, and rate-limit online attempts.

## Verification and engineering practice

Test reset flows and account-enumeration behavior as carefully as login. Never invent a custom password hashing format.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
