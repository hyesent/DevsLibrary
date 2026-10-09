# Infrastructure as Code and Drift Control

## Learning goals
Understand how infrastructure as code (IaC) makes cloud configuration reviewable and repeatable, and why it still requires safeguards.

## Desired state
IaC defines infrastructure through versioned configuration and a deployment tool. Instead of clicking through a control panel and hoping to reproduce every setting later, teams can review changes, apply them in controlled stages and reconstruct environments. Tools differ, but common concepts include plans, state, dependencies, providers and resource lifecycle.

## State is sensitive operational data
Some IaC tools keep a state file mapping declared resources to real resources. State can include identifiers and sometimes sensitive values. Store it in a protected backend with access control, encryption and concurrency locking where supported. Do not commit production state into a public repository. Back up state and document recovery before making manual changes.

## Review plans carefully
A plan may show creation, update, replacement or deletion. A replacement can cause downtime or data loss if a resource is stateful. Review destructive changes and understand whether a resource can be recreated safely. A successful syntax check is not proof that an infrastructure change is safe.

## Drift
Drift occurs when live infrastructure differs from the declared configuration, often due to manual edits or external automation. Detect it with plans or drift checks. Do not blindly apply a plan in production: first understand why drift exists, whether it represents an emergency fix, and how to bring code and reality back into agreement.

## Modules and environments
Reusable modules reduce duplication but can hide complexity if they expose too many options or have unclear defaults. Keep interfaces small, document assumptions and pin module/provider versions according to a maintenance policy. Separate environment-specific state and permissions to prevent a development command from modifying production.

## Secret handling
Marking a variable as sensitive may hide it from normal terminal output but does not necessarily prevent it from being stored in state or logs. Use supported secret references and access controls; verify the tool’s behavior instead of assuming a label encrypts data.

## Practice
Model a small service: network, app runtime, database and monitoring. Review the plan for a change to the database size and a change that replaces the database. Explain which needs maintenance planning, a backup, approval and an outage window. Add a drift procedure that preserves emergency fixes while restoring reproducibility.
