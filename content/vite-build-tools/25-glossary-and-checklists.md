# Glossary and Practical Checklists

## Glossary
- **Bundler:** Tool that analyzes modules and emits optimized output.
- **Build artifact:** Output produced by a build process.
- **Dependency graph:** Network of modules connected by imports.
- **Dev server:** Server used during local development.
- **HMR:** Hot Module Replacement, which updates modules during development.
- **Tree shaking:** Removal of unused exports when the tool can prove they are unnecessary.
- **Code splitting:** Dividing output into separately loadable chunks.
- **Source map:** Mapping from generated code back to source code.
- **Plugin:** Extension that modifies or augments tool behavior.
- **SSR:** Server-side rendering.
- **Hydration:** Attaching client-side framework behavior to server-rendered HTML.
- **Lockfile:** Record of resolved package versions and dependency relationships.
- **Base path:** URL prefix under which an app or its assets are served.
- **Supply chain:** Dependencies, build tools, credentials, and systems involved in producing software.
- **Reproducible build:** A build process designed to produce predictable artifacts from known inputs.

## Before development
- [ ] Supported Node.js version is documented.
- [ ] Package manager and lockfile are consistent.
- [ ] Required environment variables are documented.
- [ ] Dev server exposure is limited to intended networks.

## Before release
- [ ] Clean install succeeds.
- [ ] Type checks, tests, and quality checks pass.
- [ ] Production build succeeds.
- [ ] Generated asset paths work on the target host.
- [ ] Client output contains no secrets.
- [ ] Accessibility and responsive behavior are reviewed.
- [ ] Error monitoring and rollback plans exist.

## Before upgrading
- [ ] Release and migration notes are reviewed.
- [ ] Plugins are compatible.
- [ ] Build and test results are recorded.
- [ ] Deployment preview is checked.
- [ ] A rollback path is available.

## Further reading
Start with the official Vite documentation at https://vite.dev/ and the documentation for the framework and plugins used by your project. Configuration details and supported versions change, so verify guidance against the installed release.
