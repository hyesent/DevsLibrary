# Lesson 12: Edge Runtimes, APIs, and Portability

**Track:** Edge Computing

## Learning objectives
- Compare common runtime assumptions
- Avoid Node-only dependencies in Web API runtimes
- Separate portable logic from provider adapters

## Lesson
### A runtime is a contract

A runtime determines which APIs, module formats, networking features, cryptographic primitives, timers, streams, filesystem operations, and native dependencies are available. Many edge environments expose standard Web APIs such as `Request`, `Response`, `Headers`, `fetch`, `URL`, and Web Crypto. Some support subsets of Node.js compatibility APIs; others have meaningful gaps. A package that works in a Node server may rely on filesystem access, native addons, child processes, or a Node-specific stream implementation.

Read the provider's runtime documentation and test the actual production bundle. Type-checking against browser-like Web APIs does not prove that every dependency behaves correctly in the provider runtime.

### Prefer standards where they fit

Portable handlers can often use `Request` and `Response`, `fetch`, `URL`, `TextEncoder`, streams, and Web Crypto. Standard APIs reduce the number of provider-specific assumptions, but they do not eliminate differences in timeouts, connection reuse, environment variables, cache APIs, scheduling, or observability.

Keep domain logic in ordinary modules with explicit inputs and outputs. Put provider-specific bindings—KV stores, durable objects, queues, database connectors, region metadata, and secret access—behind small adapters. This makes it easier to test business rules locally and to identify the cost of moving providers.

### Dependency and bundle discipline

Before adding a package, inspect its runtime requirements and bundle impact. A tiny utility that imports a huge compatibility layer can increase startup work and deployment size. Native modules may be impossible to use in an isolate-based runtime. Dynamic code evaluation or unsupported Node APIs may be blocked for security or performance reasons.

Use the smallest dependency surface that solves the problem, pin versions, and run deployment-level smoke tests. Local emulators are valuable but may not reproduce provider limits, networking, cache behavior, or production secret bindings exactly.

### Cloudflare Workers, Vercel Functions, Deno Deploy, and Supabase Edge Functions

Cloudflare Workers commonly emphasize isolate-based execution and platform primitives such as bindings, KV, Durable Objects, and Queues. Vercel Functions integrate with Vercel deployments and framework routing; available runtimes and regions depend on the product and configuration. Deno Deploy centers on Deno/Web-standard APIs and its deployment model. Supabase Edge Functions use a Deno-based environment and are often used alongside Supabase Auth and database services. Exact features, limits, regions, and billing change over time, so verify current provider documentation before relying on any numeric limit.

Do not assume these platforms are interchangeable because they all run “functions.” Their state primitives, request lifecycle, database connectivity, background execution, local tooling, and deployment configuration differ. Portability is a spectrum, not a binary property.

### Portability strategy

Keep request parsing, validation, domain decisions, and response mapping as portable as practical. Isolate provider-specific code such as reading a binding, verifying a provider JWT, publishing to a platform queue, or calling a platform cache. Use a small adapter interface and test it with a fake implementation. Do not build a giant abstraction layer for hypothetical providers; isolate only the capabilities that matter.

Document vendor lock-in explicitly. A provider-specific feature may be worth using if it materially improves correctness or operations. The important thing is that the team understands the migration cost and does not confuse portability with free migration.

## Worked example

A portable `validateCreateBooking(input)` function has no knowledge of a provider's environment API. The Cloudflare adapter reads a binding, while a Supabase adapter reads its environment variables and client. Both call the same validation and domain functions, but deployment-specific authentication and persistence are tested separately.

## Exercises

1. List Node.js features that may not exist in an edge runtime.
2. Design an adapter boundary for a provider KV store.
3. Explain why a local emulator is not sufficient evidence of production compatibility.

## Solution notes

Filesystem access, native addons, child processes, and Node-specific APIs may be unavailable. Define `get(key)` and `put(key, value, options)` only if those are the capabilities the domain actually needs. Production may differ in limits, networking, bindings, and runtime versions.

## Review checklist

- Can I explain: compare common runtime assumptions?
- Can I explain: avoid node-only dependencies in web api runtimes?
- Can I explain: separate portable logic from provider adapters?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
