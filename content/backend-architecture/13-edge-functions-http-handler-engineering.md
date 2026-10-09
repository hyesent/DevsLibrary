# Lesson 13: Building Production-Ready Edge HTTP Handlers

**Track:** Edge Computing

## Learning objectives
- Build predictable Request/Response handlers
- Validate inputs and centralize error mapping
- Handle CORS, authentication, and safe configuration

## Lesson
### Treat a handler as a small application boundary

A robust function has a clear lifecycle: inspect method and path, apply allowed-origin policy, authenticate if required, parse the body safely, validate its shape, authorize the action, call domain logic, and construct a response. Each stage should have a defined failure result. Avoid one giant handler with nested conditionals and catch-all responses that turn every failure into HTTP 200.

A function may be invoked concurrently or reused by the platform, so do not keep request-specific identity or mutable state in module-level variables. Module-level immutable configuration or reusable clients may be appropriate if the provider documents their lifecycle. Never assume an invocation receives a fresh process.

### Request parsing and response discipline

Check content type before parsing JSON, and handle malformed JSON separately from valid JSON with an invalid schema. Enforce reasonable body-size limits where supported. Normalize input at the boundary; reject unexpected fields when that is part of the contract. Construct responses with explicit status, content type, cache policy, and correlation ID where appropriate.

Use a consistent error envelope such as `{ error: { code, message, requestId } }`. Keep internal exception messages in restricted logs, not in public responses. Avoid returning stack traces or database errors. For successful creates, return an appropriate status and resource location when the API contract calls for it.

### CORS is browser policy, not authentication

CORS controls whether browsers allow scripts from one origin to read a response. It does not stop curl, server-to-server requests, or a malicious client from calling a public endpoint. For credentialed requests, allow explicit trusted origins rather than `*`, and return `Vary: Origin` when the response varies by origin. Handle preflight `OPTIONS` requests and allow only required methods and headers.

CORS configuration and authorization are separate. An endpoint that changes data still needs authentication, authorization, input validation, and CSRF considerations appropriate to the client architecture.

### Authentication and authorization in the handler

Verify tokens using a trusted library or provider integration. Validate issuer, audience, expiration, signature, and allowed algorithm according to the token format. Do not decode a JWT and trust its payload without verifying the signature. After identity is established, authorize the specific operation and resource. For tenant-scoped records, derive tenant context from trusted identity and enforce it in the database query or policy.

Avoid passing privileged service credentials to client code. If a function uses a service-role credential, treat the function as a privileged security boundary: every input must be validated and every operation must enforce the intended authorization policy.

### Configuration, secrets, and error mapping

Load secrets from the platform's secret mechanism, not from hardcoded literals or a public frontend environment variable. Fail clearly when required configuration is absent. Map known errors to stable public codes; log unknown errors with a request ID and return a generic 500 response. Include enough telemetry to diagnose failures without exposing tokens, personal data, or SQL parameters.

Define response caching intentionally. Authenticated or personalized responses should not accidentally be cached publicly. If a response depends on an origin, language, or authorization context, ensure the cache key or cache policy accounts for it.

## Worked example

A minimal Web API handler can return `new Response(JSON.stringify({ error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON' } }), { status: 400, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })`. The example is intentionally small; production code should centralize response construction and include safe request correlation.

## Exercises

1. List the stages of a safe JSON POST handler.
2. Explain why CORS is not an access-control mechanism.
3. Design public error codes for invalid JSON, unauthenticated, forbidden, conflict, and unexpected failure.

## Solution notes

Method/origin policy, authentication, bounded body parsing, schema validation, authorization, domain operation, response mapping, and telemetry. CORS only controls browser response access. Use stable codes such as INVALID_JSON, UNAUTHENTICATED, FORBIDDEN, CONFLICT, and INTERNAL_ERROR.

## Review checklist

- Can I explain: build predictable request/response handlers?
- Can I explain: validate inputs and centralize error mapping?
- Can I explain: handle cors, authentication, and safe configuration?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
