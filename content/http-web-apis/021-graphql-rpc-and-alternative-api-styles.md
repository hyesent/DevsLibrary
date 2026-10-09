# 021. GraphQL, RPC, and Alternative API Styles

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 21 of 30

## Learning goals
- Compare REST-style resource APIs with GraphQL and RPC.
- Understand the trade-offs in schema and operation design.
- Apply security and observability to non-REST APIs.

REST-style APIs commonly expose resources through HTTP semantics. GraphQL lets clients select fields through a schema and query language, which can reduce over-fetching but introduces query-cost, resolver, authorization, and caching challenges. RPC styles expose named operations and may fit command-oriented systems. gRPC uses protocol buffers and HTTP/2, with strong schema tooling and streaming support in suitable environments.

No style removes the need for authentication, authorization, input validation, rate limits, observability, and compatibility policy. GraphQL needs depth/complexity limits and resolver-level access controls. RPC needs explicit idempotency and error semantics. Generated schema types do not automatically enforce domain invariants.

Choose based on clients, team skills, tooling, latency, streaming, and operational needs rather than trends alone. Avoid offering multiple API styles without a clear use case.

## Practice
Choose an API style for a mobile app, internal service-to-service call, and data-exploration interface. Justify the choice and list its risks.
