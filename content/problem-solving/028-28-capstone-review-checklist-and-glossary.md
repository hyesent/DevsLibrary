---
title: "Capstone Review Checklist and Glossary"
order: 28
book: "problem-solving"
---

Use this checklist before calling a solution finished. It is not a substitute for judgment; it is a way to remember classes of questions that are easy to miss under pressure.

**Problem definition**
- Is the desired outcome observable?
- Are user, scope, constraints, and exclusions explicit?
- Have ambiguous or destructive behaviors been clarified?
- Are assumptions and unknowns recorded?

**Model and design**
- Does the model preserve every distinction required by the problem?
- Are identity, ordering, units, time zones, and absence represented correctly?
- Are modules cohesive and their contracts clear?
- Is there a simple baseline for comparison?
- Are complexity and resource limits acceptable?

**Correctness**
- Are preconditions, postconditions, and invariants stated?
- Does the solution handle empty, singleton, duplicate, boundary, and malformed inputs?
- Are state transitions legal?
- Are concurrency and retry behavior defined?
- Can the approach be explained or proved to work?

**Security and resilience**
- Are authentication and authorization enforced at trusted boundaries?
- Are inputs and resource use bounded?
- Are secrets and sensitive data excluded from logs?
- Are partial failures, timeouts, and retries safe?
- Is recovery or rollback possible?

**Verification and operations**
- Do tests assert meaningful behavior?
- Are integrations and important user journeys covered?
- Are performance claims based on representative measurements?
- Can production failures be observed and diagnosed?
- Is there a safe release plan and a way to detect regressions?

**Communication and learning**
- Can another engineer understand why the design was chosen?
- Are trade-offs and known limitations documented?
- Is there evidence for the key assumptions?
- Is there a plan for revisiting decisions when conditions change?

### Glossary

- **Abstraction:** retaining the details relevant to a goal while ignoring irrelevant complexity.
- **Assumption:** an unverified belief used temporarily in reasoning.
- **Contract:** the conditions an operation requires and the guarantees it provides.
- **Counterexample:** a case that disproves a general claim or exposes a defect.
- **Decomposition:** dividing a problem into parts with manageable responsibilities.
- **Invariant:** a property that must remain true across defined operations or states.
- **Model:** a simplified representation of a problem that preserves relevant structure.
- **Precondition:** a condition required before an operation.
- **Postcondition:** a guarantee expected after an operation completes.
- **Regression test:** a test that preserves behavior after a defect is fixed.
- **State machine:** a model of states and legal transitions.
- **Trade-off:** a choice that improves one property while worsening or constraining another.
- **Worst case:** the maximum resource demand over inputs of a specified size or class.

The deepest habit in this book is to ask: *What must be true, what evidence supports that belief, and what would reveal that I am wrong?* That question is useful in every language and every layer of software.
