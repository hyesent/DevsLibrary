# Writing a First Dockerfile

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of writing a first dockerfile in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
A Dockerfile is a build recipe. `FROM` selects a base image, `WORKDIR` establishes a working directory, `COPY` adds files from the build context, `RUN` executes build-time commands, and `CMD` supplies a default command at runtime. A Dockerfile should express how to produce the application artifact, not manually configure a long-lived server after it starts.

## Worked example
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t example-app:dev .
docker run --rm example-app:dev
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
The build context is the input boundary for `COPY` and `ADD`; it is commonly the final argument to `docker build`. `WORKDIR` affects subsequent relative paths. `RUN` executes while building a layer, whereas `CMD` and `ENTRYPOINT` define runtime behavior. `COPY` is usually easier to reason about than `ADD`; reserve `ADD` for its specific archive-extraction or supported remote-source behavior. Keep each instruction purposeful and make the default process foregrounded.

## Common mistakes and safety notes
The example assumes a Node project with a lockfile and a `start` script. `EXPOSE` documents a container port; it does not publish that port on the host. Prefer JSON/exec form for `CMD` and `ENTRYPOINT` so the application receives signals correctly. The build context is the directory sent to the builder, not necessarily the Dockerfile’s directory.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Create a Dockerfile for a tiny application in a dedicated directory. Build it, run it, then deliberately introduce a missing file and read the build error rather than guessing.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
