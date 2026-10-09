# Partitioning and Large-Table Strategy

Partitioning splits one logical table into multiple physical child tables according to a partition key. It can improve manageability and query performance when queries can exclude irrelevant partitions, and it can make retention operations easier. It is not a general-purpose speed switch; it adds planning and operational complexity.

## Range partitioning by time

```sql
CREATE TABLE audit_events (
  id bigint GENERATED ALWAYS AS IDENTITY,
  occurred_at timestamptz NOT NULL,
  actor_id bigint NOT NULL,
  action text NOT NULL,
  PRIMARY KEY (occurred_at, id)
) PARTITION BY RANGE (occurred_at);

CREATE TABLE audit_events_2026_10
PARTITION OF audit_events
FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');
```

Partition bounds are inclusive at the lower bound and exclusive at the upper bound. Plan ahead for future partitions; inserts that do not match an existing partition can fail unless a default partition or automation covers the case.

## Partition pruning

A query filtering `occurred_at` to a narrow interval can allow PostgreSQL to skip unrelated partitions. A query that omits the partition key may still scan many partitions. The data model and query patterns must align with the partition key for pruning to help.

## Constraints and uniqueness

Partitioning changes some constraint design. A unique or primary key on a partitioned table generally needs to include the partition key so PostgreSQL can enforce uniqueness across partitions. That affects whether a simple global identity is enough for the business's uniqueness requirement. Verify the exact rules for your PostgreSQL version before committing to a partition strategy.

## Retention and operations

Dropping or detaching an old partition can be much faster than deleting millions of rows individually, but only if the retention policy matches partition boundaries and foreign-key/dependency requirements. Partition creation, indexing, vacuum, backup, and monitoring must be automated and tested.

## When not to partition

A modest table with selective indexes may be simpler and faster without partitioning. Partitioning is most useful when table size, retention, maintenance windows, or query pruning justify the extra complexity. Benchmark with realistic row counts and distributions.

## Plan for the partition lifecycle

Partitioning introduces a recurring job: create future partitions before data arrives, monitor for missing partitions, ensure each partition has required indexes, and retire old partitions according to policy. A default partition can prevent failed inserts but may accumulate unexpected rows and complicate later partition creation. Alert when it receives data rather than treating it as an invisible safety net.

Partition pruning is most effective when predicates use the partition key in a form the planner can reason about. Functions, casts, or broad `OR` predicates can interfere with pruning depending on expression and version. Confirm pruning in the execution plan for the exact query pattern.

## Practice

Propose a partitioning design for three years of append-heavy audit events. Define partition interval, indexes, future-partition automation, retention behavior, and what happens if a writer sends an event outside the expected time range.
