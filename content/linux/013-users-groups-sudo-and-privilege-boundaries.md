---
title: "Users, groups, sudo, and privilege boundaries"
order: 13
book: "linux"
---

# Users, groups, sudo, and privilege boundaries

## Learning goal

Use least privilege and distinguish identity from authority. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A user identity and its group memberships influence access checks. Administrative operations should use controlled privilege elevation, commonly through `sudo`, rather than making everyday work run as root. Root can bypass many ordinary permission checks, so mistakes can affect the entire system.

## How it works in practice

`id` reports identity and groups; `whoami` reports the effective username; `sudo -l` shows permitted sudo commands where configured. A command launched with `sudo` may use a different environment, working assumptions, and PATH. Review the exact command before approving elevation.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
id
whoami
sudo -l
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Running unknown scripts as root; piping an unreviewed network download into a privileged shell; assuming `sudo` is installed or configured; confusing authentication with authorization.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Explain which operations in your daily workflow truly need administrative rights and how you would perform them with the smallest scope.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
