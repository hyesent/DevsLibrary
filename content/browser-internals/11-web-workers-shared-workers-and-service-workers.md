# Web Workers, Shared Workers, and Service Workers

> DevsLibrary · Browser Internals · Lesson 11

## Dedicated workers
A dedicated Web Worker runs JavaScript in a separate worker context and communicates with its creator using messages. It does not have direct access to the DOM. Workers are useful for CPU-heavy tasks that can be separated from UI updates.

## Structured cloning and transfer
Messages commonly use structured cloning. Some objects can be transferred, moving ownership rather than copying data. Large repeated copies can be expensive, so measure payload size and frequency.

## Service workers
A service worker can intercept eligible network requests, support offline strategies, and participate in push or background behavior where supported. It has a lifecycle and may be terminated when idle. Do not treat it as a permanent background process.

## Cache strategy
Choose cache-first, network-first, stale-while-revalidate, or another strategy according to resource freshness and failure behavior. Personalized or sensitive responses require careful cache policy. Version caches and remove obsolete entries without deleting unrelated application data.

## Exercise
Build a worker that computes a large result without freezing the UI. Then add a service worker for static assets and test first load, repeat load, offline behavior, update, and stale-cache recovery.
