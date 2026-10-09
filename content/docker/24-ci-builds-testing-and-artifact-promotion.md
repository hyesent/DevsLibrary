# CI Builds, Testing, and Artifact Promotion

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of ci builds, testing, and artifact promotion in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
A CI pipeline can lint and test source code, build an image, run container-level tests, scan dependencies, and publish an immutable artifact. Build and test failures should stop promotion. For predictable releases, build once and promote the same image digest across environments rather than building a subtly different image in staging and production. Cache is a performance aid, not a correctness guarantee.

## Worked example
```bash
docker build --pull -t app:ci .
docker run --rm app:ci npm test
# The command above assumes the image contains npm and the project test script.
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A robust CI pipeline should fail fast on source tests, then build an artifact, test the built artifact, perform security and policy checks, and publish only approved output. Promotion should preserve the artifact identity so the tested digest is the digest deployed. For untrusted code, do not expose publishing credentials or privileged Docker access to arbitrary jobs. Use a clear retention strategy for build artifacts and logs, and document how a failed release can be traced back to source revision, dependencies, and build inputs.

## Common mistakes and safety notes
The exact CI syntax differs across providers. Tests inside the runtime image may be inappropriate if production images intentionally omit test tooling; use a test stage or separate test image when needed. Pin third-party actions and protect registry credentials. Treat cache content and untrusted pull-request builds carefully.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Design a pipeline with separate steps for unit tests, image build, smoke test, scan, and publish. Define which failures block release and how the deployed digest is recorded for rollback.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
