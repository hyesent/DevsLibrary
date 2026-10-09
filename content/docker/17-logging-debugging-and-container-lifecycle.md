# Logging, Debugging, and Container Lifecycle

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of logging, debugging, and container lifecycle in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Containers work best when the main application writes operational logs to stdout and stderr, which Docker can collect through its logging driver. Debugging begins with state, exit code, logs, configuration, mounts, network, and resource signals. Ephemeral debug containers can help inspect a network or filesystem, but production debugging should not depend on installing tools into a running immutable image.

## Worked example
```bash
docker ps -a
docker logs --tail=200 --timestamps app
docker inspect app
docker stats
docker events --since 10m
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A useful debugging sequence starts with `docker ps -a`, then exit state and logs, then `inspect`, and only then changes to mounts, network, or resource settings. Preserve the failing container long enough to collect evidence. Standard output and error are the simplest common log interface, but the selected logging driver controls storage and retrieval. Establish retention and redaction rules: credentials in logs can turn a routine incident into a security incident. Correlate logs with request IDs and timestamps when the application supports it.

## Common mistakes and safety notes
Logs can contain credentials or personal data, so redact sensitive values and define retention. Logging-driver behavior differs; some drivers do not make logs available through `docker logs` in the same way. Avoid `docker system prune` as a first debugging step because it can remove useful stopped containers, unused images, networks, or build cache.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Given a container that exits immediately, use only the commands above to form a diagnosis. Write a short incident note with evidence, likely cause, and the next least-destructive check.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
