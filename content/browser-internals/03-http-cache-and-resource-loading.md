# HTTP Caching and Resource Loading

> DevsLibrary · Browser Internals · Lesson 03

## Cache layers
A browser may use memory cache, disk cache, service worker-controlled responses, and intermediary caches. HTTP caching is governed by response directives and validators such as `Cache-Control`, `ETag`, and `Last-Modified`. A cached response may be reused directly or validated with the server.

## Freshness and validation
`max-age` defines a freshness lifetime. `no-cache` generally means the response must be validated before reuse, not that it can never be stored. `no-store` instructs caches not to store the response. `private` limits shared-cache storage; `public` can permit shared caching under appropriate conditions.

An `ETag` can support conditional requests using `If-None-Match`; a matching representation can produce `304 Not Modified`. Cache policy must account for personalized data and sensitive content.

## Resource discovery
The browser discovers scripts, stylesheets, images, fonts, and other resources from markup, CSS, and runtime behavior. Resources may be delayed by discovery order, blocking scripts, CSS dependencies, connection contention, or priority decisions.

## Hints and preload
`preload` is for resources needed soon in the current navigation and must be used carefully; incorrect preloads waste bandwidth. `preconnect` may reduce connection setup latency for a known critical origin. These hints are optimizations, not guarantees.

## Exercise
Reload a page normally, with cache disabled, and after clearing site data. Compare requests and cache indicators. Explain which resources are reused and why.
