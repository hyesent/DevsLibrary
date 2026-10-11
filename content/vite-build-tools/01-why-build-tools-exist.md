# Why Build Tools Exist

## Learning goals
- Explain what a frontend build tool does.
- Separate development-server work from production-build work.
- Choose tools based on project needs rather than popularity.

A browser can load HTML, CSS, and JavaScript directly, but modern applications often use TypeScript, JSX, CSS preprocessors, imported images, package dependencies, and code that must be split into efficient files. Build tools connect these source files into something the browser and deployment environment can use.

A modern toolchain may include a development server, module resolver, transformer, bundler, minifier, asset pipeline, test runner, linter, type checker, and deployment step. These are related but not identical jobs. Vite is primarily a development server and build tool; it does not replace every quality tool in a project.

## Development versus production
During development, the priorities are fast startup, rapid feedback, source maps, and reliable hot updates. Production output prioritizes browser compatibility, caching, file size, loading strategy, and predictable deployment artifacts. A development server is not the production server and should not be exposed as one.

## Build pipeline
A simplified pipeline is:

1. Resolve source imports and package dependencies.
2. Transform syntax and source formats as configured.
3. Analyze the module graph.
4. Split output into chunks where appropriate.
5. Optimize and emit assets.
6. Test and deploy the generated output.

Not every project performs each step with a separate tool, and plugin behavior can alter the pipeline.

## Choose the smallest useful stack
For a static page, a full framework may be unnecessary. For a component-heavy application, Vite with React or Vue may fit. A framework such as Next.js adds routing and server-rendering conventions that a generic Vite app does not automatically provide.

## Practice
Draw the path from a TypeScript component and imported CSS to the browser. Label which steps happen in development and which happen during a production build.
