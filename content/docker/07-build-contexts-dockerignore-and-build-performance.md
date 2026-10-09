# Build Contexts, .dockerignore, and Build Performance

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of build contexts, .dockerignore, and build performance in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
The build context is the set of files made available to the builder. A broad context can slow builds and accidentally send secrets, caches, local dependencies, or large generated files. `.dockerignore` excludes paths from the context. Build performance also depends on cache reuse: instructions whose inputs have not changed can reuse prior results, while a changed early layer may invalidate later layers.

## Worked example
```dockerignore
.git
node_modules
.env
.env.*
coverage
dist
*.log
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Cache keys depend on an instruction and the inputs relevant to it. If a frequently changing source directory is copied before dependency installation, the cache for installation may be invalidated on every edit. Copy lockfiles first, install dependencies, then copy application source when the project permits it. The ignore file is also a correctness control: excluding a required build artifact breaks the build, while including local credentials risks disclosure. Inspect build output and context size when builds are unexpectedly slow.

## Common mistakes and safety notes
Do not ignore files required for the build. Also do not assume `.dockerignore` is a complete secrets-management system: never put secrets in the context if you can avoid it. Place dependency manifests before frequently changing source files when that allows dependency installation to remain cached.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Build twice and compare timings. Change only application source, then change the dependency lockfile. Observe which build steps rerun and explain why.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
