# Orchestration Boundaries: When Docker Is Not the Whole Platform

## Learning objectives
By the end of this lesson, you should be able to:
- Explain the core idea of orchestration boundaries: when docker is not the whole platform in your own words.
- Apply the commands or configuration shown here and interpret their output.
- Identify the main failure modes and choose a safe diagnostic step.

## Mental model
Docker Engine runs containers on a host; it does not, by itself, provide every capability needed to operate a resilient fleet across machines. Orchestration platforms add scheduling, desired-state reconciliation, rollout controls, service discovery, and cluster-level operations. The correct choice depends on scale, failure tolerance, team skills, and operational cost. Compose remains useful for local and some single-host workflows.

## Worked example
```bash
docker compose up -d
docker compose ps
docker compose down
```

## Reasoning through the details
A useful Docker workflow makes state and boundaries explicit. Ask four questions before changing anything: **what object am I changing, where does its data live, which process is responsible, and what evidence will confirm the result?** This avoids treating containers, images, networks, volumes, and registry artifacts as interchangeable. It also makes commands safer: inspect first, make one controlled change, then verify the outcome.

When adapting an example, check the assumptions that are specific to your application: runtime version, package manager and lockfile, output directory, listening interface, required environment variables, file ownership, and whether the process is expected to stay in the foreground. Commands are illustrative and may require a project-specific image name, service name, or port. Do not copy example credentials into a real environment.

## Technical depth
Choose orchestration from requirements rather than fashion. Ask whether workloads must be scheduled across hosts, survive host failure, scale horizontally, roll out gradually, discover peers, enforce network policy, and integrate with managed identity and secrets. A cluster platform can provide these primitives but adds operational overhead, upgrades, permissions, and failure modes of its own. Statefulness remains a separate design problem: orchestration does not automatically make a database replicated, backed up, or safe to upgrade.

## Common mistakes and safety notes
Do not adopt Kubernetes solely because it is popular, nor assume a single Docker host is highly available. Containers do not remove the need for database replication, backups, secrets management, network policy, observability, or incident response. Platform complexity itself is an operational risk.

A reliable operator prefers the smallest reversible change that tests a hypothesis. Before deleting resources, identify whether they contain state or diagnostic evidence. Before publishing a port or image, identify the intended audience. Before shipping an image, verify what files, users, packages, and configuration it contains.

## Hands-on checkpoint
For a small internal app, a customer-facing multi-instance service, and a stateful database, list the requirements that determine whether a single host, managed container service, or cluster orchestrator is appropriate.

## Review questions
1. What is the main concept in this lesson, and which Docker object or boundary does it concern?
2. What evidence would demonstrate that the example worked as intended?
3. What is one realistic failure mode, and how would you diagnose it without immediately deleting resources?
4. Which part of the example would need to change before using it in a real project?

## Further practice
Repeat the exercise from a clean state and write down the exact commands and expected observations. Then change one assumption—such as the image version, port, mount path, or environment variable—and predict the result before running it. Compare your prediction with the observed behavior.
