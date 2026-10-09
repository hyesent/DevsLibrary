# Memory Management, Garbage Collection, and Leaks

> DevsLibrary · Browser Internals · Lesson 12

## Reachability
JavaScript engines manage memory automatically, usually with garbage collection. An object can be reclaimed when it is no longer reachable from relevant roots. Garbage collection timing is not deterministic and should not be used as application logic.

## Common leak patterns
Leaks can result from retained event listeners, global caches, closures holding large objects, detached DOM trees, observers that are never disconnected, timers, and references stored in long-lived state. A memory leak is often gradual and may only appear after repeated navigation or interaction.

## Diagnose, do not guess
Use heap snapshots, allocation timelines, performance profiles, and repeated interaction tests. Compare snapshots before and after exercising a workflow. Look for retained objects and paths to roots rather than assuming every large allocation is a leak.

## Lifecycle cleanup
Remove listeners when components unmount, cancel timers, disconnect observers, abort unneeded fetches, and bound caches. Use weak references only when their semantics fit the problem; they are not a general replacement for explicit lifecycle management.

## Exercise
Create a demo that adds listeners on every render without removing them. Measure the growth, fix the lifecycle, and confirm that repeated interactions no longer retain unnecessary objects.
