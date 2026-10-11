# Fetching Data on the Server

Server Components can use async functions and `await` directly. They can query a database through server-only modules without creating an internal HTTP endpoint solely for their own use. This can remove an unnecessary network hop.

```tsx
async function getBooks() {
  const response = await fetch('https://example.invalid/api/books');
  if (!response.ok) throw new Error('Could not load books');
  return response.json();
}
```

The domain above is a placeholder, not a live API. Real code needs appropriate timeouts, error handling, schema validation, and dependency policy. A TypeScript assertion does not validate external JSON at runtime. Use parameterized database queries or safe ORM APIs; never concatenate untrusted SQL input.

Independent operations can often run concurrently with `Promise.all`; sequential awaits create waterfalls if the second request does not depend on the first. Cache policy must reflect freshness and user privacy. Never allow shared cached output to contain one user's private data for another user.

**Practice:** Fetch a public catalogue and a user's private bookmarks; explain which results can safely be shared.
