# Web Vitals and Performance Observation

> DevsLibrary · Browser Internals · Lesson 20

## User-centered metrics
Core Web Vitals commonly include Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Their thresholds and evaluation rules can evolve; consult current official documentation for production reporting. Lab data helps diagnose, while field data reveals real user environments.

## What each metric suggests
- LCP concerns the rendering time of the largest visible content element.
- INP measures interaction responsiveness across a page's interactions.
- CLS captures unexpected layout shifts.
A single metric does not summarize the whole user experience.

## Lab versus field
Lab tests are repeatable and useful for debugging but may not match real devices, networks, caches, or user behavior. Field data reflects real conditions but may be aggregated and harder to reproduce. Use both when possible.

## Instrument carefully
Avoid collecting unnecessary personal data. Performance marks and measures can annotate app-specific milestones. Ensure analytics do not become a significant performance burden themselves.

## Exercise
Record LCP, INP-related interaction traces, and layout shifts for a page. Pick one bottleneck and state a hypothesis, a measurable change, and a validation plan.
