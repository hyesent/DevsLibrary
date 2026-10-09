# Replication, High Availability, and Failover

Replication copies database changes to another PostgreSQL instance. It can support read scaling, high availability, and disaster recovery, but those are different goals with different failure modes. A replica is not a backup: accidental deletes and malicious changes can replicate too.

## Streaming replication

Physical streaming replication sends WAL from a primary to a standby. A standby can replay changes and may serve read-only queries. Asynchronous replication usually reduces commit latency but allows a failover to lose recently acknowledged transactions that have not reached the standby. Synchronous replication can reduce that risk at the cost of write latency and availability trade-offs.

## Lag and stale reads

A read replica can lag behind the primary. If an application writes a row and immediately reads from a lagging replica, it may not see its own write. Route consistency-sensitive reads to the primary or use a defined strategy for waiting until a replica has replayed the relevant change. Do not assume a replica is current because it is connected.

## Failover is an operational system

High availability needs health checks, leader election or orchestration, fencing to prevent two primaries accepting writes, connection redirection, monitoring, and a tested recovery path. Simply starting a standby does not guarantee clients switch correctly or that the old primary cannot later rejoin unsafely.

## Replication slots and WAL retention

Replication slots help retain WAL until a consumer has received it, but a stalled consumer can cause disk usage to grow. Monitor slot activity and retained WAL. Storage exhaustion can take down a primary even when application traffic is normal.

## Backups remain essential

Replication handles certain machine failures but not every logical error. A backup with a known recovery point allows restoration from before accidental deletion, bad migration, or corruption. Test both failover and backup restoration because they solve different problems.

## Define the failover consistency contract

After failover, a client may reconnect to a server that lacks a recently acknowledged asynchronous commit. Decide whether the application can tolerate that and how it detects or repairs the inconsistency. Synchronous replication reduces certain loss windows but can make commits wait for a standby; if the synchronous standby is unavailable, availability behavior depends on configuration.

Rejoining a former primary requires care: it may contain divergent writes. Do not simply point it back at the cluster and assume it will reconcile. Follow the orchestrator's documented reinitialization or rewind procedure and ensure fencing prevents both nodes from accepting writes as primary.

## Practice

Design a primary/standby plan for an application that can tolerate 30 seconds of data loss but only 5 minutes of downtime. State whether replication is synchronous or asynchronous, how clients reconnect, how split brain is prevented, and what happens if WAL storage grows unexpectedly.
