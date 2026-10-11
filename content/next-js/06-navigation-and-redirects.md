# Navigation, Links, and Redirects

Use `next/link` for internal navigation. It supports client-side navigation and framework prefetch behavior:

```tsx
import Link from 'next/link';
export function BookLink({ slug, title }: {slug: string; title: string}) {
  return <Link href={`/books/${encodeURIComponent(slug)}`}>{title}</Link>;
}
```

Encoding one path segment is different from encoding a complete URL. Prefer validated identifiers and URL utilities over concatenating untrusted input. Use navigation hooks in client components for interaction-driven navigation, and server-side `redirect()` where appropriate.

Redirect destinations derived from query parameters or form fields are untrusted. Validate that the target is a relative path on your own app or an explicitly allowed origin; arbitrary external redirects create phishing opportunities. Use links for navigation and buttons for actions so keyboard users and browser history behave naturally.

**Practice:** Build a “return to search” link that preserves safe query state and a post-login redirect that rejects external origins.
