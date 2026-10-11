# Capstone: Build and Ship a Production-Ready Frontend

## Goal
Build a small book catalogue using Vite and a chosen UI framework. The project should demonstrate a reproducible toolchain, clean assets, tests, safe configuration, and a production deployment.

## Required features
- Catalogue page with search and category filtering.
- Book detail view with a valid URL.
- Responsive styling and accessible keyboard behavior.
- Loading, empty, and error states for data.
- Type checking and automated tests.
- A production build that can be previewed locally.
- Documented environment variables and deployment steps.

## Suggested project structure
```text
src/
  components/
  pages/
  data/
  styles/
  utils/
  main.ts
public/
index.html
vite.config.ts
package.json
```

Adapt this structure to your framework and project size; it is a starting point, not a requirement that every app use these exact folders.

## Acceptance criteria
1. A clean lockfile install succeeds.
2. Type checking, linting, and tests run through documented commands.
3. Production build completes without unresolved imports.
4. Deep links and asset URLs work on the intended host.
5. No secrets are present in client output.
6. The UI works with keyboard and narrow viewport sizes.
7. Performance decisions are supported by measurements.
8. CI fails when a required check fails.

## Stretch goals
Add a shared UI package, bundle analysis, visual regression testing, preview deployments, and a documented upgrade policy.

## Review questions
- Which tasks are performed by Vite, and which by separate tools?
- What differs between dev server and production output?
- How are environment variables exposed?
- What does the hosting platform need to do for deep links?
- How can a dependency upgrade be rolled back safely?
