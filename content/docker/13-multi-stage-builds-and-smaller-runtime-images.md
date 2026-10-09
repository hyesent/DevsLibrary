# Multi-Stage Builds and Smaller Runtime Images

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of multi-stage builds and smaller runtime images in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Multi-stage builds separate build tools from the runtime image. A named stage can compile code, install development dependencies, or generate static assets; a later stage copies only the required outputs. This reduces shipped tools and often image size, but it does not automatically make an image secure or guarantee that every runtime dependency was copied.

## Worked example
```dockerfile
FROM node:22-alpine AS build
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /src/dist/ /usr/share/nginx/html/
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A multi-stage build has independently named stages. The final stage controls what gets shipped; artifacts move between stages with `COPY --from=...`. This supports a clean separation between compilers, development dependencies, and runtime files. Be careful with dynamic libraries and native modules: copying only a binary may omit shared libraries it needs. Run the final image in a clean environment, ideally with no development bind mounts, to catch hidden dependencies on the builder stage.

## Common mistakes and safety notes
This pattern assumes the project outputs static assets into `dist/`. Server-side applications need their runtime code and production dependencies, not merely build output. Validate file ownership, certificates, native modules, architecture, and runtime libraries. Smaller images still need timely security updates.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Convert a single-stage build to a multi-stage build. Compare sizes and run the resulting container with no source tree mounted. Verify that the application works without build tools.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
