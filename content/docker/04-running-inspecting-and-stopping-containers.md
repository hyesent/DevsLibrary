# Running, Inspecting, and Stopping Containers

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of running, inspecting, and stopping containers in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
`docker run` creates a container from an image and starts it; it is a convenience operation combining create and start. The process configured as the container’s main process determines its lifetime. If that process exits, the container stops. Detached mode returns control to the terminal, while foreground mode attaches output and often forwards signals. Use inspect and logs before guessing at failures.

## Worked example
```bash
docker run -d --name web-test nginx:alpine
docker ps
docker logs web-test
docker inspect web-test
docker stop web-test
docker start web-test
docker rm -f web-test
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Container lifecycle is best understood as a state machine: created, running, paused, restarting, exited, or dead, with exact states depending on engine behavior. `docker inspect` exposes structured configuration and state; `docker logs` reads the captured standard streams when supported by the logging setup. A restart policy can restart a process that exits, but it cannot make a broken application correct. Diagnose the exit code and main process first, then decide whether restart behavior is appropriate.

## Common mistakes and safety notes
A stopped container is not automatically deleted. `docker rm -f` is destructive to that container, and data in its writable layer is lost when it is removed. Avoid using `latest` as a reproducibility strategy; choose and update an intentional version or digest. A container that is “Up” may still be unhealthy or unable to serve useful traffic.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Run a web container, inspect its state and configured command, read its logs, stop it, start it again, and finally remove it. Explain which artifacts survive each action.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
