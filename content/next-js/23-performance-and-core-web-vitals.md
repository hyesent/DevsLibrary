# Performance and Core Web Vitals

Core Web Vitals cover loading, responsiveness, and visual stability: LCP, INP, and CLS. Measure before optimizing using lab tools and real-user data where available.

Keep unnecessary client JavaScript small by using Server Components where appropriate and isolating interactivity. Optimize image sizes and fonts, avoid sequential waterfalls for independent requests, and index database queries based on measured access patterns. Cache only when freshness and user isolation remain correct.

Dynamic imports, memoization, custom streaming boundaries, and caching can add complexity. Apply them after profiling identifies a bottleneck and measure again under comparable conditions.

**Practice:** Profile a book listing and identify whether JavaScript, images, server rendering, database access, or layout shift dominates.
