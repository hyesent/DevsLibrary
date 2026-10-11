---
title: "Communication and Collaborative Problem Solving"
order: 22
book: "problem-solving"
---

A solution must be understandable to the people who review, maintain, operate, and use it. Communication is therefore part of correctness, not decoration added after implementation.

When explaining a problem, lead with the goal and constraints. Then show the model, the proposed approach, why it satisfies the contract, the trade-offs, and how it will be verified. This is more useful than presenting code first and expecting reviewers to infer the reasoning.

During code review, distinguish correctness defects from style preferences. A review comment should identify the risk, explain the relevant case, and suggest a path toward clarity. “This is bad” does not help; “when two requests update the same row, this read-then-write sequence can overwrite the first update” identifies a concrete concurrency concern.

Pair problem solving works best when people make assumptions visible. One person can explain the current model while the other probes edge cases and tests hypotheses. Switch roles so both people practice reasoning and implementation. Avoid turning collaboration into a silent driver and spectator arrangement.

Disagreement is often a sign that people are optimizing different objectives. One person may prioritize delivery time; another may prioritize data integrity or future change. State the criteria and compare options against them.

Write decision notes for non-obvious choices, especially those involving security, migrations, concurrency, or operational risk. Documentation should explain why a design exists and what would make it appropriate to change—not merely restate the code.

**Practice:** Explain to a teammate why a request should be idempotent. Include the failure scenario, the contract, the implementation strategy, and the trade-offs.

**Connection:** Clear reasoning improves reviews, onboarding, incident handoffs, architecture decisions, and team learning.
