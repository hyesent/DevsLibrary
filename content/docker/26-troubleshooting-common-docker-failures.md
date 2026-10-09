# Troubleshooting Common Docker Failures

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of troubleshooting common docker failures in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Troubleshooting is most effective when it narrows one layer at a time: CLI-to-daemon connection, image resolution, build, process startup, configuration, storage, network, and application dependency. Capture the exact error, exit code, relevant logs, and current configuration before changing multiple things. Repeatedly deleting resources can erase evidence and make the original cause harder to identify.

## Worked example
```bash
docker context show
docker ps -a
docker logs --tail=200 app
docker inspect app
docker network ls
docker volume ls
docker events --since 15m
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Different errors point to different layers: image pull errors suggest registry, credentials, tag, or architecture; an exited container suggests process startup or configuration; connection errors suggest listening address, port mapping, firewall, or network; permission errors often involve UID/GID and mounts. Capture the exact error and inspect the current state before changing settings. Avoid `prune` commands until you know what resources are safe to remove. A good incident note includes a hypothesis, evidence, test, result, and next action.

## Common mistakes and safety notes
“Connection refused” can mean different things depending on where the connection originates. DNS success does not prove the target service is ready; a published port does not prove the application is listening on the expected interface. Permission errors may come from host bind mounts or a process running as a different UID.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Investigate four deliberate failures: invalid image tag, wrong container port, missing required environment variable, and unwritable bind mount. For each, record evidence and the smallest safe fix.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
