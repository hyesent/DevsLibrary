# 026. Security II: Passwords, Secrets, Cryptography, and Secure Defaults

> Book: PHP · Level: beginner to advanced · Part 26 of 45

# Learning goals
- Use PHP's password and cryptographic APIs appropriately.
- Manage secrets and random tokens.
- Avoid inventing cryptographic designs.

Use `random_bytes()` for cryptographically secure random bytes and `random_int()` for secure random integers. Use `password_hash()` and `password_verify()` for passwords. For message authentication, use established APIs such as `hash_hmac()` when the protocol calls for a MAC; use `hash_equals()` for constant-time comparison of secret-derived strings where applicable.

Encryption and hashing solve different problems. Hashing is one-way; encryption is reversible with a key; a MAC detects unauthorized modification when its key remains secret. Do not reuse keys across unrelated purposes or store keys next to the encrypted data without a threat analysis. Use a vetted library or platform service for modern authenticated encryption and key management.

Secrets should be injected through environment configuration or a secrets manager, excluded from version control and logs, rotated after exposure, and granted only necessary permissions. Keep dependencies updated and disable debug displays in production.

## Practice
Generate a single-use password-reset token, store only a suitable digest of it, compare safely, expire it, and prevent reuse. Document key rotation responsibilities.
