# Security and the Build Supply Chain

## Build tools execute code
Plugins and dependencies may run during installation, development, testing, or builds. Treat them as part of your trusted computing base. Review package provenance, maintainers, permissions, install scripts, transitive dependencies, and known advisories.

## Dependency hygiene
Use lockfiles and reproducible CI installs. Update dependencies regularly with tests, but avoid blindly applying major upgrades to production without reading migration notes. Pinning a vulnerable version does not make it safe.

## Protect credentials
CI tokens should have the minimum required permissions and should not be available to untrusted pull-request code. Masking logs is helpful but not a substitute for limiting secret access. Rotate credentials if exposure is suspected.

## Output inspection
Check that source maps, debug files, test fixtures, `.env` files, and internal documents are not published unintentionally. Static frontend output is visible to users; anything included in it must be treated as public.

## Content security
Build tooling does not automatically protect the app from XSS, unsafe redirects, injection, or broken authorization. Apply safe rendering, input validation, server-side access checks, and suitable response headers in the actual application and hosting layer.

## Practice
Create a dependency review checklist and a CI secret policy. Verify that pull requests from untrusted contributors cannot access production deployment credentials.
