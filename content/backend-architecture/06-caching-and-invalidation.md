# Lesson 6: Caching, Freshness, and Invalidation

**Track:** Core Design

## Learning objectives
- Choose cache locations intentionally
- Define freshness guarantees
- Avoid cache stampedes and stale authorization

## Lesson
### Cache only after understanding the source of cost

Caching can reduce latency, database load, and repeated computation, but it adds a second representation of state. First measure the expensive operation and determine whether its output is safe to reuse. Public, mostly static lesson content is a strong candidate. A user's current permissions or account balance may need stricter freshness guarantees.

Choose the layer that matches the use case: browser cache, CDN, reverse proxy, application memory, distributed key-value store, or database cache. Each has different scope, invalidation behavior, failure modes, and operational cost.

### Keys, TTLs, and invalidation

A cache key must include every input that changes the result. If a response depends on locale, role, tenant, query parameters, or API version, omitting one can leak data or return incorrect content. Use canonical key construction and avoid putting secrets or raw personal data in keys where logs or dashboards expose them.

A time-to-live is a bounded staleness policy, not a complete invalidation strategy. On content updates, you may invalidate known keys, use versioned keys, or tolerate a short stale window. Explicitly decide what happens if invalidation fails. For critical data, cache-aside is often simpler to reason about than attempting to make a cache the source of truth.

### Cache stampedes and negative caching

When a popular key expires, many requests may simultaneously recompute the same value. This cache stampede can overload the database precisely when the cache is least helpful. Mitigations include request coalescing, short randomized TTL jitter, stale-while-revalidate, prewarming, and limiting concurrent recomputation.

Negative caching stores the fact that a lookup returned “not found” for a short period. It can protect a database from repeated misses, but it can also delay visibility of a newly created resource. Choose a shorter TTL for negative results and invalidate them when creation occurs if immediate visibility matters.

### HTTP caching is a contract

`Cache-Control`, `ETag`, `Last-Modified`, `Vary`, and conditional requests let clients and CDNs reuse representations safely. `public` and `private` have important implications. Personalized responses should not accidentally be shared by a CDN. `Vary` must describe relevant request headers, but excessive variation can destroy cache hit rates.

A `304 Not Modified` response saves transfer when the validator still matches, though the server may still need to perform some work to calculate or check the validator. Cache policy should be tested through the actual proxy/CDN path, not only by inspecting headers in a local development server.

### Caching is not durability

An in-memory cache can disappear on restart. A distributed cache can be unavailable. Never store the only copy of a payment result or essential workflow state in an ephemeral cache. Design cache failure behavior: bypass, serve stale data, degrade a feature, or fail closed. The right behavior depends on correctness and security; stale public documentation may be acceptable, while stale authorization can be dangerous.

## Worked example

Cache public course metadata for 60 seconds with a versioned key. Do not cache a response containing a user's enrollment status under a key that omits user identity. If a CDN sits in front of the API, test that `Cache-Control: private` is respected and that authorization headers do not accidentally share a cached response.

## Exercises

1. Design a cache key for localized product details.
2. Explain two ways to reduce a cache stampede.
3. Choose fail-open or fail-closed behavior for a permissions cache and justify it.

## Solution notes

Include product ID, locale, and representation version. Request coalescing and TTL jitter are two valid mitigations. Authorization decisions should generally fail closed or use a deliberately bounded, audited stale policy; the choice depends on the security model.

## Review checklist

- Can I explain: choose cache locations intentionally?
- Can I explain: define freshness guarantees?
- Can I explain: avoid cache stampedes and stale authorization?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
