# The Docker CLI, Daemon, Contexts, and Registries

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of the docker cli, daemon, contexts, and registries in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
The Docker CLI sends requests to a Docker Engine API endpoint. The endpoint is selected by the active context or explicit options/environment. A context can point to a local engine or a remote one, so a command that removes containers may affect a different machine than expected. Registries store and distribute images; Docker Hub is one registry, not the same thing as Docker Engine.

## Worked example
```bash
docker context ls
docker context show
docker image ls
docker login
docker logout
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A context is a named endpoint configuration, not a security boundary by itself. The active context determines where many CLI commands are sent; explicit context flags can override it. The daemon performs the actual container operations, while registry authentication is a separate client concern. For remote engines, protect transport credentials and restrict API access: exposing an unauthenticated Docker API can grant an attacker control comparable to privileged host access. Verify the destination before running cleanup, prune, or removal commands.

## Common mistakes and safety notes
Check the active context before destructive operations. Never paste registry passwords or access tokens into shell history, Dockerfiles, source control, or build arguments. Use least-privilege, short-lived credentials where available. `docker login` configures client credentials; it does not start a daemon or make a private image public.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Switch only between contexts you recognize. Inspect the current context before running a container. Describe which machine executes a command and which registry provides an image.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
