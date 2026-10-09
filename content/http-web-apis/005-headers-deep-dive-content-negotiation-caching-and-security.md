# 005. Headers Deep Dive: Content Negotiation, Caching, and Security

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 5 of 30

## Learning goals
- Use headers to describe representations and policies.
- Understand content negotiation and cache controls.
- Avoid trusting client-supplied metadata.

`Content-Type` identifies the representation format; `Accept` expresses acceptable formats. `Authorization` carries credentials according to a scheme. `Cache-Control` governs caching behavior. `ETag` identifies a representation version for validators. `Vary` tells caches which request headers affect the selected representation. `Location` can identify a created resource or redirect target.

Security-related headers are not a substitute for server-side authorization. CORS response headers govern browser access to cross-origin responses; they do not stop a non-browser client from calling an API. Forwarded headers such as `X-Forwarded-For` or `Forwarded` should be trusted only when set by known proxies configured to remove or overwrite untrusted incoming versions.

Avoid placing secrets in URLs because URLs can appear in logs, browser history, referrer data, and monitoring. Do not assume custom headers are confidential. Validate header lengths and values, and avoid reflecting arbitrary request headers into responses.

## Practice
Review a sample request and response. Identify which headers affect content selection, authentication, caching, proxy trust, and browser behavior.
