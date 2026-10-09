# The Event Loop, Tasks, Microtasks, and Rendering

> DevsLibrary · Browser Internals · Lesson 10

## A practical model
JavaScript in a browsing context runs with an event loop. Tasks can include timers, input events, and message events. Promise reactions and many mutation-observer callbacks run as microtasks. The browser generally drains the microtask queue before moving on, which means an endless chain of microtasks can starve rendering and input.

The exact event-loop model includes multiple task sources and browser scheduling rules; do not assume one simple global FIFO queue for every kind of work.

## Rendering opportunities
The browser needs opportunities to update the rendering. `requestAnimationFrame()` callbacks run in relation to rendering updates and are useful for visual work. Timers do not guarantee an exact execution time; they schedule work no earlier than constraints permit.

## Async behavior
`async` functions return promises. `await` suspends the async function and resumes it through promise scheduling. Network operations do not block the JavaScript thread in the same way as a synchronous loop, but their callbacks still compete for main-thread time.

## Exercise
Log the order of synchronous code, `setTimeout`, `queueMicrotask`, promise callbacks, and `requestAnimationFrame`. Run the experiment in multiple browsers and document which ordering is specified and which depends on timing.
