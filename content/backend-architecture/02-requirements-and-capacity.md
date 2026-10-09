# Lesson 2: Requirements, Workload Models, and Capacity

**Track:** Foundations

## Learning objectives
- Turn vague scale claims into a workload model
- Estimate throughput and storage
- Use measurements rather than premature scaling

## Lesson
### Describe traffic as a workload

“We expect lots of users” tells you little. Estimate active users, requests per active user, peak-to-average ratio, read/write mix, payload size, and burst patterns. A learning app might receive steady lesson reads during the day but a sharp spike before exams. An event system may receive a burst of webhook deliveries after a provider outage. Different workload shapes stress different components.

Separate normal load, expected peak, and failure-mode load. A service that handles 300 requests per second under normal conditions may receive 1,500 per second after a retry storm. Capacity planning must include retries and background work, not just requests from browsers.

### Back-of-the-envelope calculations

If 20,000 daily active users each make 40 API requests, that is 800,000 requests per day. Spread evenly across 86,400 seconds, the average is about 9.3 requests per second. If peak traffic is 8 times the average, the estimated peak is roughly 75 requests per second. This is a rough model, not a benchmark: real traffic is uneven, and endpoints have different costs.

Estimate storage too. If each of 500,000 users creates 12 records per month and each indexed record averages 1.5 KB including overhead, raw growth is about 9 GB per month before backups, replicas, indexes, and logs. The assumptions matter more than false precision. Write them down and replace them with observed metrics as soon as you can.

### Little's Law and concurrency

Little's Law states that average concurrency equals throughput multiplied by average time in the system: L = λW. At 100 requests per second and an average duration of 0.2 seconds, the system has about 20 requests in flight on average. If a slow dependency raises average duration to 2 seconds, concurrency rises to about 200 at the same throughput. This explains why latency can exhaust connection pools and memory even when incoming request rate has not changed.

Use percentiles as well as averages. A p50 of 80 ms can hide a p99 of 4 seconds. Tail latency often determines user experience and can trigger retries that make the tail worse. Track p50, p95, and p99 by endpoint and dependency.

### Capacity is constrained by the slowest shared resource

A request may pass through a load balancer, application runtime, authentication service, database, and third-party API. The bottleneck can be database connections, CPU, memory, a provider rate limit, or a single hot row. Adding application instances will not fix a saturated database if every instance opens more connections than the database can handle.

Use load tests to identify the first constraint. Test realistic data distributions and query plans, not only an empty local database. Include cache misses, concurrent writes, and dependency timeouts. Record what the test does not model so results are not mistaken for guarantees.

### A capacity worksheet

For each critical endpoint, record expected requests per second, p95 latency target, average payload, database queries per request, external calls, and cache behavior. For each dependency, record connection or rate limits, timeout, retry policy, and fallback. Estimate storage growth and retention. Then test the riskiest assumption first. The aim is not to predict the future perfectly; it is to discover whether your architecture is obviously mismatched to the workload.

## Worked example

If an endpoint performs four database queries and one remote API call, its cost is not represented by HTTP request rate alone. At 100 requests per second, it could issue 400 database queries per second and 100 remote calls per second. Batching, joins, caching, or asynchronous processing may matter more than adding app instances.

## Exercises

1. Estimate average and peak RPS for 12,000 users making 25 requests/day with a 6× peak factor.
2. Use Little's Law for 60 RPS at 350 ms average latency.
3. Name three reasons horizontal scaling might make a service less reliable.

## Solution notes

12,000 × 25 = 300,000 requests/day; average ≈ 3.47 RPS; estimated peak ≈ 20.8 RPS. Concurrency is 60 × 0.35 = 21. Scaling can multiply database connections, increase cache misses, or amplify retries against a shared dependency.

## Review checklist

- Can I explain: turn vague scale claims into a workload model?
- Can I explain: estimate throughput and storage?
- Can I explain: use measurements rather than premature scaling?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
