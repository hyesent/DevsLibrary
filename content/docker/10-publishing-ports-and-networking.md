# Publishing Ports and Understanding Networking

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of publishing ports and understanding networking in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Containers have network interfaces and addresses inside Docker-managed networks. `-p HOST_PORT:CONTAINER_PORT` publishes a container port through the host, while `EXPOSE` in a Dockerfile is metadata. User-defined bridge networks provide service-name DNS for attached containers, allowing one service to reach another by container or service name. Binding to all host interfaces can expose a service beyond the local machine.

## Worked example
```bash
docker network create app-net
docker run -d --name web --network app-net nginx:alpine
docker network inspect app-net
docker rm -f web
docker network rm app-net
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Bridge networks provide a private network segment on a single Docker host. Containers attached to the same user-defined bridge can usually resolve one another by name; default bridge behavior is less convenient for automatic name-based discovery. Publishing a port creates a path from host interfaces to a container port, subject to host and platform networking rules. Keep internal services un-published when only peer containers need them. For multi-host communication, Docker bridge networking alone is not a cluster networking solution.

## Common mistakes and safety notes
Inside a container, `localhost` refers to that same container, not another container and not automatically the host. Avoid publishing databases to every host interface when only another service needs access. Host networking behaves differently and is platform-dependent. Firewall and cloud rules may add further exposure.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Create a user-defined network and attach two containers. Test name-based communication. Then publish a web port only on loopback and explain who can reach it.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
