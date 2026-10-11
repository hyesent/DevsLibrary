# Upgrading Vite and Migrating Toolchains

## Upgrade intentionally
Read the release notes and migration guide for the target version. Check Node.js requirements, plugin compatibility, deprecated configuration, changes to dependency optimization, and build output behavior.

## Small upgrade steps
For a major update:
1. Create a dedicated branch.
2. Update Vite and compatible plugins.
3. Run clean installation.
4. Run type checks, tests, and production build.
5. Test key user journeys and deployment preview.
6. Review output-size and runtime changes.
7. Merge only when failures are understood.

## Avoid cargo-cult fixes
If a migration error suggests a removed option, confirm the replacement in official documentation. Do not add multiple plugins or suppress warnings just to restore a green build. A warning may identify a real future break.

## Rollback
Keep a known-good lockfile and build artifact so a release can be rolled back. Database or server-side changes may not be reversible simply by rolling back frontend assets; plan those changes separately.

## Practice
Upgrade a sample project's minor or major tool version. Document the original version, breaking changes, test evidence, and rollback method.
