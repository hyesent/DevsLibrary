# TypeScript in Vite Projects

## Fast transpilation is not full type checking
Vite can transform TypeScript syntax for the browser, but the normal development transform does not necessarily perform full TypeScript type checking. A program may compile into JavaScript while still containing type errors.

Run a separate type-checking command, commonly based on `tsc --noEmit`, using the project's actual TypeScript configuration. Some templates provide a combined build script; inspect the scripts instead of assuming.

## Types disappear at runtime
TypeScript annotations and interfaces are erased. This means runtime data from forms, APIs, storage, or URL parameters still needs validation. A type assertion such as `response.json() as Book` tells the compiler to trust you; it does not prove that the response matches `Book`.

## Path aliases
If using aliases such as `@/components/Button`, configure TypeScript and the bundler consistently. Verify editor navigation, tests, and production builds. Tooling support for reading `tsconfig` paths varies by plugin and version.

## Strictness and maintainability
Strict compiler options catch many classes of mistakes, especially nullability and unchecked assumptions. Introduce stricter settings thoughtfully, and fix real errors rather than scattering `any` or non-null assertions everywhere.

## Practice
Create a typed API response and demonstrate that an invalid JSON response still needs runtime validation. Add type checking to the project's CI workflow.
