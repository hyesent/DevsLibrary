# Metadata, SEO, and Social Sharing

The App Router supports a `metadata` export for known values:

```tsx
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Books | Example Library',
  description: 'Browse practical programming books.',
};
```

Nested layouts can provide shared defaults and pages can override them. Use `generateMetadata` when values depend on route params or fetched data. Metadata belongs in supported server route files, not Client Components.

Metadata is not a replacement for useful content, semantic headings, correct HTTP responses, and clear information architecture. Decide which routes should be indexed. Private dashboards may need `noindex`, but a robots directive does not protect private data. Open Graph/social preview images must be reachable by crawlers in production and have suitable dimensions.

**Practice:** Give a book detail route a title, description, canonical URL strategy, and social image. Define behavior for missing slugs.
