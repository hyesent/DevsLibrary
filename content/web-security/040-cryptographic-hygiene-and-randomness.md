---
title: "Cryptographic Hygiene and Randomness"
order: 40
book: "web-security"
---

## Mental model

Use maintained cryptographic libraries and standard protocols rather than custom algorithms. Use a cryptographically secure random generator for session IDs, reset tokens, CSRF tokens, and security-sensitive nonces. Ordinary simulation randomness is unsuitable.

## Failure modes and design choices

Hashing, encryption, signing, and password hashing solve different problems. Authenticated encryption, nonce requirements, key separation, and rotation depend on the chosen primitive. Encryption at rest does not protect data from an application identity authorized to decrypt everything.

## Verification and engineering practice

Review the threat model, key ownership, nonce rules, compromise response, migration path, and library support. The separate Cryptography Fundamentals book should cover the mathematics in depth.

## Questions to carry forward

- What asset or invariant is this lesson protecting?
- Which component is trusted to enforce the rule, and what happens if that component or its assumptions fail?
- What negative test would prove the control is missing, and what regression test will preserve the fix?
