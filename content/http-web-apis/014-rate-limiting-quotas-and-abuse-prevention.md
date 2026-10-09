# 014. Rate Limiting, Quotas, and Abuse Prevention

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 14 of 30

## Learning goals
- Protect service availability and expensive operations.
- Distinguish per-IP, per-user, per-key, and per-tenant limits.
- Return a useful response when limits are exceeded.

Rate limiting may use fixed windows, sliding windows, token buckets, or leaky buckets. Each has different burst and fairness properties. A distributed API may need a shared counter store such as Redis; clock drift, race conditions, key cardinality, and store failure need policy decisions.

Choose the identity dimensions carefully. IP-only limits can punish users behind NAT and be bypassed by distributed sources. Per-account limits require careful handling of unauthenticated login attempts. Expensive endpoints may need tighter quotas than inexpensive reads. Include resource limits for body size, query complexity, pagination, concurrency, and timeouts.

429 Too Many Requests communicates throttling; `Retry-After` can guide clients when known. Do not expose detailed anti-abuse thresholds if that makes evasion easier. Rate limits complement, rather than replace, authentication, authorization, and fraud controls.

## Practice
Create rate-limit policies for login, public search, report generation, and payment creation. Define behavior if the rate-limit store is unavailable.
