# 8. Modular Monoliths

A modular monolith is one deployable application whose internal modules have deliberate boundaries. It combines the operational simplicity of a single deployment with some of the organizational benefits of modular design. A monolith is not inherently poorly structured, and multiple services are not automatically more scalable or maintainable.

## What makes it modular?

A modular monolith should have:
- Explicit module responsibilities and public interfaces.
- Controlled dependency direction.
- Clear ownership of domain rules and data changes.
- Limited cross-module access to internal details.
- Tests that detect forbidden dependencies.
- A deployment model that does not require modules to be independently released.

A project with one executable but a shared database where every module freely modifies every table may be a monolith without meaningful modular boundaries.

## Data ownership inside one database

Modules can share one database while maintaining logical ownership. A module may expose operations or queries to other modules rather than letting them reach into its tables directly. This is a discipline that may need architectural tests, code review, or separate database permissions to enforce.

Avoid both extremes: one giant shared model that couples everything, and artificial separation so strict that simple internal operations require remote-call-like machinery.

## Benefits

One deployment reduces distributed network calls, service discovery, version coordination, and operational overhead. Local transactions can span related data when the domain genuinely requires atomicity. A single codebase can also make refactoring easier when the team can coordinate changes.

## Limits

A monolith scales deployment as a whole, unless parts are separately replicated or otherwise isolated. A module with extreme resource needs may force the entire application to scale. Large teams can experience coordination bottlenecks if boundaries and ownership are weak. These problems may justify extracting a component, but only after identifying the actual constraint.

## Preserve extraction options

If a module may later become a service, make its API and data ownership clear, avoid direct cross-module table dependencies, and keep side effects explicit. Do not build a distributed system in advance merely because extraction might happen someday. A future extraction will still require decisions about consistency, operations, identity, and failure handling.

## Practice

Design a modular monolith for an online shop with catalog, checkout, fulfillment, and notifications. Identify each module's public operations, data ownership, and forbidden dependencies. Decide which workflows need a local transaction and which cross module boundaries asynchronously.

**Key idea:** a well-structured monolith is often the best starting point when one deployable unit meets the system's needs.
