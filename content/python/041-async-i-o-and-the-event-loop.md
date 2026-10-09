---
title: "Async I/O and the Event Loop"
order: 41
book: "python"
---

# Async I/O and the Event Loop

## Core model

`async def` defines a coroutine function; calling it creates a coroutine object, and an event loop drives it when awaited or scheduled. `await` is a point where the coroutine can suspend while an awaitable makes progress. Async programming is especially useful when tasks spend time waiting on network or other asynchronous I/O.

## How it behaves in real code

An async function does not automatically run concurrently or make blocking work non-blocking. Calling a blocking file or CPU-heavy function on the event-loop thread can stall every task sharing that loop. Use appropriate async libraries, threads, or processes depending on the blocking operation and workload.

## Reasoning exercise

Mark each operation as CPU work, blocking I/O, or async I/O. Then choose an execution model that allows other tasks to progress while the operation waits, and ensure cancellation and cleanup are handled.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
