# Loading, Error, Not-Found, and Streaming UI

A robust route distinguishes pending work, missing resources, expected validation errors, and unexpected failures. `loading.tsx` provides segment loading UI; `error.tsx` provides an error boundary; `not-found.tsx` and `notFound()` handle missing resources.

```tsx
'use client';
export default function Error({ reset }: { error: Error & {digest?: string}; reset: () => void }) {
  return <section role="alert"><h2>Something went wrong.</h2><button onClick={reset}>Try again</button></section>;
}
```

A reset retries rendering; it does not guarantee that a failed database or external service has recovered. Never expose stack traces, secrets, or database details to users. Log useful diagnostics with redaction.

Suspense and streaming let ready regions appear while slower work continues. Boundaries should correspond to meaningful tasks; too few can block the whole page, too many can make the interface noisy. Design fallbacks that preserve layout and do not imply a transaction succeeded. Do not catch every exception and return an empty list, because this hides defects.

**Practice:** Define loading, empty, not-found, and failure states for a book detail page.
