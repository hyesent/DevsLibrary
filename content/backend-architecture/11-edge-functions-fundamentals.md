# Lesson 11: Edge Functions: Execution Model and Trade-offs

**Track:** Edge Computing

## Learning objectives
- Understand edge execution models and limits
- Choose workloads suited to edge placement
- Reason about latency, cold starts, and regional data

## Lesson
### What “edge” actually means

An edge function runs code in infrastructure distributed closer to users or near a provider's network edge. The word does not guarantee that every invocation executes in the user's city, nor that all data dependencies are nearby. A function may run close to the browser but call a database in another continent, making the database round trip dominate the request.

Think in terms of the entire path: client → edge point of presence → function runtime → authentication service → database or upstream API → response. The function's placement is only one segment. Measure end-to-end latency and understand where the data lives before assuming edge deployment is faster.

### Serverless, edge, isolates, and conventional servers

Serverless usually describes an execution and billing model in which the platform manages capacity and instances are invoked on demand; it does not necessarily mean edge execution. Edge platforms often use lightweight isolates or restricted runtimes rather than a complete general-purpose operating system process. Conventional servers may provide long-lived processes, broader library compatibility, local disk access, and persistent connections. Background workers may offer long execution windows that are unsuitable for request-bound edge handlers.

These are different execution models with different constraints. Check the actual platform contract for CPU time, wall-clock duration, memory, request body size, streaming behavior, region selection, concurrency, and supported APIs. Do not assume limits are the same across providers or plans.

### Cold starts and startup cost

A cold start occurs when the platform needs to initialize execution state before serving an invocation. Lightweight runtimes can reduce startup overhead, but bundle size, module initialization, cryptography, dependency loading, and connection setup still matter. Large dependency graphs and expensive top-level work can increase latency. Keep startup deterministic and avoid doing per-request work during module initialization unless the runtime's lifecycle makes that appropriate.

Do not optimize solely for a theoretical cold start. Measure warm and cold behavior under realistic deployment conditions. For an authenticated API, token verification or a remote database lookup may dominate runtime startup.

### Data locality can reverse the benefit

Suppose a user is 30 ms from an edge location but 180 ms from the primary database. If the function performs three serial database round trips, it may be slower than a regional server colocated with the database. Combine queries, avoid chatty access patterns, and consider read replicas or regional data placement only when consistency, cost, and operational complexity permit it.

Data residency and compliance also matter. Moving compute nearer to a user does not automatically mean data stays in a permitted jurisdiction. Know where logs, caches, traces, and database replicas are stored.

### Good and poor edge workloads

Edge is often a good fit for lightweight request routing, redirects, header normalization, cache decisions, content negotiation, coarse bot filtering, and small APIs whose data dependencies are also nearby. It can also be appropriate for authenticated operations when the identity provider, database access pattern, and runtime constraints are understood.

Long-running CPU-heavy jobs, native binaries, large file transformations, durable scheduled workflows, and workloads requiring broad operating-system APIs may fit a worker, container, or conventional backend better. “Can run at the edge” is not the same as “should run at the edge.” Choose based on measured latency, limits, portability, and operational ownership.

## Worked example

A redirect service can map a short URL to a destination using a nearby cache. A complex report that joins several large tables in a distant primary database is unlikely to benefit from being moved to the edge without redesigning its data access.

## Exercises

1. Draw the full path for an edge API request and mark every network round trip.
2. Name four platform limits to verify before choosing a provider.
3. Explain why edge execution does not automatically improve database latency.

## Solution notes

Include client, edge runtime, identity provider, database, and upstream APIs. Verify CPU/wall-clock duration, memory, body size, supported APIs, and region/data constraints. The database still sits at its own network location; serial remote queries can dominate total latency.

## Review checklist

- Can I explain: understand edge execution models and limits?
- Can I explain: choose workloads suited to edge placement?
- Can I explain: reason about latency, cold starts, and regional data?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
