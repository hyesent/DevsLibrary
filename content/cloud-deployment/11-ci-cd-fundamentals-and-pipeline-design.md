# CI/CD Fundamentals and Pipeline Design

## Learning goals
Design a pipeline that tests, builds and deploys software without granting untrusted code unnecessary production access.

## Continuous integration
CI automatically runs checks when code changes. Typical stages include formatting/linting, unit tests, type checks, dependency and secret scanning, integration tests, building an artifact and publishing test results. The checks should be fast enough to run frequently, deterministic enough to trust, and meaningful enough to catch real defects.

Continuous delivery keeps a release deployable and ready for a controlled production release. Continuous deployment automatically releases changes that pass defined gates. The right choice depends on risk, compliance, business process and confidence in tests; neither term guarantees quality by itself.

## Pipeline as code
Keep pipeline definitions reviewed and versioned. Protect changes to deployment workflows because they can gain access to credentials and release systems. Avoid running untrusted pull-request code with production secrets or privileged self-hosted runners. Prefer short-lived workload identity or OIDC federation where supported instead of static cloud keys stored forever in CI settings.

## Stages and gates
A practical pipeline may run:
1. Static checks and unit tests.
2. Dependency and secret scanning.
3. Build an immutable artifact.
4. Test the artifact in an isolated environment.
5. Run integration and smoke tests.
6. Deploy to staging and verify health.
7. Obtain an approval or automated policy decision when required.
8. Deploy to production with a rollout and rollback strategy.

Not every repository needs eight separate jobs. Keep stages proportional to risk, but make artifact identity and release decisions traceable.

## Secrets and permissions
Use separate identities for build, staging and production. A build step generally should not need permission to delete production databases. Restrict what a workflow can access, require review for protected branches and environments, and log deployment actions without logging credentials.

## Failure handling
A red pipeline should identify the failing stage and preserve enough diagnostics to reproduce the issue. Avoid automatically retrying every failure: retrying a flaky network request may help, while retrying a deterministic test failure only wastes time. Distinguish infrastructure failure from a product regression.

## Practice
Draw a pipeline for a containerized API. Mark which stages execute code from a pull request, where artifacts are stored, which identity can deploy production, and how the exact tested image is promoted. Try to find a path where an external contributor could read production credentials; remove that path.
