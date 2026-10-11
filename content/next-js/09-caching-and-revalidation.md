# Caching, Revalidation, and Freshness

Caching reduces latency and load but raises the question: how stale may a result be? Next.js has multiple caching layers, and defaults have changed across releases. Do not assume every `fetch` is cached or every route is static. Consult documentation for the exact version in the lockfile and test production behavior.

For each source, record whether it is public or user-specific, acceptable staleness, invalidation events, stale-data behavior, and what happens when refresh fails. Public articles may tolerate a delay; authorization decisions and sensitive account data need stricter handling.

APIs such as `revalidatePath` and `revalidateTag` can invalidate route output or tagged data after mutations. The right choice depends on how data is fetched and cached. Revalidation is not a substitute for a successful database write, and cache keys must preserve user isolation.

Test mutation then read, failed writes, concurrent updates, and two different users in a production-like environment. Treat cross-user cache leakage as a security issue, not a display bug.

**Practice:** Define freshness policies for a public article, course progress, a shopping cart, and a private admin report.
