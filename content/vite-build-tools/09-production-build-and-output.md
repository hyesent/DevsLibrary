# Production Builds and Output Inspection

## Build for deployment
A typical script runs `vite build`, producing optimized files in `dist/` by default unless configured otherwise. The output may include HTML, JavaScript chunks, CSS, images, and other assets. It is not necessarily a standalone server application.

## Inspect the result
Check that:
- The expected entry HTML exists.
- Referenced assets exist and use correct paths.
- No secrets or private source files were accidentally copied.
- Source maps follow the project's disclosure policy.
- The output works at the intended base path.
- Console errors and failed network requests are absent.

## Preview the build
`vite preview` is useful for local inspection of the production build. It is not a replacement for testing on the actual hosting platform, CDN, reverse proxy, or server.

## Static versus server hosting
A normal Vite SPA can often be hosted as static files, but client-side routes need host fallback behavior so a deep URL serves the app entry document when appropriate. APIs, SSR, or server functions require additional infrastructure or a framework that supplies those capabilities.

## Build failures
Treat warnings about missing imports, unsupported syntax, large chunks, or asset resolution as information to investigate. A successful exit code does not guarantee correct user journeys, access control, or performance.

## Practice
Build a project, inspect `dist/`, preview it, and test a nested client-side route by entering its URL directly in the address bar.
