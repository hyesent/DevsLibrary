# Capstone: Containerize and Operate a Library API

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of capstone: containerize and operate a library api in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
The capstone combines the book’s core ideas into a small service with a database. The goal is not merely to get a container to start; it is to produce a repeatable, observable, least-privilege local stack that survives container recreation and can be debugged by someone else. Keep application code, configuration, persistent data, and published artifacts as separate concerns.

## Worked example
Required deliverables:
- A Dockerfile with a sensible base image and non-root runtime where feasible.
- A `.dockerignore` that excludes local secrets, VCS metadata, dependencies, and generated files.
- A Compose file with an application and database, private service networking, a named data volume, and health checks.
- A short README with startup, test, logs, shutdown, backup, and restore instructions.
- A CI outline that tests, builds, scans, and publishes a versioned image.

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
The capstone should be reproducible from a clean checkout and should prove its operational claims. The application should validate configuration, handle transient database unavailability, and log useful errors without secrets. Compose should keep the database on an internal network, use a named volume, and expose only the intended application endpoint. Record image tags and digests, test a container recreation, and restore a backup into a fresh volume. The final README should allow another developer to operate the stack without undocumented knowledge.

## Common mistakes and safety notes
Do not commit `.env` files containing real credentials. Do not expose the database port unless there is a clear need. Do not claim a backup works until it has been restored successfully. Ensure the application handles a temporarily unavailable database and does not rely on container startup order alone.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Run the stack from a clean checkout. Rebuild the app, recreate containers, verify data persistence, deliberately break one setting and debug it, restore a database backup into a fresh volume, and document known limitations.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
