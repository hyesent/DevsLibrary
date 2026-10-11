---
title: "Clarify Requirements Before Design"
order: 2
book: "problem-solving"
---

Requirements define what a solution must accomplish; constraints define the space in which it must operate. Both shape the solution before implementation begins.

Separate requirements into:
- **Functional:** behavior the system must provide.
- **Quality attributes:** speed, availability, accessibility, privacy, maintainability, and other properties.
- **Constraints:** mandated platform, budget, deadline, data format, or compatibility.
- **Policies:** rules such as who may access a resource and how long data is retained.

A requirement should be observable. “The app should be robust” is not directly testable. “If saving fails, the user sees a recoverable error and the unsaved text remains available” is. Not every quality attribute needs a single number, but it should have a scenario that makes success and failure distinguishable.

Ambiguity creates hidden branches in implementation. Suppose “delete a book” could mean remove it from the current user's library, hide it from search, or permanently erase the shared book and every user's progress. Those meanings have different authorization, data integrity, and recovery consequences. Ask about destructive, security-sensitive, expensive, and irreversible behaviors early.

Use examples to test the requirement. For a discount rule, examples should include a qualifying purchase, a purchase one cent below the threshold, an expired coupon, a repeated redemption, and concurrent redemptions. Examples expose unstated rules more efficiently than broad assurances.

When stakeholders disagree, record the decision and its rationale. Do not encode an unresolved policy as an accidental implementation detail. A good design can isolate a policy behind a function or module so it can change without rewriting unrelated mechanics.

**A compact requirement record**
1. Desired outcome.
2. Trigger and preconditions.
3. Normal result.
4. Failure results and recovery.
5. Security and data constraints.
6. Measurable acceptance examples.
7. Open questions and their owners.

Requirements evolve. The goal is not to predict everything; it is to make uncertainty visible and inexpensive to revisit.

**Practice:** Specify what “remember my progress” means when the user has two devices, is offline on one, signs out, or deletes the account. Identify which questions require a product decision.

**Connection:** Requirements become contracts for API design, database constraints, tests, and operational monitoring.
