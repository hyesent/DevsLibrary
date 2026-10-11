# Route Handlers and HTTP APIs

Use a Route Handler when an external client, webhook, or browser request needs an HTTP interface. A server-rendered page often can query a server-side data module directly instead of calling its own endpoint.

```ts
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
```

This is only a public health response, not a secured business endpoint. `GET` should not mutate state. Choose HTTP methods and status codes intentionally, and document request and response shapes. Parse bodies safely, validate schema and size, and avoid returning raw exception messages.

Authenticate and authorize protected operations. Apply rate limits where abuse is plausible. For cookie-authenticated mutations, understand CSRF defenses and same-site behavior. Verify webhook signatures with the provider's documented method and design retries to be idempotent when possible. Node.js and Edge runtimes have different API and dependency compatibility; test the selected runtime.

**Practice:** Specify `GET /api/books`, `GET /api/books/[id]`, and `POST /api/books`, including auth and error cases.
