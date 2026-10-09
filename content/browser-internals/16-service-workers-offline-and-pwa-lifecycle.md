# Service Workers, Offline Experiences, and PWA Lifecycle

> DevsLibrary · Browser Internals · Lesson 16

## Lifecycle states
A service worker may install, activate, control clients, update, and be terminated. Updates are designed to avoid abruptly replacing code in active pages, so old and new versions may coexist temporarily. Plan cache versioning and compatibility between page code and worker code.

## Offline is a product behavior
An offline page should distinguish cached content from actions that require a network. Do not show a false success for a request that never reached the server. Queueing writes requires an explicit consistency and conflict strategy, not merely storing arbitrary requests for later.

## Installability and capabilities
Progressive web app behavior depends on manifest configuration, secure contexts, browser support, and platform rules. Install prompts and background capabilities differ. Do not assume every PWA API exists on every device.

## Failure handling
Test interrupted downloads, stale assets, quota exhaustion, worker update, server outage, and reconnection. Provide a recovery route that does not leave users trapped in a broken cached version.

## Exercise
Design an offline strategy for a reading app and a separate strategy for a banking app. Explain why their cache and write policies should differ.
