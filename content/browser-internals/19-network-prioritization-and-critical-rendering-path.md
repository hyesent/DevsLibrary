# Network Prioritization and the Critical Rendering Path

> DevsLibrary · Browser Internals · Lesson 19

## Critical resources
The critical rendering path is the set of work required before meaningful content can render. HTML, render-blocking CSS, fonts, and scripts can influence this path. Resource priority and discovery timing matter as much as total transfer size.

## Reduce unnecessary blocking
Inline only small critical CSS when it measurably helps; large inline blocks can delay other work and defeat caching. Defer noncritical scripts, split code sensibly, and avoid loading resources that are not needed for the current view. Over-splitting can add request and scheduling overhead.

## Priority hints
Browsers assign priorities based on resource type, discovery, viewport relevance, and heuristics. Features such as `fetchpriority` can influence priority in supported browsers, but should be used selectively and verified in traces. Incorrectly prioritizing many resources makes the hint ineffective.

## Measurement
Use a network waterfall and performance trace. Identify the resource that gates meaningful content, the dependency that delays it, and whether the bottleneck is latency, bandwidth, CPU, or main-thread scheduling.

## Exercise
Optimize a page's largest above-the-fold image and critical CSS. Compare before-and-after traces on a throttled network and explain any regressions.
