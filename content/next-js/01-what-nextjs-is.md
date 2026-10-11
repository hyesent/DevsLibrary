# What Next.js Is and When to Use It

## Learning goals
Explain how Next.js extends React, identify its strengths, and choose a rendering strategy based on requirements.

React describes UI components; a production application also needs routing, rendering, asset handling, build tooling, deployment conventions, and often server-side data access. Next.js integrates these concerns. The App Router uses `app/` and React Server Components; the older Pages Router uses `pages/` and remains supported. Their APIs are not interchangeable.

Rendering is a design choice. A route may be prerendered, rendered per request, or use client-side interaction. Public content, private dashboards, and collaborative tools have different freshness, latency, SEO, and infrastructure requirements. Server rendering is not automatically fastest, and client rendering is not inherently wrong.

Choose Next.js when file-based routing, server rendering, server-side data access, metadata, or integrated asset optimization materially help. A small static site may not need a full-stack framework. Next.js does not automatically make an app secure, accessible, cached, or fast: authorization, validation, cache boundaries, and UX remain your responsibility.

**Practice:** For a public documentation site, private analytics dashboard, and real-time editor, identify which data can be prerendered and which requires request-specific or client-side behavior.
