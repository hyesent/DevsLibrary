# 17. Scalability, Capacity, and Performance

Scalability is the ability to handle growth in workload or resources without unacceptable loss of service quality. Performance is the observed behavior of a system under a workload. A design can scale well for one workload and poorly for another, so capacity planning starts with measurement and demand assumptions.

## Vertical and horizontal scaling

Vertical scaling adds resources to a machine. It is often simple and effective up to practical limits. Horizontal scaling adds instances and can increase capacity or availability, but it introduces coordination, load balancing, shared-state concerns, and more operational work.

A stateless application tier is often easier to scale horizontally because requests can be served by multiple instances. “Stateless” does not mean the whole system has no state; it means the instance does not rely on unique local state that prevents requests from moving between instances.

## Find the bottleneck

The limiting resource may be CPU, memory, database connections, storage I/O, network bandwidth, lock contention, an external provider, or a single serialized operation. Adding application instances can make a database bottleneck worse by increasing concurrent connections and queries.

Use representative load tests, production telemetry, query plans, and profiling to find bottlenecks. Avoid assuming that average latency captures user experience; tail latency often reveals overloaded or uneven components.

## Capacity and headroom

Estimate demand in terms of requests, concurrent work, data growth, and burst patterns. Capacity planning should include headroom for failures and deployments, not merely the exact expected peak. Test degradation and recovery as well as steady-state load.

Little's Law relates average work in a stable system: average number of items in the system equals throughput multiplied by average time in the system. It can help reason about concurrency, but it does not by itself predict capacity or tail latency.

## Caching

Caching can reduce repeated work and latency, but introduces staleness, invalidation, memory pressure, and stampedes. Define the acceptable freshness and cache-miss behavior. A cache must not be the sole source of truth for data that cannot be reconstructed unless the architecture explicitly accepts that risk.

## Practice

A service slows as traffic doubles. Collect evidence for CPU, database connections, query latency, lock waits, cache hit rate, and external dependency latency. Propose experiments to isolate the bottleneck before choosing a scaling strategy.

**Key idea:** scale the constrained part of the system based on measured workload, not on assumptions about which component is slow.
