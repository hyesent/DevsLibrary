# Static Sites, Frontends, and Edge Delivery

## Learning goals
Deploy a frontend without leaking server-only secrets and understand the distinction between build-time and request-time behavior.

## Static versus dynamic delivery
A static site is a set of files served by a web server or content delivery network (CDN). It can be fast, globally cached and operationally simple. A frontend framework may also require server-side rendering, API routes or server components; those parts need an execution environment and cannot be treated as files alone.

A CDN caches content at edge locations closer to users. Cacheability depends on headers, URL identity, cookies, authorization and provider rules. Do not cache personalized or sensitive responses as public content. For immutable, content-hashed assets, long cache lifetimes are usually appropriate; HTML entry points often need shorter caching so users discover new asset references.

## Build-time environment values
Frontend environment variables are often substituted into client-side bundles during the build. Anything shipped to the browser is public, even if the variable name contains `SECRET`. Keep private credentials on a server-side boundary and expose only the minimum data the client is intended to see.

## Routing and cache invalidation
Single-page applications may need a fallback route so `/settings/profile` serves the app shell. A careless fallback can hide genuine missing files or API routes. Cache invalidation can be expensive and inconsistent, so content-hashed filenames are often safer for assets than repeatedly purging broad cache patterns.

## Preview deployments
Preview environments are useful for review, but they can accidentally access production data or internal APIs. Give previews isolated credentials and data, restrict sensitive previews if needed, and ensure pull-request code cannot obtain production secrets. Treat untrusted contributions as potentially malicious code.

## Practice
Deploy a static frontend with hashed assets and a small API. Decide which routes are static, which are dynamic, how the CDN caches each response, how browser code receives public configuration, and how a release avoids HTML pointing to assets that no longer exist. Test both a deep link and a missing asset before calling the deployment complete.
