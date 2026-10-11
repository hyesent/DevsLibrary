# Proxy and Request Interception

Recent Next.js versions use `proxy.ts` for request interception; older tutorials refer to `middleware.ts`. Naming, API, and runtime constraints are version-dependent, so match your installed release's documentation and do not blindly create both files.

Proxy is appropriate for lightweight request-level behavior such as locale routing, rewrites, or redirects. It should not become the home for all business logic or database-heavy work. Matchers determine which paths are intercepted; test static assets, APIs, encoded paths, and exclusions.

A Proxy check can improve UX by redirecting unauthenticated visitors, but it is not a substitute for authorization at the data read or mutation. Route Handlers and Server Actions must still enforce permission. Keep the layer compatible with its documented runtime and use a maintained authentication integration for complex flows.

**Practice:** Decide which paths need locale rewriting and which data operations require authorization checks regardless of Proxy behavior.
