# Base Paths, Client Routing, and Hosting

## Client-side routes need host support
A single-page app may handle `/books/123` in the browser after its entry HTML loads. When a user enters that deep URL directly, the host must serve the correct entry document rather than returning a server 404, unless the application intentionally uses server routes.

## Base path
If an app is deployed under a prefix such as `/portal/`, asset paths and router behavior must account for it. Vite's `base` configuration affects generated asset URLs. Framework routers may require their own base-path setting. These settings are related but not automatically interchangeable.

## Static hosting
Static hosting is simple and often inexpensive, but it cannot execute server-only code. APIs may be hosted separately, and cross-origin requests then require correct CORS and authentication design. Do not treat CORS as a substitute for access control.

## Reverse proxies and cache headers
A reverse proxy or CDN may cache static assets. Fingerprinted assets can often be cached for a long time, while the HTML entry should have a policy that allows new deployments to become visible. Avoid caching mutable personalized responses publicly.

## Practice
Deploy a small SPA to a subpath. Test direct navigation, refresh on a nested route, asset loading, and rollback to a previous release.
