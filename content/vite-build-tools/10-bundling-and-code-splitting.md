# Bundling and Code Splitting

## Why bundle
A bundler analyzes the dependency graph and emits browser-loadable output. It can combine modules, optimize imports, and create chunks. Bundling choices affect caching, network requests, execution time, and the amount of code needed for the initial view.

## Dynamic imports
Dynamic imports can defer code until it is needed:

```ts
async function openEditor() {
  const { createEditor } = await import('./editor');
  return createEditor();
}
```

This creates a potential split point, but the final chunking depends on the build tool and optimization rules. In a UI framework, use its recommended lazy-loading mechanism when one exists.

## Shared dependencies
Several routes may use the same library. The build tool may place shared code in a separate chunk, but chunk placement is an optimization decision rather than a stable public API. Avoid writing code that depends on generated chunk filenames.

## Chunk trade-offs
Many tiny chunks can increase request overhead; a giant chunk delays first interaction and wastes bandwidth on routes that do not need it. Measure real usage before changing manual chunk settings.

## Tree shaking
ES module structure allows bundlers to remove unused exports in many cases. Side effects, CommonJS modules, dynamic access, and package metadata can limit the optimization. Marking a package as side-effect-free incorrectly can break required CSS or initialization.

## Practice
Use a large optional editor or chart library as a lazy-loaded feature. Compare initial bundle size and the user experience before and after.
