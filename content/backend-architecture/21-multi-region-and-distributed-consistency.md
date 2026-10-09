# Lesson 21: Multi-Region Systems and Consistency

**Track:** Advanced

## Learning objectives
- Distinguish replication from global consistency
- Choose a consistency model per feature
- Plan regional failure behavior

## Lesson
### Replication is not a free global database

Replicas can improve read locality and recovery, but they introduce replication lag, failover behavior, and operational complexity. A write accepted in one region may not be visible immediately in another. A read from a lagging replica can make a user believe a change was lost. Document which reads require read-your-writes consistency and which can tolerate stale data.

Multi-region architecture should be justified by latency, availability, data residency, or disaster-recovery requirements. It is not automatically better for a small system.

### Consistency is a product decision

A public article view count can tolerate eventual consistency. A seat reservation, bank balance, or unique username often needs stronger coordination. Choose consistency based on the invariant and user expectation, not a generic slogan. Stronger global coordination can increase latency or reduce availability during network partitions; weaker coordination can produce conflicts that require resolution.

For each feature, ask what stale or conflicting state the user might see, whether that state can cause harm, and how the system converges afterward.

### Partitioning and data ownership

Partitioning data by tenant or region can improve locality but makes cross-partition queries and transactions harder. Choose partition keys based on access patterns and growth. A hot tenant or skewed key distribution can overload one partition even when average load appears healthy.

Do not split data simply by geography if users frequently share data across regions or if legal ownership differs from physical location. The partition key should support both correctness and operational balance.

### Failover and disaster recovery

High availability and disaster recovery are related but distinct. Availability is about continued service during failures; disaster recovery is about restoring service and data after a major event. Define RTO (how quickly service should return) and RPO (how much data loss is acceptable). Backups are only useful if restoration is tested.

Failover can create split-brain or duplicate processing if the old primary continues accepting writes. Understand fencing, leader election, DNS/cache behavior, replication status, and client retry behavior. A runbook should specify how to confirm the old writer is stopped before promoting a new one.

### Conflict resolution

If multiple regions accept writes to the same logical record, conflicts need a rule: last-write-wins, version checks, field-level merge, a single-writer home region, or domain-specific reconciliation. Last-write-wins can silently discard important updates and depends on clock assumptions. CRDTs can help for certain mergeable data types but do not solve every business invariant.

Prefer a single authoritative writer for sensitive transactional data unless there is a clear requirement and design for multi-writer conflict resolution.

## Worked example

A global content site may serve public reads from regional replicas while routing editorial writes to a primary region. The UI can tolerate a short propagation delay for public content, but a newly published article's author should receive a clear success response and the system should provide read-your-writes behavior where needed.

## Exercises

1. Define RTO and RPO for a small commerce service.
2. Choose eventual or strong consistency for a seat reservation and justify it.
3. Explain why promoting a replica can be unsafe if the old primary is still writing.

## Solution notes

RTO is the target recovery duration; RPO is the acceptable data-loss window. Seat reservation requires coordination strong enough to prevent double booking. Two active writers can accept conflicting updates, so fencing and confirmation that the old writer is stopped matter.

## Review checklist

- Can I explain: distinguish replication from global consistency?
- Can I explain: choose a consistency model per feature?
- Can I explain: plan regional failure behavior?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
