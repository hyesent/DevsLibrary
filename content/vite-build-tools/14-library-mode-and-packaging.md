# Library Mode and Packaging Reusable Code

## Application versus library
An application produces a runnable site. A library produces modules that other projects consume. Library builds need to consider entry points, output formats, type declarations, CSS distribution, peer dependencies, and semantic versioning.

## Public API
Export only the intended public surface. Internal files can change freely when consumers do not depend on them. Avoid requiring consumers to import deep internal paths unless those paths are documented as stable.

## Peer dependencies
Reusable UI libraries commonly declare the framework as a peer dependency to avoid shipping a second copy. Verify the packaging behavior and test installation in a separate consumer project.

## Type declarations and styles
TypeScript consumers need declarations that match the emitted JavaScript. If the library ships CSS, document how consumers import it and test that it survives bundling. A library that works only inside its own repository is not fully validated.

## Package exports
The package manifest can define entry points for different environments and types. Keep these mappings consistent with emitted files and test the published package tarball, not just the source workspace.

## Practice
Package a small utility library, install it into a clean sample app, and verify JavaScript imports, type checking, and any included CSS.
