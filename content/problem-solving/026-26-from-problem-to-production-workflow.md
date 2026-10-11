---
title: "From Problem to Production: A Repeatable Workflow"
order: 26
book: "problem-solving"
---

A repeatable workflow prevents the urgency of implementation from hiding unresolved questions. It is a guide, not a rigid ceremony; small tasks may combine steps, while risky changes need more explicit evidence.

**1. Frame.** State the desired outcome, users, constraints, and evidence of success.

**2. Discover.** Inspect the existing system, reproduce the current behavior, identify dependencies, and separate facts from assumptions.

**3. Model.** Define entities, states, transitions, contracts, and trust boundaries. Choose a representation that preserves important distinctions.

**4. Generate options.** Include a simple baseline. Compare correctness, complexity, latency, memory, maintainability, and failure behavior.

**5. Challenge.** Search for counterexamples, boundary conditions, concurrency issues, and adversarial inputs. State why the chosen approach should work.

**6. Implement in slices.** Make one coherent behavior work end to end. Keep changes reviewable and use version control so experiments can be reverted.

**7. Verify.** Add unit, integration, and acceptance tests appropriate to the risk. Measure resource behavior where the requirements demand it.

**8. Release safely.** Use migrations, feature flags, staged rollout, backups, or rollback plans when the change warrants them.

**9. Observe.** Check whether production behavior matches the assumptions and success criteria. Watch error rates, latency, data integrity, and user outcomes.

**10. Learn.** Record what changed, what remains uncertain, and what evidence would justify revisiting the design.

The workflow should scale with consequence. A formatting helper does not need a formal threat model. A payment migration or authorization change deserves careful contracts, concurrency analysis, auditability, and recovery planning.

**Practice:** Apply all ten steps to adding reading-progress synchronization across devices. Identify the most dangerous ambiguity and the most valuable early experiment.

**Connection:** This workflow unifies algorithms, testing, architecture, deployment, observability, and incident learning.
