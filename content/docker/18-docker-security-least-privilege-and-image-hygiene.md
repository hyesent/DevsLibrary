# Docker Security: Least Privilege and Image Hygiene

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of docker security: least privilege and image hygiene in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Container security is layered. Start from a maintained image, run as a non-root user when possible, minimize packages and capabilities, avoid privileged mode, keep secrets out of images, and restrict network and filesystem access. The daemon and its socket are highly privileged interfaces. Image scanning can identify known vulnerable packages, but a clean scan does not prove an image is safe.

## Worked example
```dockerfile
FROM node:22-bookworm-slim
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
USER node
CMD ["node", "server.js"]
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
The Docker daemon socket grants powerful control because callers can ask the daemon to create containers with host mounts and privileges. Protecting the socket is therefore critical. Dropping Linux capabilities, using read-only root filesystems where compatible, limiting writable mounts, avoiding host PID/network namespaces, and setting `no-new-privileges` can reduce exposure. These controls require testing; an application may need a specific capability or writable path. Document every exception and avoid broad privileges as a shortcut.

## Common mistakes and safety notes
The example assumes a Node project and that the base image’s `node` user exists. Running as non-root may require changing writable paths. Do not mount `/var/run/docker.sock` into an untrusted container. Avoid `--privileged` unless a narrowly justified system-level use case requires it.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Inspect a sample image for its user, packages, exposed ports, and writable paths. Remove unnecessary privileges and verify the app still starts and can write only where intended.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
