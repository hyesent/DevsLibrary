---
title: "Backups, restore testing, and disaster recovery"
order: 33
book: "linux"
---

# Backups, restore testing, and disaster recovery

## Learning goal

Prove that data can be restored before disaster strikes. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A backup is useful only if it is restorable, complete enough for the recovery objective, and protected from the same failure that affects production. Define recovery point objective (RPO) and recovery time objective (RTO) before choosing schedules and retention.

## How it works in practice

Keep multiple copies and consider offline or immutable copies for ransomware resilience. Verify backup integrity, test restores into an isolated environment, encrypt sensitive backups, and document access to decryption keys. Back up configuration and recovery instructions, not just application data.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
tar -czf ~/linux-lab-backup.tar.gz ~/linux-lab
tar -tzf ~/linux-lab-backup.tar.gz | head
sha256sum ~/linux-lab-backup.tar.gz
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming a successful backup command means a successful recovery; storing every backup on the same disk; never testing permissions, ownership, or application consistency after restore.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Write a recovery runbook for a small website, including restore order, verification, RPO/RTO, and the person who can authorize recovery.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
