# Cross-Browser Debugging and Reproducible Bugs

> DevsLibrary · Browser Internals · Lesson 32

## Reduce the problem
When a bug appears in one browser, create a minimal reproduction that isolates HTML, CSS, JavaScript, resources, and the triggering action. Remove unrelated dependencies until the cause becomes clear.

## Compare environments
Record browser version, operating system, device, viewport, zoom, network conditions, feature flags, and relevant privacy settings. A bug may depend on font availability, GPU drivers, extension behavior, storage policy, or timing.

## Use evidence
Capture console output, network requests, performance traces, and the exact expected versus actual behavior. Test a stable reproduction across the supported matrix. Avoid assuming a browser bug before ruling out unsupported behavior and application assumptions.

## Workarounds
If a workaround is necessary, isolate it behind feature detection or a clearly documented compatibility layer. Include a regression test and remove the workaround when the underlying issue is resolved, if practical.

## Exercise
Take a layout or API bug and create a minimal reproduction plus a cross-browser test matrix. Write a concise issue report that another engineer can follow.
