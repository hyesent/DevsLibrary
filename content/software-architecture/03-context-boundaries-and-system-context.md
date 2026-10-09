# 3. Context, Boundaries, and System Context

A system does not exist in isolation. It interacts with users, identity providers, payment processors, data sources, external APIs, operational tools, and other systems. A context view makes these relationships visible before the team decides how to divide its internal code.

## Define the system boundary

State what the system owns and what it relies on. A shop may own product catalog, cart, order, and fulfillment workflows while relying on an external payment processor. It should not assume that the payment processor shares its database transaction or failure behavior.

For every external dependency, ask:
- Who owns its availability and correctness?
- What data crosses the boundary?
- What happens when it is slow, unavailable, or returns an ambiguous result?
- How are credentials and permissions managed?
- Are requests retried, and can retries duplicate effects?
- How are changes to its API detected and tested?

## Boundaries are not just network boundaries

A module inside one process can be a meaningful architectural boundary if it owns a clear responsibility and hides internal decisions. Conversely, two services deployed separately may be tightly coupled if every feature requires synchronized changes in both.

Good boundaries reduce the number of reasons a component changes and limit how much of the system must be understood to modify it safely.

## Context diagrams

A useful context diagram names the system, external actors, dependencies, and important data flows. It should clarify responsibility rather than depict every class or server. Label relationships with meaningful actions such as “submits payment request” or “receives identity token,” not just anonymous arrows.

## Identify trust boundaries

A trust boundary separates areas with different security assumptions: a browser and server, one tenant and another, an application and a third-party provider, or an operator and a production control plane. Data crossing a trust boundary needs validation and authorization appropriate to that boundary. Never trust a value merely because it came from another component inside the same company.

## Practice

Draw a context diagram for a course platform with learners, instructors, an identity provider, video hosting, email delivery, and a database. Mark who owns each data type, which integrations can fail independently, and which boundaries carry sensitive information.

**Key idea:** make system ownership, dependencies, and trust boundaries explicit before decomposing the internals.
