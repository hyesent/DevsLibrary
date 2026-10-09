# 013. Caching, Conditional Requests, and Cache Invalidation

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 13 of 30

## Learning goals
- Use cache headers and validators correctly.
- Distinguish browser, proxy, CDN, and application caches.
- Avoid leaking private data through shared caches.

`Cache-Control` directives such as `public`, `private`, `no-store`, `max-age`, and `s-maxage` affect different caching scenarios. `ETag` and `Last-Modified` support conditional requests. Clients may send `If-None-Match` or `If-Modified-Since`; a server can respond with 304 when the representation has not changed.

Caching must account for authorization, tenant identity, language, content negotiation, and any request dimension that changes the representation. `Vary` helps caches distinguish variants, but incorrect or excessive use can cause bugs or poor cache efficiency. Sensitive responses should have explicit policies rather than relying on defaults.

Invalidation is a design problem: update the cache when data changes, use short freshness windows, version keys, or choose not to cache. Stale-while-revalidate and stale-if-error can improve resilience when the data's freshness requirements permit them.

## Practice
Set policies for public documentation, a user's private account, and a rapidly changing inventory endpoint. Explain how you prevent cross-user cache leakage.
