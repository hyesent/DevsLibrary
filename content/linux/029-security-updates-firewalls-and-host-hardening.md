---
title: "Security updates, firewalls, and host hardening"
order: 29
book: "linux"
---

# Security updates, firewalls, and host hardening

## Learning goal

Reduce attack surface while preserving a recoverable administration path. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Host security is layered: timely updates, least privilege, minimal services, authentication controls, firewall policy, secure defaults, backups, and monitoring. No single hardening checklist substitutes for a threat model and operational ownership.

## How it works in practice

Inventory listening services, identify exposed interfaces, and understand whether firewalling is handled by nftables, firewalld, ufw, a cloud firewall, or another layer. Apply changes incrementally and test both intended access and unintended exposure. Keep security updates and reboot requirements visible.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
ss -lntup
command -v nft ufw firewall-cmd
# Inspect only; do not change firewall rules in a remote session without a rollback plan.
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Copying generic firewall commands without understanding the active firewall; locking yourself out over SSH; assuming a host firewall replaces application authorization; disabling services without checking dependencies.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Produce a hardening checklist for a small public web server, including verification and rollback for each change.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
