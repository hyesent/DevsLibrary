---
title: "Kerckhoffs’s principle and open design"
order: 3
book: "cryptography-fundamentals"
---

# Kerckhoffs’s principle and open design

## Mental model

A system should remain secure when its design is public and only secret keys remain secret. Hiding algorithms creates fragile dependence on obscurity and makes independent analysis difficult. Public review is not proof of safety, but secrecy of the algorithm is not a substitute for sound construction.

## Failure modes and design choices

A secret URL, undocumented encoding, or home-grown cipher usually moves the problem rather than solving it.

## Verification and engineering practice

Document the algorithm, modes, parameters, protocol transcript, and key lifecycle. Treat leaked implementation details as expected, then ask whether the remaining secrets are sufficient.

## Questions to carry forward

- What exact security property does this component provide, and what does it not provide?
- What capabilities does the attacker have in the threat model?
- Which assumptions must remain true for this design to be safe?
- What should happen when keys, inputs, dependencies, or remote services fail?
- How will the system be tested, rotated, recovered, and eventually migrated?
