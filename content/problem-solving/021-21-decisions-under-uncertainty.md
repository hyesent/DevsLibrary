---
title: "Decisions Under Uncertainty"
order: 21
book: "problem-solving"
---

Engineering decisions are often made before all facts are available. Good decision-making does not eliminate uncertainty; it makes uncertainty explicit and chooses actions proportionate to the consequences.

Separate reversible decisions from expensive-to-reverse ones. A feature flag or isolated module can make a choice easy to change. A public API, data migration, or security boundary can be difficult to reverse once customers and other systems depend on it. Delay irreversible commitments when more evidence is likely to arrive soon, but do not delay every decision indefinitely.

Use expected value cautiously. A low-probability failure with catastrophic impact may deserve more attention than a frequent minor inconvenience. Security, privacy, data loss, and safety risks require impact-sensitive thinking rather than optimizing average outcomes alone.

A decision record can capture context, options, criteria, chosen option, rejected alternatives, assumptions, and triggers for revisiting the choice. This prevents future teams from mistaking a context-specific trade-off for a universal rule.

Prefer small experiments when the cost of learning is low. A prototype can validate technical feasibility, but it does not necessarily prove maintainability, scale, security, or user value. Be clear about what the experiment does and does not establish.

Avoid sunk-cost reasoning. The fact that a team has already written code does not make that code the best path forward. Compare future costs and risks from the current point, including migration and abandonment costs.

**Practice:** You can either add a cache quickly or spend a day measuring the bottleneck. List the conditions under which each choice is rational and define what evidence would change your mind.

**Connection:** Decision discipline helps with architecture, technology selection, incident response, product trade-offs, and technical debt.
