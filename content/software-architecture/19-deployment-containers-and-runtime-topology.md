# 19. Deployment, Containers, and Runtime Topology

Runtime topology describes where components execute and how they communicate: processes, containers, virtual machines, managed services, regions, networks, and storage. Deployment architecture should reflect reliability, security, performance, and the team's operational capability.

## Separate build from runtime

A build artifact should be reproducible and promoted through environments rather than rebuilt unpredictably for each environment. Configuration and secrets should be supplied securely at runtime or through a controlled deployment mechanism. Avoid embedding environment-specific credentials in container images.

## Containers

Containers package an application with its runtime dependencies while sharing the host kernel. They can improve consistency between environments, but they are not a complete security boundary and do not remove the need for resource limits, patching, image provenance, and runtime permissions.

A container should have a clear process lifecycle, health behavior, and shutdown strategy. Applications need to stop accepting new work and finish or safely abandon in-flight work when the platform terminates an instance.

## Configuration and secrets

Separate non-secret configuration from credentials. Validate required configuration at startup and fail with actionable, non-sensitive errors when essential settings are missing. Rotate secrets without requiring source-code changes. Ensure logs do not print configuration dumps containing secrets.

## Stateless and stateful components

Application instances are often replaceable; databases, persistent queues, and object stores require durability, backup, and recovery plans. Persisting important data only in a container's writable layer is unsafe when the platform may replace that container.

## Deployment strategies

Rolling deployment replaces instances gradually. Blue-green deployment switches traffic between environments. Canary deployment exposes a change to a limited portion of traffic before broader rollout. Each strategy needs health checks, compatibility between versions, metrics, and a rollback or roll-forward plan.

Database changes are especially important during rolling deployments because old and new application versions may run simultaneously. Use compatible migrations where required.

## Practice

Design a deployment topology for a modest web API with a relational database, background worker, and object storage. Identify what is replaceable, what needs persistent storage, how secrets are supplied, and how a deployment is rolled back safely.

**Key idea:** deployment is part of architecture; package, configure, scale, and recover each component according to its state and failure characteristics.
