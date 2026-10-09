# Compute Choices: VM, Containers, PaaS, and Functions

## Learning goals
Select a compute model that fits the application’s lifecycle, traffic pattern and operational capacity.

## Virtual machines
A VM offers broad control over the operating system and runtime. It suits legacy applications, custom system dependencies and workloads requiring OS-level access. The cost of flexibility is responsibility: patching, hardening, process supervision, deployment automation, scaling and host-level monitoring.

## Containers
Containers package an application and its dependencies into a portable image. They make builds more repeatable and separate application packaging from the host, but they are not a complete security boundary and do not eliminate runtime operations. Someone still has to schedule containers, supply configuration, manage networking, replace failed instances and store persistent data.

## Managed application platforms
A platform service can manage deployment, runtime instances, health checks and scaling. This reduces operational work but introduces platform constraints: supported languages, filesystem behavior, startup expectations, request duration, networking and buildpack/runtime versions. Verify these before committing to the platform.

## Functions and event-driven compute
Functions are useful for event handlers, scheduled jobs and bursty workloads. They can scale quickly, but cold starts, execution limits, concurrency, retry semantics and vendor-specific integrations affect design. A function triggered at least once must usually tolerate duplicate events. A long-running job may fit a worker or container better.

## Compare total cost and control
Do not compare only the headline hourly price. Include idle capacity, build minutes, managed database charges, logs, network egress, load balancers, backups, support and engineering time. A cheap VM can be expensive if it requires frequent manual maintenance; a managed platform can be expensive at steady high utilization. Measure with realistic traffic.

## Decision questions
1. Does the workload need privileged OS access or a special runtime?
2. Is it request/response, a queue worker, a scheduled task, or a long-running process?
3. What startup time and execution duration are acceptable?
4. How should it scale, and what happens at maximum concurrency?
5. Who will patch, monitor and recover it?
6. How hard would migration be if the platform changed its price or limits?

## Practice
Deploy the same small HTTP endpoint conceptually to a VM, a container service and a function platform. Describe the build artifact, configuration source, health check, scaling unit, logs and rollback method for each. This exercise reveals that “deploy” is a set of operational responsibilities, not a single command.
