# 5. Layered Architecture

Layered architecture separates responsibilities into layers, often including presentation, application, domain, and infrastructure. A layer offers services to another layer and hides some implementation details. The pattern is useful when dependencies and responsibilities remain clear.

## A common arrangement

- **Presentation:** HTTP endpoints, user-interface handlers, input/output mapping.
- **Application:** coordinates a use case, transaction boundaries, authorization flow, and calls to domain behavior.
- **Domain:** business rules, entities, value objects, and domain policies.
- **Infrastructure:** database access, message brokers, file storage, email, and external APIs.

These are logical responsibilities, not necessarily four deployed services. A small application can implement them as packages in one process.

## Dependency rules matter more than folder names

A project can have folders named `domain`, `application`, and `infrastructure` while all business rules still depend directly on framework objects. The architecture is defined by dependency direction and runtime behavior, not by directory names.

In a dependency-inverted design, the application or domain defines the contract it needs, and infrastructure provides an implementation. This can make business logic easier to test and infrastructure easier to replace. Use this where it improves independence; do not create an interface for every method by reflex.

## Avoid anemic layering

If controllers contain business rules, repositories make policy decisions, and domain objects are passive bags of data, the layer boundaries may not be doing much useful work. Conversely, putting all behavior in rich domain objects is not always appropriate for simple CRUD workflows. Match the design to the complexity of the domain.

## Transaction boundaries

A use case often defines a transaction boundary: validate the command, change the relevant state, and commit atomically. Do not hold database transactions open while waiting on slow external services unless the system's semantics and operational consequences have been carefully considered.

## Common failure modes

- Layers that merely forward calls without adding meaningful separation.
- A “shared” layer that becomes a dumping ground.
- Infrastructure details leaking into domain rules.
- Circular dependencies between layers.
- Tests that require the entire application to start for every small rule.

## Practice

Implement the outline of a `PlaceOrder` use case. Identify what belongs in the HTTP handler, application service, domain model, and persistence adapter. Decide when the database transaction starts and ends, and how payment-provider interaction is handled without pretending it participates in the local transaction.

**Key idea:** layering works when responsibilities and dependency direction are enforced, not merely named.
