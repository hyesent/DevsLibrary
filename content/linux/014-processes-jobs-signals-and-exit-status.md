---
title: "Processes, jobs, signals, and exit status"
order: 14
book: "linux"
---

# Processes, jobs, signals, and exit status

## Learning goal

Observe process state and control running work safely. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A process is a running program instance with a PID, credentials, environment, open file descriptors, and execution state. A shell can manage foreground and background jobs, while the kernel schedules runnable tasks. Process names alone are not reliable identities.

## How it works in practice

`ps` provides a snapshot, `top`/`htop` provide live views, `jobs` shows shell jobs, and `kill` sends a signal. `SIGTERM` requests orderly termination; `SIGKILL` cannot be caught and should be a last resort. Exit codes communicate outcomes to calling programs and scripts.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
sleep 300 &
jobs
ps -o pid,ppid,stat,cmd -p "$!"
kill -TERM "$!"
wait
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Killing by a broad name pattern; assuming a process has stopped because a signal was sent; confusing job IDs such as `%1` with system PIDs; ignoring zombies and parent-child relationships.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Start a harmless background process, inspect it, send TERM, and verify its final status.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
