# Deployment Artifacts and Reproducible Releases

## Learning goals
Produce an artifact that can be identified, tested and promoted with confidence.

## What counts as an artifact?
An artifact might be a compiled binary, a static-site bundle, a container image, a package or a versioned function deployment. It should be traceable to a source revision and build process. Record the version, source commit, dependency lockfiles, build toolchain and relevant build metadata.

A reproducible build means that the same controlled inputs can produce the same or verifiably equivalent output. In practice, timestamps, nondeterministic build steps and mutable dependencies can interfere. Pin versions where practical, use lockfiles, verify downloaded dependencies and avoid unreviewed scripts that fetch “latest” during production builds.

## Tags versus immutable identity
Human-readable tags such as `v1.4.2` are useful, but a registry tag may be moved unless the registry enforces immutability. A content digest identifies the exact image content. For high-assurance deployment, record and deploy the digest rather than trusting a mutable tag alone. Ensure the artifact you tested is the artifact you release.

## Release metadata
Useful metadata includes source commit, build ID, build time, dependency inventory, test results and artifact digest. Avoid including credentials or sensitive environment data. Signed artifacts and provenance attestations can help verify origin and build claims, but their value depends on key management and policy enforcement.

## Promotion
A healthy pipeline builds an artifact, runs checks, publishes it to a controlled registry or artifact store, deploys it to a test environment, and promotes the same artifact after approval or automated gates. Production should not require an ad hoc rebuild on a developer’s laptop.

## Rollback readiness
A previous application artifact is only one part of rollback. Configuration may have changed, database schema may no longer be compatible, and queued messages may use a new format. Design migrations and contracts so old and new application versions can coexist during rollout when possible.

## Practice
Define a release record for an imaginary API: source commit, image digest, dependency lockfile, test summary, migration version and deployment timestamp. Explain how an operator can answer “what exactly is running in production?” without relying on a mutable tag or someone’s memory.
