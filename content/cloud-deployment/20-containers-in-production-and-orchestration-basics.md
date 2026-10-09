# Containers in Production and Orchestration Basics

## Learning goals
Connect the Docker development workflow to the responsibilities of a production container platform.

## An image is not an operating service
A container image packages the application and dependencies. A production platform must additionally schedule instances, provide configuration and secrets, connect networks, route traffic, replace failed tasks, scale capacity and report health. Docker Compose is useful for local multi-service development, but it is not by itself a general multi-host orchestration platform.

## Orchestration concepts
Platforms commonly provide desired replica count, scheduling, service discovery, health checks, rolling updates, resource requests/limits and secret/configuration injection. Kubernetes is one option, not the default answer for every team. Managed container platforms may provide enough functionality with much less operational overhead. Choose based on complexity and team capability.

## Statelessness and storage
Prefer disposable application instances and externalize durable state. If a workload needs local disk, define what happens when the instance moves or is replaced. Persistent volumes have provider-specific availability, attachment and backup semantics. A stateful service needs a recovery plan beyond “restart the container.”

## Resource and health configuration
Requests and limits affect scheduling and isolation; incorrect memory limits can cause restarts, while low CPU allocation can cause latency. Health checks need realistic startup grace periods and must not turn a dependency outage into a restart storm. Set graceful shutdown behavior so in-flight requests and jobs can finish safely.

## Image operations
Use a registry with controlled access, immutable digests for release identity, vulnerability scanning and a patching process for base images. Avoid shipping compilers, test credentials or development tools in the runtime image unless necessary. Confirm the process writes logs to the platform’s expected output and handles termination signals.

## Practice
Take a simple Dockerized API and specify its production deployment: number of replicas, CPU/memory limits, readiness/liveness checks, secret source, database pool cap, rollout strategy, logging and autoscaling bounds. Explain what the platform handles and what your team must still operate.
