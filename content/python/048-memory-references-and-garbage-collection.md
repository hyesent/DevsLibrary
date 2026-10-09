---
title: "Memory, References, and Garbage Collection"
order: 48
book: "python"
---

# Memory, References, and Garbage Collection

## Core model

Python variables refer to objects, and objects can remain alive as long as references keep them reachable. CPython commonly combines reference counting with a cyclic garbage collector, but other implementations can use different strategies. Correct code should not depend on an object being finalized at one exact moment.

## How it behaves in real code

Memory growth may come from retained references rather than a leak in the low-level sense: caches without bounds, global lists, closures, callbacks, and cycles can keep data alive. File handles and sockets should be closed explicitly with context managers instead of relying on garbage collection.

## Reasoning exercise

When investigating memory, distinguish high allocation rate from retained memory. Find which objects remain reachable and why; do not assume that deleting one local name frees an object still referenced elsewhere.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
