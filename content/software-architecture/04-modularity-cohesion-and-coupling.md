# 4. Modularity, Cohesion, and Coupling

Modularity divides a system into parts with clear responsibilities and controlled dependencies. The aim is not to maximize the number of modules; it is to make change, reasoning, testing, and ownership manageable.

**Cohesion** describes how strongly the responsibilities within a module belong together. **Coupling** describes how much one module depends on another. High cohesion and appropriately low coupling generally make systems easier to change, but eliminating all coupling is impossible: useful software components must collaborate.

## Design around responsibilities

A `BillingService` that calculates invoices, sends marketing email, resizes profile images, and manages passwords has unrelated reasons to change. Splitting those responsibilities can improve cohesion. But creating a separate module for every trivial operation can scatter one simple workflow across many files and abstractions.

A good module owns a coherent set of rules and exposes a small, intentional interface. Its internals should be changeable without requiring callers to understand implementation details.

## Types of coupling

Coupling can arise through shared mutable data, global state, concrete implementation dependencies, synchronous call chains, database schema assumptions, or coordinated deployments. A system may have low source-code coupling but high operational coupling if several services must always be released together.

Watch for:
- Changes in one module repeatedly breaking another.
- Many modules writing the same tables without clear ownership.
- Circular dependencies.
- Long call chains through components that add little value.
- Shared utility packages that quietly become a dumping ground for domain logic.

## Dependency direction

Stable domain rules should not need to depend on user-interface frameworks or infrastructure details. Interfaces and dependency inversion can help keep high-level policy independent of replaceable implementation details. However, interfaces created without a real variation or testing need may add ceremony instead of flexibility.

## Boundaries must be testable

A module boundary is more credible when its contract can be tested without inspecting every internal detail. Contract tests, focused unit tests, and integration tests help detect when one module relies on undocumented behavior from another.

## Practice

Inspect a feature that creates an order and sends confirmation email. Decide which responsibility owns order validity, persistence, email delivery, and retry behavior. Propose module boundaries that let email delivery fail without accidentally undoing a successfully committed order.

**Key idea:** useful modularity puts related rules together and limits how much internal detail other parts must know.
