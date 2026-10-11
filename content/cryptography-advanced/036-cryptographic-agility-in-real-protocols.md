---
title: "Cryptographic agility in real protocols"
order: 36
book: "cryptography-advanced"
---

# Cryptographic agility in real protocols

## Core model and mechanics

Agility is the ability to migrate algorithms and formats while maintaining security. It requires versioned formats, explicit policy, inventory, compatibility windows, and a way to retire old mechanisms without creating downgrade paths.

## Analysis and design choices

Supporting every historical algorithm forever is not agility; it is permanent exposure to the weakest accepted option.

## Engineering, research, and verification

Build a cryptographic inventory that maps primitive, library, key, protocol, owner, data lifetime, and deprecation deadline. Test migration with old ciphertext, backups, clients, and offline devices.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
