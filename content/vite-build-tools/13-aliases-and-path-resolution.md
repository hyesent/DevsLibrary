# Aliases, Path Resolution, and Monorepos

## Make imports readable
Aliases can replace long relative paths with stable names. Configure them using the current Vite configuration API and align them with TypeScript, tests, IDE tooling, and any server-side runtime.

An alias that works in the editor but fails during build usually indicates inconsistent configuration between tools.

## Monorepo basics
A monorepo may contain multiple applications and shared packages. Decide which package owns each dependency and whether shared source is compiled by the consuming app or built independently. Workspace package managers help link local packages, but do not eliminate module-resolution or dependency-version issues.

## Duplicate dependencies
If a shared package bundles its own copy of React or another singleton-sensitive library, runtime errors can occur. Configure package exports and peer dependencies correctly for reusable UI libraries, and inspect the dependency tree when symptoms suggest duplicate copies.

## Symlinks and file watching
Workspace links can affect how paths are resolved and watched. Test hot reload, build output, and package boundaries in the actual workspace layout instead of only in a standalone demo.

## Practice
Create a small workspace with an app and a shared utility package. Ensure aliases, type checking, tests, and production builds all resolve imports consistently.
