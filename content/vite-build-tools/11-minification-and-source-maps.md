# Minification, Source Maps, and Debugging

## Minification
Minification reduces output size by removing unnecessary syntax and shortening names where safe. It should preserve program behavior, but configuration and dependency bugs can still surface only in production output.

## Source maps
Source maps help map generated code back to source files. They can make production debugging easier, but may expose source code or internal paths depending on how and where they are published. Decide whether to generate them, upload them privately to an error-monitoring service, or publish them.

## Do not debug only the minified file
When a production bug appears, reproduce it using a production build, inspect the browser console and network requests, and use source maps if available. Compare environment variables, base paths, and browser support between development and production.

## Browser compatibility
The build tool's target configuration influences syntax transformation, not necessarily every browser API polyfill. A target that permits modern JavaScript does not automatically provide missing APIs. Use feature detection and add polyfills only when required by the supported browser matrix.

## Reproducible artifacts
Build from a clean checkout with a known lockfile. Record the commit and build metadata for releases. This makes it easier to associate an error report with the exact artifact that produced it.

## Practice
Create a production build, trigger a controlled runtime error, and test the debugging process with and without source maps.
