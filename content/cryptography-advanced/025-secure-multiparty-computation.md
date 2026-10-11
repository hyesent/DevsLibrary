---
title: "Secure multiparty computation"
order: 25
book: "cryptography-advanced"
---

# Secure multiparty computation

## Core model and mechanics

Secure multiparty computation lets participants jointly compute a function while limiting what each learns about others' private inputs. Protocols vary in adversary model, collusion threshold, interaction, preprocessing, and communication cost.

## Analysis and design choices

MPC does not automatically hide information revealed by the output, prevent input poisoning, or solve identity and availability problems.

## Engineering, research, and verification

Specify who may collude, whether participants may deviate arbitrarily, what outputs are revealed, and how dropout is handled. Use implementations matched to the deployment's threat model and operational constraints.

## Research questions

- What exact attacker model and security property apply here?
- Which assumptions are mathematical, operational, hardware-dependent, or organizational?
- What leaks through metadata, errors, timing, state, or deployment even if the primitive is sound?
- What would a meaningful counterexample or failure look like?
- Which primary specification, proof, or independent implementation could verify the claim?
