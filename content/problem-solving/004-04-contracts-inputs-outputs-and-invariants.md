---
title: "Contracts, Inputs, Outputs, and Invariants"
order: 4
book: "problem-solving"
---

A contract describes the obligations around an operation. It clarifies what must be true before an operation begins, what the operation guarantees afterward, and what remains unchanged.

For a function that transfers money, the contract might require a positive amount, an authorized source account, and sufficient funds. Its postconditions may guarantee that the source balance decreases by the amount and the destination balance increases by the same amount—or that neither balance changes if the transfer fails. “Return true” is not an adequate contract for a financially meaningful operation.

An **invariant** is a property that must remain true throughout a process or at defined boundaries. Examples:
- a queue's reported size equals the number of stored elements;
- a user's private record is never returned to another user;
- a balance cannot become negative if overdrafts are forbidden;
- a pagination cursor always refers to a valid position in the ordering.

Invariants make complex behavior easier to reason about because they reduce the number of possible states. Instead of inspecting every internal detail, ask whether the invariant holds before and after each meaningful transition.

A precondition should not be confused with validation. If untrusted input arrives from a browser or external API, the system must validate it at the trust boundary. Internal functions can then rely on clearly stated preconditions, provided every caller actually satisfies them.

Think through failure atomicity. If an operation has three steps and step three fails, are steps one and two allowed to remain? For a simple in-memory calculation, perhaps not. For distributed workflows, rollback may be impossible, so the contract may instead specify compensation, retry, or a visible pending state.

**Worked example:** For `removeItem(cart, itemId)`, define whether a missing item is an error or a no-op, whether only one or all duplicates are removed, and whether the original cart is mutated. These are contract decisions, not minor coding details.

**Practice:** Define preconditions, postconditions, and invariants for a password-reset flow. Include expired tokens, token reuse, and account enumeration.

**Connection:** Contracts and invariants connect requirements to type systems, database constraints, tests, transactions, and formal verification.
