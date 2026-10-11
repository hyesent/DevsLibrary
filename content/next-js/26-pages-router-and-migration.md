# Pages Router and Migration Strategies

The Pages Router uses `pages/` and APIs such as `getStaticProps`, `getServerSideProps`, and API routes. The App Router uses `app/`, layouts, Server Components, and Route Handlers. Pages Router remains supported; migration is a project decision, not a requirement.

Do not use App Router `layout.tsx` conventions in a Pages Router route or `getServerSideProps` in an App Router page. Large applications can migrate incrementally. Start with a low-risk route, compare metadata, rendering, navigation, authentication, and caching, then expand. Keep shared modules compatible with both environments and avoid importing server-only code into browser bundles.

Test deep links, redirects, query parameters, back-button behavior, and cross-user cache isolation. Use small changes and retain rollback options.

**Practice:** Plan a route-by-route migration for a ten-page blog and define regression tests and rollback criteria.
