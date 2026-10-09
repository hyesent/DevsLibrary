# Shared Responsibility and Cloud Account Safety

## Learning goals
Identify the responsibilities your team retains even when using managed cloud services, and set a safe baseline before deploying anything public.

## Shared responsibility is service-specific
Cloud security is split between provider responsibilities and customer responsibilities. Providers protect the underlying facilities and services they operate. Customers generally remain responsible for identities, permissions, data classification, application vulnerabilities, network exposure and correct configuration. The boundary shifts with the service: a virtual machine leaves more OS responsibility with you than a fully managed runtime.

Treat the responsibility matrix as a starting point, not a substitute for the service contract and documentation. For regulated workloads, also verify audit evidence, data locations, retention behavior and the provider’s incident-notification terms.

## Protect the control plane
The cloud control plane can create machines, read secrets, change firewall rules and delete data. Secure it as carefully as production application access.

- Use multi-factor authentication for human accounts, especially administrators.
- Prefer identity federation or short-lived credentials over long-lived access keys.
- Give people and services the minimum permissions required for their task.
- Separate production from development accounts or projects where practical.
- Keep an auditable break-glass process for emergencies and monitor its use.
- Enable alerts for risky changes, new credentials, public storage and unusual spending.

Do not commit credentials to source control, paste them into issue trackers, or bake them into container images. Rotate exposed credentials promptly and investigate where they may have been used; deleting a key from the latest commit does not erase it from history or logs.

## Network exposure
A public IP address or public endpoint is not automatically wrong, but exposure should be deliberate. A typical web application may expose HTTPS to the internet while keeping databases and administrative services on private network paths. Restrict inbound ports, use provider-native security groups or firewall rules, and avoid exposing database ports to `0.0.0.0/0`.

Private networking is not a substitute for authentication. Systems inside a private subnet can still be compromised, misconfigured or reached through an application vulnerability. Apply authorization and encryption at service boundaries as well.

## Data protection
Classify data before selecting storage. Consider encryption in transit and at rest, key ownership, backups, deletion, retention, access logging and legal requirements. Encryption is only one control: a principal allowed to decrypt and export all records can still cause a breach.

## Practice: pre-deployment review
For a hypothetical API, identify every identity, secret, public endpoint, data store and admin path. For each, answer: who can access it, how is access granted, where is access logged, and how would access be revoked? Any unanswered question is a risk to resolve before production.

## Common failure
Teams often secure the application but leave broad cloud permissions in CI. A compromised build token can then modify deployments or extract production data. Scope CI credentials to the exact repository, environment and actions they require.
