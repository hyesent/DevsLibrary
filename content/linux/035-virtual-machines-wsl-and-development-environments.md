---
title: "Virtual machines, WSL, and development environments"
order: 35
book: "linux"
---

# Virtual machines, WSL, and development environments

## Learning goal

Choose an environment based on isolation, integration, and reproducibility. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A native Linux installation, virtual machine, WSL environment, container, and remote development host have different kernel boundaries, device access, filesystem performance, and networking behavior. None is universally best for every task.

## How it works in practice

Keep projects in the filesystem best suited to the environment, avoid mixing package managers across boundaries, and understand how ports and files are shared. Reproducibility improves when setup steps are documented and dependencies are pinned.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
uname -a
cat /proc/version
command -v systemd-detect-virt && systemd-detect-virt
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming identical behavior across WSL, containers, VMs, and bare metal; storing a project on a slow cross-OS mount without measuring; confusing guest and host network addresses.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Choose a development environment for a web app requiring Docker, Linux tooling, and editor integration; justify trade-offs.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
