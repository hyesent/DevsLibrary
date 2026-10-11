# Suspense, Streaming, and Perceived Performance

Streaming can send ready parts of a response while slower regions continue rendering. React Suspense boundaries can show fallbacks while child work is pending. Put boundaries around meaningful regions: a dashboard summary may be ready before a chart.

A single giant fallback can block the whole page; too many tiny boundaries can create noise. Use skeletons that preserve approximate dimensions, label long-running work, and never imply a transaction is complete before it succeeds. Start independent requests in parallel; streaming cannot remove genuine data dependencies.

Pair loading boundaries with error handling and appropriate timeout policy. Make partial failure understandable. Measure time to first byte, LCP, CLS, and responsiveness instead of assuming streaming always improves performance.

**Practice:** Design independent streaming regions for a page with a header, book list, and recommendations.
