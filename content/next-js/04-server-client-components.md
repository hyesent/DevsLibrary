# Server Components and Client Components

App Router components are Server Components by default. They can render on the server and access server-only resources through appropriate modules. Use Client Components for state, effects, event handlers, and browser APIs:

```tsx
'use client';
import { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(n => n + 1)}>Count: {count}</button>;
}
```

The directive marks a module and its imported dependency graph as client code. It does not mean the component can never participate in initial HTML rendering. Keep the client boundary as low as practical: fetch data in a server-rendered page and pass serializable props to a small interactive control.

Never put secrets in client modules or `NEXT_PUBLIC_` variables. Anything bundled for the browser can be inspected. Server Components are not automatically authorization checks: verify permissions before returning protected data. Do not import database connections or privileged server-only modules into client code.

Common mistakes include calling hooks in a Server Component, reading `window` during server rendering, passing unsupported values across the boundary, and marking a huge subtree as client code unnecessarily.

**Practice:** Design a product page with server-fetched details and an interactive quantity selector.
