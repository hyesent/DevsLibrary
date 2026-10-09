---
title: "Logs, journald, and log rotation"
order: 26
book: "linux"
---

# Logs, journald, and log rotation

## Learning goal

Use logs as structured evidence while protecting sensitive data. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Logs describe events from applications, services, kernel components, and security subsystems. Good diagnosis correlates timestamps, severity, request or process identifiers, and changes. Logs can be incomplete because of retention, buffering, permissions, or service restarts.

## How it works in practice

`journalctl` can filter by boot, unit, priority, and time. Traditional text logs may be managed by logrotate. Redact tokens, credentials, personal data, and private payloads before sharing logs. Use consistent timestamps and preserve enough context to reconstruct the event.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
journalctl -b --no-pager | tail -n 50
journalctl -u ssh --since today --no-pager 2>/dev/null | tail
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Treating absence of a log line as proof that an event did not occur; deleting logs to free space without preserving evidence; collecting secrets in verbose debug output.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Given a hypothetical service failure, construct a timeline from timestamps and identify what additional evidence is missing.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
