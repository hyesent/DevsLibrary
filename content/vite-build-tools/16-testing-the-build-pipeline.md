# Testing the Build Pipeline

## Test source and artifacts
Unit tests validate logic; component tests validate UI behavior; end-to-end tests validate user journeys. Build verification validates that the source can be transformed and emitted. They complement rather than replace one another.

## CI stages
A practical pipeline may include:
1. Install from the lockfile.
2. Run formatting and lint checks.
3. Run type checking.
4. Run unit and component tests.
5. Build production assets.
6. Run end-to-end or smoke tests against the built output.
7. Publish only if required checks pass.

Adapt the sequence to your project. Avoid assuming a template has all these scripts already configured.

## Environment parity
Tests can pass locally while CI fails because of OS-specific path casing, missing environment variables, undeclared dependencies, or a different Node.js version. Keep the supported environment explicit and use clean CI installs.

## Snapshot and visual tests
Snapshots can be useful but are brittle when they capture incidental markup. Prefer assertions about user-visible outcomes. Visual regression tools need stable fonts, viewport sizes, data, and rendering conditions.

## Failure diagnosis
Keep logs for the failing command and avoid swallowing non-zero exit codes. A pipeline that always succeeds because errors are ignored is worse than no pipeline because it creates false confidence.

## Practice
Set up a minimal CI workflow that installs dependencies, runs the project's real validation scripts, builds the app, and fails on any unsuccessful stage.
