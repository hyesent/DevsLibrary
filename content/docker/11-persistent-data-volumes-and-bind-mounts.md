# Persistent Data: Writable Layers, Volumes, and Bind Mounts

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of persistent data: writable layers, volumes, and bind mounts in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
A container’s writable layer is disposable application state, not a durable database plan. Named volumes are managed by Docker and are generally suitable for persistent data that containers need to retain. Bind mounts map a specific host path into a container and are useful for development source files or controlled host integration. Mount type, ownership, permissions, and platform path behavior matter.

## Worked example
```bash
docker volume create app-data
docker run --rm -v app-data:/data alpine sh -c 'echo saved > /data/example.txt'
docker run --rm -v app-data:/data alpine cat /data/example.txt
docker volume inspect app-data
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Volumes decouple data lifecycle from the container lifecycle. A named volume is managed by Docker and can be attached to a replacement container; a bind mount points at a host path and exposes host filesystem semantics. Mounts can mask files already present at the target path, which sometimes makes a correctly built image appear to be missing files. Databases may also need correct UID/GID permissions. Always test persistence through recreation and test backups by restoring to a separate destination.

## Common mistakes and safety notes
Deleting a container normally does not delete a separately managed named volume, but `docker volume rm` and especially prune commands can delete data. Bind mounts can let a container modify host files. A volume is not automatically a backup; it can still be corrupted, deleted, or stored on a failed disk.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Write a file to a named volume, remove the first container, and read the file from a second container. Design a backup-and-restore test for that volume.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
