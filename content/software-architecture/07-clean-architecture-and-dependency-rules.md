# 7. Clean Architecture and Dependency Rules

Clean Architecture groups code into concentric responsibility boundaries, with domain policy at the center and frameworks, delivery mechanisms, and infrastructure toward the outside. The most important rule is that source-code dependencies should point toward policies that are more stable, not from the domain outward to replaceable technologies.

The exact number of rings is less important than the dependency rule. A domain object should not need an HTTP request type to express a business rule. An application use case should not require a concrete database client merely to state that it needs to save an order.

## Dependency inversion

High-level policy often needs a capability supplied by a low-level detail. Dependency inversion places the contract near the policy and lets the implementation depend on that contract. This is distinct from dependency injection, which is a technique for supplying an implementation at runtime.

For example, an application may define `OrderRepository` and infrastructure may implement it using SQL. The application knows the operations it needs; it does not need to know the database driver's API. Keep the contract focused on domain or use-case needs rather than exposing every database feature through a generic interface.

## Boundaries and mapping

Data shapes often differ across layers. An HTTP request DTO is not necessarily a domain entity, and a database row representation is not necessarily the API response. Mapping between them can prevent accidental leakage of internal fields and help each boundary evolve independently.

Mapping has a cost, so do it where semantics or change isolation justify it. Duplicating every field into several nearly identical types can make a small application harder to maintain.

## The framework is a detail—but not a trivial one

Frameworks affect performance, lifecycle, security, and developer productivity. Treating them as replaceable details does not mean ignoring their constraints. It means the core business rules should not be inseparably entangled with framework-specific types and behavior when that entanglement is avoidable.

## When not to overapply it

A small content site or simple administrative CRUD tool may not need many layers or a sophisticated object graph. The architecture should reflect business complexity, team size, and likely change. Use the simplest dependency structure that protects the important rules.

## Practice

Take a use case that currently imports a web framework and SQL client directly. Identify which dependencies are genuine policy needs and which are delivery or infrastructure details. Refactor only the boundaries that provide a concrete benefit.

**Key idea:** dependency direction protects core policy from accidental dependence on replaceable details.
