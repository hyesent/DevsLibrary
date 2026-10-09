# Deploying Containers and Handling Updates

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of deploying containers and handling updates in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
A production deployment needs more than a working `docker run` command. Define how configuration and secrets are injected, where persistent state lives, which ports are exposed, how health is checked, how logs are collected, and how restarts and rollbacks work. Single-host Docker can serve real workloads, but multi-node scheduling, service discovery, and high availability may require a platform designed for those responsibilities.

## Worked example
```bash
docker run -d --name app \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --memory=512m --cpus=1 \
  registry.example.com/team/app:1.4.0
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
A deployment runbook should state the exact image reference, configuration source, health check, expected startup time, rollback artifact, and data compatibility constraints. Rolling back application code may not reverse a database migration; use expand-and-contract schema changes when old and new versions must overlap. A restart policy handles process exit, but a deployment system still needs alerting and an operator response. For a single host, ensure the reverse proxy, host firewall, disk monitoring, and backup schedule are part of the design.

## Common mistakes and safety notes
This is a single-host illustration and assumes a reverse proxy or local caller can reach loopback. Restart policies do not replace monitoring or fix application bugs. Avoid replacing a live container without a rollback plan, compatible schema changes, and an understanding of how traffic drains.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
Write a deployment runbook covering preflight checks, image digest, configuration, health verification, rollback, and post-deployment observation. Test the runbook on a non-production service.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
