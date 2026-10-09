# Regions, Availability Zones, and Resilience

## Learning goals
Choose a deployment location based on latency, legal constraints, service availability and failure recovery—not on a region name alone.

## Location is an architectural choice
A region influences latency to users and dependencies, data residency, service availability, price and recovery options. Measure latency from the users and systems that matter. A region geographically near you may not be near most customers, and network paths do not always follow straight-line distance.

An availability zone is intended to isolate some failures from other zones in the same region. Zone independence is useful but not absolute: shared control planes, regional networking, human error or software defects can affect multiple zones. Multi-zone deployment improves resilience against some failures; it does not automatically provide disaster recovery from a region-wide event.

## Match design to recovery objectives
Two useful business targets are:

- **RTO (Recovery Time Objective):** how long the service can be unavailable before the impact is unacceptable.
- **RPO (Recovery Point Objective):** how much recent data loss, measured in time, is acceptable.

A service with an RPO of five minutes needs a data-protection strategy that can plausibly meet that target. A nightly backup alone cannot meet it. A strict RTO may require tested automation, replicated infrastructure and a practiced decision process rather than a written plan.

## Availability patterns
A single instance is simple and cheap but is a single failure point. Multiple instances across zones can improve availability if traffic is routed around unhealthy instances and the app does not depend on a single-zone database or shared filesystem. Active-passive regional recovery can lower cost compared with fully active multi-region operation, but failover may take longer and require data promotion or DNS changes.

Multi-region active-active is not a universal best practice. It adds data consistency, conflict resolution, routing, testing and cost complexity. Use it when business requirements justify those trade-offs and the team can operate it.

## Health checks and failover
Distinguish liveness (“should this process be restarted?”) from readiness (“can it safely receive traffic?”). A process can be alive while unable to serve requests because its database pool is exhausted. Health checks should detect meaningful failure without causing restart loops during a temporary dependency outage. Avoid making a readiness endpoint perform an expensive deep check on every request.

## Practice
Write an outage scenario for the loss of one zone and another for loss of the region. State which components fail, whether data remains available, who decides to fail over, how users are redirected, and how data divergence is handled when the original region returns. If the recovery steps have never been rehearsed, the recovery time is an assumption, not a demonstrated capability.
