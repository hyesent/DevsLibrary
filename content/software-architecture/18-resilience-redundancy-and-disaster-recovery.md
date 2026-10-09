# 18. Resilience, Redundancy, and Disaster Recovery

Resilience is the ability to continue providing acceptable behavior or recover when components fail. Redundancy can help, but duplicated components are useful only if they do not share the same failure mode and the system can switch safely.

## Availability and failure domains

Two application instances on the same host do not protect against host failure. Two hosts in the same power or network failure domain may fail together. Redundancy should be considered across the failure domains relevant to the service's risk, balanced against cost and complexity.

A highly available system still needs a plan for corrupted data, operator mistakes, credential compromise, and regional outages. Availability and recoverability are related but not interchangeable.

## Timeouts, retries, and load shedding

Timeouts bound waiting. Bounded retries with backoff and jitter can recover from transient failures. Load shedding rejects or defers lower-priority work when capacity is exhausted. These mechanisms should preserve critical invariants and communicate degraded behavior clearly.

## Backups and recovery objectives

The **recovery point objective (RPO)** describes how much data loss, measured in time, can be tolerated. The **recovery time objective (RTO)** describes how long recovery may take. A backup schedule should be aligned with the RPO, and restore performance with the RTO. Both must be tested, not inferred from configuration.

Replication is not a replacement for backups: accidental deletion or corrupted data may replicate to every replica. Backups should have appropriate access controls, retention, and isolation from the primary environment.

## Failover and split brain

Automatic failover can improve recovery time but may risk two nodes accepting conflicting writes if leadership is not controlled. Define the authority to promote a replica, fencing behavior, and how stale data is handled. A failover runbook should include verification that the former primary cannot resume writes incorrectly.

## Disaster recovery is a workflow

Document how to restore identity, secrets, databases, object storage, message brokers, DNS, and application services in the required order. Dependencies that are omitted from recovery planning can make a technically successful database restore unusable.

## Practice

Create a disaster recovery plan for a course platform. Set provisional RPO/RTO targets, list the critical dependencies, define restore order, and design a scheduled recovery exercise that verifies real user workflows after restoration.

**Key idea:** resilience depends on independent failure domains, explicit recovery targets, and tested restoration—not merely multiple servers.
