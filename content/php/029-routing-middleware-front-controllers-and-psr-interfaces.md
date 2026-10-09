# 029. Routing, Middleware, Front Controllers, and PSR Interfaces

> Book: PHP · Level: beginner to advanced · Part 29 of 45

# Learning goals
- Understand request dispatch.
- Use middleware for cross-cutting concerns.
- Recognize framework interoperability standards.

A front controller receives requests and delegates them to routes. Middleware forms a pipeline around a handler and can implement request IDs, authentication, logging, rate limiting, or exception translation. Ordering matters: authentication before protected handlers, error handling around the pipeline, and body parsing before code that depends on parsed input.

PSR-7 defines HTTP message interfaces, PSR-15 defines request handlers and middleware, and PSR-11 defines a container interface. These standards can help libraries interoperate, but an interface does not guarantee secure behavior or a good architecture.

Do not implement a full HTTP stack casually for production. Use a maintained framework or router when it provides value, and understand its lifecycle, configuration, and security model. Keep route definitions explicit and test status codes, headers, and authorization behavior.

## Practice
Sketch a middleware chain for request IDs, exception handling, authentication, and a route handler. Explain which layer should translate domain errors to HTTP status codes.
