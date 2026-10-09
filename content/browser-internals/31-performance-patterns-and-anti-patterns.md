# Performance Patterns and Anti-Patterns

> DevsLibrary · Browser Internals · Lesson 31

## Measure before optimizing
Common performance mistakes include shipping oversized images, loading unnecessary JavaScript, blocking the main thread, creating long dependency chains, forcing layout repeatedly, and retaining unbounded caches. Their impact depends on actual usage and device conditions.

## Optimize the bottleneck
If the server response is slow, reducing DOM nodes may not help. If an interaction is blocked by CPU-heavy JavaScript, image compression may not fix INP. Use traces and field data to choose the next change.

## Avoid cargo-cult rules
“Always use the GPU,” “never use event delegation,” “fewer DOM nodes always wins,” and similar rules ignore workload and engine behavior. Measure the effect of the proposed change and preserve maintainability.

## Budgets
Performance budgets can limit JavaScript size, image weight, or interaction time. Make budgets meaningful, measured in the relevant build and environment, and revisited as product needs change.

## Exercise
Create a performance budget for a content page and a data-heavy application screen. Explain why the budgets differ and how you would enforce them in CI.
