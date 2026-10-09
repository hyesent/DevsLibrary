# Choosing Base Images and Reproducible Builds

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of choosing base images and reproducible builds in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Base-image choice affects compatibility, size, security updates, native libraries, and debugging tools. Minimal images reduce attack surface but may omit shells or diagnostic utilities. Alpine uses musl rather than glibc, which can affect native binaries and packages. Reproducibility requires control over the base image, dependencies, build inputs, and toolchain—not merely writing a Dockerfile.

## Worked example
```dockerfile
# Illustrative version pin; choose a currently supported version for your project.
FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Base images are part of the software supply chain and need an owner and update cadence. A language image may bundle a compiler, package manager, and debugging utilities that are unnecessary in production. Distroless or minimal images can reduce components but make interactive debugging less convenient. Choose based on compatibility, support lifecycle, security update availability, native dependencies, and operational needs. Pinning content improves repeatability, while scheduled rebuilds ensure updated base-image fixes are actually incorporated.

## Common mistakes and safety notes
Do not choose an image only because it is the smallest. Confirm upstream support and architecture compatibility. A pinned tag can still be updated by its publisher; a digest is more exact but also requires an update policy so security fixes are not missed. Reproducible does not mean “never update.”

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Compare a slim Debian-based image and an Alpine-based image for the same application. Measure size and test runtime behavior. Write down the reason for the final base-image choice.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
