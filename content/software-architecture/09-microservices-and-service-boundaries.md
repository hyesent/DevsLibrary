# 9. Microservices and Service Boundaries

Microservices are independently deployable services organized around business capabilities, with explicit communication and ownership boundaries. Their value is not simply smaller codebases. They can enable independent deployment, scaling, team ownership, and fault isolation—but only when the organization can support the additional distributed-systems and operational complexity.

## Extract for a reason

Good reasons may include a capability that needs independent scaling, a team that needs release autonomy, a strong security boundary, or a domain with a distinct reliability profile. “The codebase is large” is not by itself sufficient. A modular monolith can often address code organization without introducing network failure modes.

## Service boundaries should follow ownership

A service should own its rules and authoritative data. If two services frequently need synchronous access to each other's tables or must always deploy together, the boundary may be wrong or the contracts too unstable. A service boundary should reflect a coherent business capability and its change patterns, not merely a noun in the domain model.

## Distributed calls fail differently

A network call can time out after the remote service has performed the operation. The caller may not know whether a request succeeded. Retries can create duplicate effects unless operations are idempotent or carry deduplication keys. Partial failure is normal: one service may be healthy while another is unavailable.

Service contracts should define timeouts, retry policy, error semantics, authentication, compatibility, and observability. Retrying every error indefinitely can amplify an outage.

## Data ownership and consistency

Each service should own its write model. Cross-service workflows may use events, APIs, or sagas rather than a single database transaction. This means the product must decide what intermediate states are visible and how failed steps are compensated or repaired. Eventual consistency is not automatically acceptable; it must match the business semantics.

## Operational readiness

Independent deployment requires automated builds, versioned contracts, monitoring, tracing, secrets management, on-call ownership, and reliable environment provisioning. Without these capabilities, splitting one application can increase deployment risk rather than reduce it.

## Practice

Consider separating notifications from checkout. Determine whether notification delivery truly needs independent scaling or fault isolation. Define what happens when checkout commits but email delivery fails, and explain why that does or does not justify a separate service.

**Key idea:** use microservices when independent ownership and deployment benefits outweigh distributed coordination and operational costs.
