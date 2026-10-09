# Chain of Responsibility

## Intent
Pass a request through a sequence of handlers, where each handler may process it, reject it, or pass it onward.

## Example: request checks
```ts
type Request = { authenticated: boolean; bodyBytes: number };

type Handler = (request: Request) => "continue" | "stop";

function runChecks(request: Request, handlers: Handler[]): boolean {
  for (const handler of handlers) {
    if (handler(request) === "stop") return false;
  }
  return true;
}

const checks: Handler[] = [
  request => request.authenticated ? "continue" : "stop",
  request => request.bodyBytes <= 1_000_000 ? "continue" : "stop"
];
```

This is a simplified validation pipeline. Real authorization should use trusted identity and explicit policy results; a request-size limit should normally be enforced at the server or gateway as well as in application logic.

## When it helps
Middleware, validation pipelines, approval flows, and event-processing chains can benefit when handlers are independently composed and order matters.

## Risks
- A request may pass through without being handled.
- Order-dependent behavior may be surprising.
- Logging may not reveal which handler stopped the request.
- A security check can be accidentally omitted when configuring the chain.

For critical checks, use explicit construction, fail-closed defaults, and tests that verify every required handler is present.

## Chain versus pipeline
In a chain, a handler often decides whether to pass the request onward. In a pipeline, each stage commonly transforms data and passes the result to the next stage. The terms overlap, but clarifying the contract helps.

## Summary
Chain of Responsibility makes handler order and composition flexible. Treat ordering, missing handlers, and observability as first-class concerns.
