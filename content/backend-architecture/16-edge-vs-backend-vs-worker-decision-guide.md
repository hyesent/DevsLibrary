# Lesson 16: Choosing Edge Functions, Backend Services, and Workers

**Track:** Edge Computing

## Learning objectives
- Select execution models by workload
- Recognize when edge adds complexity
- Use a repeatable decision framework

## Lesson
### Compare by constraints, not hype

A conventional backend is often a good default for complex business logic, stable database connectivity, long-lived processes, broad library support, and centralized operations. An edge function is useful when request proximity, routing, low-latency lightweight logic, or platform integration produces a measurable benefit. A background worker is appropriate for durable asynchronous jobs, retries, batch processing, and tasks that exceed request deadlines. A long-running service may be needed for persistent connections, streaming sessions, or specialized runtime requirements.

These categories overlap. A product can use edge middleware, a regional API, and workers together. The goal is to assign each workload to the simplest execution model that meets its requirements.

### Decision dimensions

Evaluate request latency and dependency locality, execution duration, CPU and memory needs, supported runtime APIs, database connectivity, concurrency model, state requirements, scheduled work, streaming needs, compliance/data residency, cost at expected volume, local development, observability, and team expertise. Score the top candidates against the actual workload rather than treating every dimension as equally important.

A latency-sensitive redirect with a cache may score strongly for edge. A video transcoding job will likely favor a worker or specialized media service. A payment API may use an edge handler for ingress but still call a regional backend or durable workflow for the core transaction.

### A hybrid architecture is often the honest answer

For example, an edge layer can route requests, apply coarse rate limits, and cache public content. A regional backend owns complex transactional rules and database writes. A queue worker handles emails, exports, and reconciliation. This separates fast request-path tasks from durable work without forcing all code into one platform.

Hybrid systems add boundaries and operational overhead. Define which component owns business state, how requests are traced across them, how authentication context is propagated, and how deployment compatibility is maintained. Do not split a simple application into multiple runtimes without a clear benefit.

### Cost and vendor coupling

Pricing may depend on invocations, CPU time, bandwidth, storage operations, egress, database connections, or minimum instance allocation. A low invocation price can be offset by repeated remote database calls or data transfer. Estimate cost from the workload model and recheck it with measured usage.

Provider-specific state services may be excellent tools but can raise migration costs. Make an explicit choice: accept the lock-in because the feature matters, or isolate the capability to preserve a realistic migration path. Avoid expensive abstractions whose only goal is theoretical portability.

### Decision record and revisit conditions

Write a short decision record with workload facts, chosen runtime, alternatives, risks, operational owner, and revisit triggers. Triggers might include a measured p95 latency target being missed, CPU duration approaching platform limits, connection saturation, new data residency requirements, or a need for durable jobs. A good architecture evolves when evidence changes rather than because a new platform becomes fashionable.

## Worked example

Use edge for a locale redirect and public-cache decision, a regional backend for an order transaction, and a worker for invoice generation and webhook reconciliation. Give all three a shared trace/correlation ID and define ownership of the order state in the backend.

## Exercises

1. Choose a runtime for a 20-minute image-processing job and justify it.
2. Choose a runtime for a lightweight global redirect.
3. Write two measurable conditions that would cause you to move a function off the edge.

## Solution notes

A durable worker or specialized processing service fits the 20-minute job because request-bound edge limits and CPU budgets may be unsuitable. A global redirect with nearby cached mappings is a strong edge candidate. Conditions can include measured latency, CPU/runtime limit violations, unsupported dependencies, or database connection pressure.

## Review checklist

- Can I explain: select execution models by workload?
- Can I explain: recognize when edge adds complexity?
- Can I explain: use a repeatable decision framework?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
