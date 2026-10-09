# 6. Hexagonal Architecture and Adapters

Hexagonal architecture, also called ports-and-adapters architecture, separates application policy from the technologies used to interact with the outside world. A **port** describes a boundary or capability the application needs; an **adapter** connects that boundary to a particular technology or actor.

A port is not necessarily a network API. A repository interface, clock abstraction, message publisher contract, or command handler can be a port. An adapter may be a PostgreSQL repository, an in-memory test implementation, an HTTP controller, or a scheduled job.

## Keep policy central

Suppose a shipping application needs to obtain rates. The application defines what information it needs and the meaning of the returned rate. A carrier-specific adapter translates between that model and the carrier's API. If the provider changes its response format, the translation can change without forcing domain rules to depend on provider-specific fields.

This separation is valuable when a technology is likely to vary, when a dependency is difficult to test, or when several entry points must invoke the same use case. It is not a requirement to abstract every library.

## Driving and driven adapters

Driving adapters initiate application behavior: HTTP handlers, command-line commands, scheduled jobs, or message consumers. Driven adapters fulfill application needs: databases, external services, files, and message brokers. The distinction is about the direction of interaction, not whether a component is “inside” or “outside” the source tree.

## Testing benefits and limits

A port allows a unit test to substitute a deterministic adapter, such as a fake clock or in-memory repository. This can make policy tests fast. But fake adapters can drift from production behavior, so they do not replace integration tests against the actual database or provider contract.

Avoid building a fake database that attempts to reproduce every production database feature. Use test doubles for policy-focused tests and real infrastructure in appropriately scoped integration tests.

## Avoid abstraction without leverage

If an application will only ever use one simple implementation and the dependency is stable and easy to test, an abstraction may not justify its cost. Architecture should make important changes easier, not create layers for their own sake.

## Practice

Design ports for a booking service that needs persistence, time, and notifications. Identify which adapters are used in production and which test doubles are safe. Explain how the application handles a notification failure after a booking has been committed.

**Key idea:** ports isolate policy from technology at meaningful boundaries; adapters translate the boundary to real systems.
