# Web APIs: Observers and Scheduling

> DevsLibrary · Browser Internals · Lesson 28

## Avoid polling when events can describe change
The platform offers APIs such as `IntersectionObserver`, `ResizeObserver`, `MutationObserver`, and performance observers for specific types of change. They are not interchangeable: use each for its intended signal.

## IntersectionObserver
This API reports when a target intersects a root or viewport according to configured thresholds. It is useful for lazy loading and visibility-aware behavior, but it is not a precise pixel-by-pixel animation clock.

## ResizeObserver
ResizeObserver reports element-size changes. Avoid feedback loops where the callback changes the observed element's size repeatedly. Batch layout-affecting work and test the browser's loop warning behavior.

## MutationObserver
MutationObserver reports configured DOM mutations. Observing an entire large subtree can create unnecessary work; observe the smallest meaningful region and disconnect when the lifecycle ends.

## Scheduling
`requestAnimationFrame` is useful for work coordinated with rendering. `requestIdleCallback` is not universally supported and should not be used for work that must happen by a strict deadline. Choose scheduling APIs according to urgency and availability.

## Exercise
Replace a frequent polling loop with an appropriate observer. Measure callback volume and verify correct cleanup when the component is removed.
