# Installing Docker and Choosing an Environment

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of installing docker and choosing an environment in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Docker’s installation path depends on the operating system. On Windows and macOS, Docker Desktop commonly provides the engine environment and integration; on Linux, Docker Engine may run as a system service. WSL 2 integration is common for Windows development. Installation, daemon availability, permissions, CPU architecture, and virtualization support are separate concerns. Verify the engine instead of assuming that a successful installer means containers can run.

## Worked example
```bash
docker version
docker info
docker context ls
docker run --rm hello-world
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Treat installation as three checks: client availability, engine reachability, and permission to use the engine. On Linux, inspect the service status using the init system for that distribution; on Docker Desktop, confirm the desktop engine is running and that the expected integration is enabled. If the client reports a server connection error, investigate the selected context and daemon before reinstalling. Record the engine version and architecture in bug reports because behavior can vary across operating systems and versions.

## Common mistakes and safety notes
`docker version` can show a client even when the server/daemon is unavailable. On Linux, adding a user to the `docker` group effectively grants powerful root-equivalent control over the host; it is not a harmless convenience. Avoid mixing instructions for Docker Desktop, rootless Engine, and a conventional rootful Engine without understanding the differences.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Install using the official instructions for your OS. Record the client and server versions, active context, and whether the smoke test succeeds. If it fails, classify the error as installation, daemon, permissions, networking, or architecture.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
