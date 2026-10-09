# Lesson 14: Edge Functions with Databases: Latency, Pools, and Privilege

**Track:** Edge Computing

## Learning objectives
- Understand database distance and connection constraints
- Protect privileged database access
- Choose safe transaction and pooling patterns

## Lesson
### Database connectivity is often the real bottleneck

A function may start quickly and still be slow because each invocation opens a new database connection or performs several sequential queries. Some edge runtimes do not support traditional TCP drivers or long-lived connections in the same way as a conventional Node server. Providers may offer HTTP-based database APIs, serverless drivers, pooled endpoints, or platform-specific clients. Select a supported path and verify its transaction semantics.

Do not assume that a connection pool behaves the same in a long-lived server and a short-lived or highly distributed function. If every region creates its own pool, connection counts can multiply. Check total connection budgets, pooler mode, transaction support, prepared-statement behavior, and idle-connection handling.

### Reduce round trips before adding complexity

Combine related reads, select only required columns, use joins where appropriate, and avoid N+1 query patterns. A request that makes four serial round trips to a distant database pays the network latency four times. A single well-designed query can be faster and easier to reason about. Measure query time separately from function execution and authentication time.

Keep transactions short. Do not wait for a third-party API while holding database locks. If a business operation spans multiple external systems, model it as a workflow rather than pretending one database transaction can cover the entire process.

### RLS, user-scoped access, and service credentials

Row-level security can enforce data access rules at the database layer, but only if policies are correct and the request context is established securely. Test policies as anonymous users, ordinary users, privileged roles, and users from another tenant. Avoid relying on a client-provided user ID as proof of identity.

A service-role key or equivalent privileged credential may bypass ordinary row-level policies. If a function uses it, the function itself must enforce authorization before reading or writing data. A common safe pattern is to use the caller's verified identity for user-scoped work and reserve privileged access for narrow administrative operations with explicit checks and audit logging.

### SQL safety and transaction behavior

Use parameterized queries or a trusted query builder. Never interpolate untrusted values into SQL identifiers or expressions. Identifiers such as sort columns generally cannot be parameterized like values, so map client choices through a fixed allowlist. Verify whether the database client supports transactions in the selected runtime and connection mode; some HTTP APIs expose transaction capabilities differently from a native driver.

For a critical invariant, rely on database constraints and transaction semantics rather than a sequence of separate function-level checks. Test concurrent requests, duplicate submissions, and retry after a timeout.

### Resilience, limits, and data placement

Set bounded database timeouts and distinguish connection failures, query timeouts, authorization errors, and constraint violations. Retry only operations whose semantics permit it. If the function runs in many regions, consider whether the database's primary region should be fixed and whether read replicas or region-aware routing are worth the complexity. Multi-region writes introduce conflict and consistency questions that must be designed, not assumed away.

Monitor connection count, query latency, pool wait time, errors by code, and request region. A single aggregate latency metric may conceal that one region has a slow path to the primary database.

## Worked example

An authenticated function verifies the caller's token, extracts the user identity from verified claims, and queries `WHERE owner_id = $1 AND id = $2` with parameterized values. A service credential is not used merely to bypass a failed user policy. If privileged access is required, the function checks a separate permission and records the action.

## Exercises

1. Explain why edge placement can worsen a database-backed endpoint.
2. Name four database pooling details to verify for an edge runtime.
3. Describe the extra responsibility created by using a service-role key.

## Solution notes

The database may be geographically distant, and serial round trips dominate latency. Verify total connections, pooler mode, transaction support, prepared statements, and idle handling. Privileged credentials may bypass RLS, so the function must enforce authorization itself.

## Review checklist

- Can I explain: understand database distance and connection constraints?
- Can I explain: protect privileged database access?
- Can I explain: choose safe transaction and pooling patterns?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
