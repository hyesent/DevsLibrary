# Cloud Computing: The Actual Trade-offs

## Learning goals
By the end, you should be able to explain what a cloud provider supplies, what remains your responsibility, and why “move it to the cloud” is not an architecture by itself.

## The useful mental model
Cloud computing provides on-demand access to computing resources—compute, storage, networking, managed platforms and higher-level services—through APIs or control panels. Instead of purchasing every server and operating it in your own building, a team rents capacity and delegates selected operational tasks to a provider.

The cloud does not remove complexity. It changes where complexity lives. A managed database can take routine backups and patching off your plate, but your team still owns schema design, access policy, query quality, recovery objectives and application correctness. A virtual machine gives flexibility but also leaves you responsible for its operating system, patching and service configuration.

Common benefits include elastic capacity, geographic reach, automation, faster provisioning and access to managed services. Costs and risks include variable bills, provider-specific behavior, account compromise, outages, data-transfer fees, operational complexity and dependence on a provider’s APIs.

## Choose a service based on responsibility

| Model | Provider typically manages | You typically manage |
|---|---|---|
| Virtual machines / IaaS | Physical hardware, virtualization, data-center network | Guest OS, runtime, application, data, much of security configuration |
| Managed application platform / PaaS | Infrastructure plus some runtime and deployment lifecycle | Application, data, configuration, identity and supported runtime choices |
| Serverless functions | Servers and function execution platform | Function code, triggers, permissions, dependencies, limits and data |
| SaaS | Most of the application stack | Users, access, configuration, data governance and integrations |

The exact boundary differs by product. Read the service’s responsibility model rather than relying on labels alone.

## Regions and zones
A region is a geographic area containing cloud resources. Availability zones are isolated failure domains within a region, though the exact design and guarantees differ by provider. Spreading replicas across zones can reduce exposure to a single-zone failure, but only if the application, database, networking and failover procedure are designed for it. Two servers in one zone are not equivalent to two independent failure domains.

## A decision checklist
Before choosing a platform, document workload shape, latency needs, compliance obligations, data residency, expected traffic, operational skills, recovery objectives, portability needs and budget. Estimate the full system—not only compute—because storage, requests, logs, backups, NAT gateways and outbound transfer can dominate costs.

## Practice
For a small API and PostgreSQL database, compare a VM, a managed app platform and a container service. For each, list who patches the OS, who restores backups, how secrets are delivered, and what happens if a zone fails. If you cannot answer those questions, the design is not ready.

## Common misconception
“Managed” does not mean “risk-free” or “fully operated for you.” It means a particular set of tasks has moved to the provider. Confirm the boundary for every critical service.
