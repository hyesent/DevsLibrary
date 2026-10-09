# Browser Compatibility and Progressive Enhancement

> DevsLibrary · Browser Internals · Lesson 29

## Support is a product decision
Define supported browsers and versions from audience, usage data, risk, and organizational requirements. A feature being in a standards document does not mean every browser supports it identically today.

## Feature detection
Prefer detecting capabilities over sniffing user-agent strings. Use feature detection and targeted fallbacks when an API is unavailable. Polyfills can add size and complexity, so include them only where needed.

## Progressive enhancement
Start with meaningful content and a functional baseline, then add richer behavior. This improves resilience when scripts fail, APIs are unsupported, or network conditions are poor. Some applications require JavaScript for core functionality, but they should still handle loading and runtime failure intentionally.

## Compatibility testing
Test the actual support matrix, including embedded webviews if relevant. Consider differences in input behavior, font rendering, storage policy, permissions, and accessibility APIs—not just whether the page loads.

## Exercise
Choose a modern API used in your app. Define a feature-detection strategy, fallback behavior, and a test plan for unsupported environments.
