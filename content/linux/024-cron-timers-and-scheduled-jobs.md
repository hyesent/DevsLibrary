---
title: "Cron, timers, and scheduled jobs"
order: 24
book: "linux"
---

# Cron, timers, and scheduled jobs

## Learning goal

Run recurring work with predictable environment and logging. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Scheduled tasks run with an environment that may differ from an interactive terminal: PATH can be shorter, the working directory may differ, and there may be no interactive prompts. A scheduled job needs explicit paths, logging, locking, and failure visibility.

## How it works in practice

Cron is common for simple recurring schedules; systemd timers integrate with service units and journal logging. Avoid overlapping runs when a task may exceed its interval. Handle time zones, daylight-saving transitions, and missed-run behavior deliberately.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
command -v crontab
systemctl list-timers --all 2>/dev/null | head
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming the scheduler inherits your shell environment; storing secrets in crontab; allowing overlapping backups; never checking whether scheduled tasks fail.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Design a daily report job on paper: command, environment, output log, lock strategy, failure notification, and retention.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
