# The Module Graph and ES Modules

## Imports form a graph
Each source file is a module, and its imports create edges to other modules. The build tool follows this graph to resolve dependencies, transform source, identify shared code, and generate output chunks.

```ts
import { formatTitle } from './format-title';
import './page.css';

export function renderTitle(value: string) {
  return formatTitle(value);
}
```

The module graph is why a missing import or incorrect file-name casing can break a build even when a file exists somewhere in the repository.

## ESM fundamentals
JavaScript modules use `import` and `export`. Named exports and default exports have different import syntax. Prefer explicit, consistent conventions so refactoring and static analysis remain straightforward.

## Resolution
A specifier such as `./format-title` is a relative import; a package name such as `date-fns` is resolved through package metadata and the package manager's installed dependency tree. TypeScript path aliases may require configuration that both the type checker and runtime/build tool understand. Do not assume an editor alias automatically works in production.

## Circular dependencies
If module A imports B and B imports A, evaluation order can become surprising, especially when one module reads values before initialization. Break cycles by moving shared definitions into a lower-level module or changing the dependency direction.

## Practice
Draw a graph for a page, its components, CSS, and utility modules. Find any circular imports and decide whether they represent a design problem.
