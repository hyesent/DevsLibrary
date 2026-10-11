---
title: "HMAC internals and key handling"
order: 17
book: "cryptography-advanced"
---

# HMAC internals and key handling

## Core model and mechanics

HMAC applies a hash function with inner and outer keyed pads. Its structure is designed to avoid pitfalls of naïvely prefixing a secret to a message. Security still depends on the underlying hash, key management, and correct comparison and framing.

## Analysis and design choices

A valid HMAC means the message was authenticated by a holder of the shared secret; it does not establish freshness or uniquely identify one holder.

## Engineering, research, and verification

Use the library HMAC implementation, generate adequate keys, compare tags safely, and include method, path, timestamp, and body in a precisely specified authenticated message when signing requests.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
