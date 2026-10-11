# Server-Side Rendering and Vite Boundaries

## Vite is not automatically an SSR framework
Vite can support server-side rendering through APIs and integrations, but a basic Vite SPA does not automatically provide production SSR, route data loading, or server functions. Frameworks built on Vite may supply these capabilities and their own conventions.

## SSR changes the environment
Code may execute on both server and browser. Browser globals such as `window` and `document` do not exist in a normal Node.js rendering environment. Avoid accessing them at module initialization when that module is imported by the server.

## Hydration
The server's initial markup and the browser's initial render must agree. Unstable random IDs, current time, locale differences, and browser-only data can cause hydration mismatches. Make initial output deterministic and move client-only behavior to an appropriate lifecycle or framework mechanism.

## Request-specific data
Server-rendered responses can contain user-specific information. Cache them carefully and do not place personalized HTML in a shared public cache. Authentication, headers, cookies, and request context must follow the chosen SSR framework's documented API.

## Deployment requirements
SSR requires a compatible server runtime or hosting adapter. Static hosting alone cannot execute arbitrary server rendering for each request. Check adapter compatibility, environment variables, streaming support, and runtime constraints.

## Practice
Take a component that reads `window.innerWidth` at module scope. Refactor it so it can safely participate in server rendering and explain the initial-render behavior.
