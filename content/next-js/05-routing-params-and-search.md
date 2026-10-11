# Routing, Dynamic Segments, and URL Parameters

A folder named `[slug]` defines a dynamic segment, such as `app/books/[slug]/page.tsx` for `/books/nextjs`. Current App Router versions make route params asynchronous in many APIs, so follow documentation matching the installed version:

```tsx
type Props = { params: Promise<{ slug: string }> };
export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  return <h1>Book: {slug}</h1>;
}
```

Older tutorials may show synchronous params. Catch-all `[...slug]` captures one or more segments; `[[...slug]]` also allows no segment. Use them only when that URL behavior is intended.

Query strings such as `/books?topic=web&page=2` represent optional view/filter state, not path identity. Parse and validate all URL input. `searchParams` APIs are version-sensitive too. `generateStaticParams` can supply known public paths for prerendering, but it is not authorization and does not remove the need to handle missing records.

**Practice:** Decide which values belong in the path versus query string for categories, book details, filtered results, and private reading lists.
