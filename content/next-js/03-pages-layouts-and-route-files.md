# Pages, Layouts, and Route Files

In the App Router, folders define route segments and special files define behavior. A folder alone does not necessarily create a public page.

- `page.tsx`: UI for a route.
- `layout.tsx`: shared UI wrapping child routes; layouts can persist across navigation.
- `loading.tsx`: loading experience.
- `error.tsx`: segment error boundary; it is a Client Component.
- `not-found.tsx`: not-found UI.
- `route.ts`: HTTP handler, not a React page.

Example: `app/page.tsx` maps to `/`; `app/about/page.tsx` maps to `/about`; `app/dashboard/settings/page.tsx` maps to `/dashboard/settings`. The root layout is required and normally provides `<html>` and `<body>`.

Use nested layouts for stable shared UI such as a dashboard sidebar. Route groups such as `(marketing)` organize files without adding that folder name to the URL. Parallel routes, intercepted routes, templates, and defaults have specific semantics; do not treat them as interchangeable conventions.

**Practice:** Sketch a route tree for `/`, `/books`, `/books/[slug]`, `/account`, and `/account/profile` and decide where layouts belong.
