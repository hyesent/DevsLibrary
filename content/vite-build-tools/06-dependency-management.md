# Dependency Management and Package Metadata

## Dependencies versus devDependencies
Runtime dependencies are needed by the application at runtime or are bundled into its output, depending on the package. Development dependencies are generally used to build, test, lint, or develop the project. The distinction matters for deployment installation strategies, but it does not guarantee that every package in one category is absent from the final bundle.

## Semantic version ranges
Package manifests may specify exact versions, ranges, or tags. A lockfile records the resolved dependency tree so teammates and CI can reproduce installs more reliably. Read release notes before major upgrades and test plugins against the target Vite version.

## Add packages deliberately
Before installing a library, check whether the platform already provides the feature, whether the library is maintained, how large it is, and whether it introduces security or licensing concerns. Avoid installing overlapping packages for simple tasks.

## Reproducible installs
Use the project's established package manager and its frozen/CI install mode where available. A clean CI install should not silently rewrite the lockfile. If the lockfile and manifest disagree, resolve the cause rather than deleting the lockfile as a reflex.

## Supply-chain awareness
Review package provenance, maintainers, transitive dependencies, install scripts, and security advisories for important dependencies. Pinning alone does not make a malicious or vulnerable package safe.

## Practice
Review a package manifest. Mark each dependency as runtime, build-time, test-time, or optional, and explain the effect of removing it.
