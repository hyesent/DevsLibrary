# Network, Storage, and Rendering DevTools

> DevsLibrary · Browser Internals · Lesson 22

## Network panel
Inspect request URL, method, status, initiator, timing, transfer size, response headers, and cache behavior. The initiator chain can reveal why a resource was requested. Preserve logs across navigation when investigating redirects or multi-step flows.

## Storage panel
Inspect cookies, local storage, session storage, IndexedDB, Cache Storage, and service worker state where supported. Clear data selectively when testing; clearing everything can hide a reproducibility condition.

## Rendering tools
Browser tools may expose paint flashing, layer borders, layout shift regions, emulated media features, and frame statistics. Availability and naming differ by browser and version.

## Console and source maps
Use the console to inspect runtime errors and warnings. Source maps help map bundled code to source files, but production maps should be published according to your security and debugging policy.

## Exercise
Investigate a page that shows stale data after a deployment. Use network and storage panels to determine whether the cause is HTTP cache, service worker cache, application storage, or server behavior.
