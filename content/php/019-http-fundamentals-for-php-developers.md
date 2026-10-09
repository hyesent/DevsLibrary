# 019. HTTP Fundamentals for PHP Developers

> Book: PHP · Level: beginner to advanced · Part 19 of 45

# Learning goals
- Understand requests, responses, headers, methods, and status codes.
- Avoid confusing transport with application behavior.
- Build predictable HTTP handlers.

HTTP messages contain a method, target, headers, and sometimes a body; responses contain a status code, headers, and body. PHP applications receive server and request data through the runtime and web server. The exact interface depends on whether the app uses plain PHP, a framework, or a PSR-compatible request abstraction.

Common methods include GET, POST, PUT, PATCH, and DELETE. GET should be safe and normally idempotent; PUT and DELETE are defined as idempotent by HTTP semantics, while POST is not generally idempotent. Status codes communicate outcomes: 2xx success, 3xx redirection, 4xx client-side issue, and 5xx server-side failure.

Headers are not all trustworthy; proxies and hosting configurations affect what PHP sees. Only trust forwarded IP or scheme headers when the application is behind a correctly configured trusted proxy.

## Practice
Design responses for a missing resource, invalid input, unauthenticated request, forbidden operation, and unexpected server error.
