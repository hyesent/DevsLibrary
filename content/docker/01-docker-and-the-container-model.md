# Docker and the Container Model

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of docker and the container model in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Docker solves the “works on my machine” problem by packaging an application with its user-space runtime and declared dependencies. A container is an isolated process, not a tiny virtual machine: it shares the host kernel while namespaces separate views of processes, networking, mounts, and other resources, and cgroups account for or limit resource use. An image is the immutable, layered template from which a container is created. A container adds a writable layer and runtime configuration to that image.

## Worked example
```bash
docker version
docker info
docker run --rm hello-world
docker ps
docker ps -a
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Docker’s isolation model is implemented by the host kernel. Namespaces isolate views such as process IDs, mount points, network interfaces, and hostnames; cgroups account for and constrain resource consumption. The image filesystem is assembled from layers, while the container’s writable layer captures runtime changes that are not part of the original image. This is why rebuilding an image is repeatable but manually modifying a running container is not a durable deployment workflow. Containers still share the kernel, so kernel vulnerabilities and daemon access remain important security concerns.

## Common mistakes and safety notes
Do not confuse an image with a running container, or assume container isolation is identical to a VM security boundary. A container can exit while its image remains; removing a container does not automatically remove the image or named volumes. Docker CLI, Docker daemon/Engine, registry, image, and container are distinct parts of the system.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Run `hello-world`, inspect its exit status and list images. Explain what is downloaded, what runs, and what remains afterward. Sketch the path from CLI command to daemon to image registry and back.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
