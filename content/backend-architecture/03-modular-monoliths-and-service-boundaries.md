# Lesson 3: Modular Monoliths and Service Boundaries

**Track:** Core Design

## Learning objectives
- Design modules around domain responsibilities
- Avoid accidental coupling
- Recognize when a service split is justified

## Lesson
### A monolith is a deployment shape, not a license for a tangled codebase

A modular monolith is one deployable application with explicit internal boundaries. Modules own concepts, policies, and persistence operations for a domain area. Other modules interact through stable interfaces rather than importing private implementation details. This lets a small team deploy and debug one system without giving up structure.

A poorly modularized monolith has a shared “utils” folder that becomes a dumping ground, controllers that query every table, and circular dependencies between features. The problem is not that everything ships together; the problem is that ownership is unclear.

### Organize around business capabilities

A course platform might have identity, catalogue, enrollment, progress, billing, and notifications modules. Each module should have a reason to change and a clear owner of its rules. “Database,” “controllers,” and “helpers” are technical layers, not usually good top-level domain boundaries by themselves. Layering still matters inside a module, but the first question is which business capability owns the behavior.

A module boundary is credible when its invariants can be explained without referring to another module's private tables. Enrollment may ask billing whether a payment is confirmed, but it should not silently edit billing rows. If two modules constantly need each other's internal state, the boundary may be wrong or the interface may be incomplete.

### Public interfaces and dependency direction

Keep domain rules independent of HTTP details where practical. An HTTP handler translates a request into a use-case call, then translates the result into a response. The use case coordinates domain logic and persistence ports. Infrastructure adapters implement those ports for a database, queue, or remote service. This separation makes the rule testable without an HTTP server and makes transport changes less invasive.

Do not create abstractions just to satisfy a diagram. An interface is useful when it protects a meaningful boundary, enables a test seam, or supports multiple implementations. An interface with one implementation and no architectural purpose can become ceremony.

### Shared database: useful, but handle ownership deliberately

A modular monolith commonly shares one database. That does not mean every module should read and write every table. Assign table ownership and expose queries or commands through the owning module. Cross-module reports can use explicit read models, views, or carefully designed queries. Transactions across modules should be rare and justified because they couple their lifecycle.

A later service split is easier when module contracts already exist and data ownership is understood. It is not automatic: extracting a module changes network failure, consistency, deployment, authentication, and observability assumptions.

### When to split a service

A service split can be justified by independent scaling needs, a distinct reliability boundary, a separate team that can own the full lifecycle, regulatory isolation, or a deployment cadence that genuinely conflicts with the rest of the system. “Microservices are modern” is not a reason. Every remote call adds latency, versioning, authentication, timeout, retry, and operational concerns.

Before splitting, measure the pain. Could a module be made independently deployable within the monolith? Could a slow query be fixed? Could a queue remove a long-running task? A service boundary is valuable only when the benefit exceeds the distributed-systems cost.

## Worked example

Keep enrollment as a module with `enrollStudent()` and `getEnrollmentStatus()` public functions. Its implementation owns enrollment state. Billing exposes `getPaymentStatus()` instead of allowing enrollment to inspect payment tables directly. If the product later needs a separate billing service, the call boundary and ownership are already visible.

## Exercises

1. Sketch module boundaries for a marketplace.
2. Identify two signs of a false boundary between modules.
3. List the operational costs added when a module becomes a remote service.

## Solution notes

A good marketplace split might include catalogue, cart/checkout, orders, payments, and fulfillment. Constant cross-module table writes and circular imports indicate a weak boundary. A remote service adds network failures, timeouts, retries, tracing, deployment/versioning, and data-consistency concerns.

## Review checklist

- Can I explain: design modules around domain responsibilities?
- Can I explain: avoid accidental coupling?
- Can I explain: recognize when a service split is justified?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
