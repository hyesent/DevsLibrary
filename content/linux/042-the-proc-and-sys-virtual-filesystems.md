---
title: "The /proc and /sys virtual filesystems"
order: 42
book: "linux"
---

# The /proc and /sys virtual filesystems

## Learning goal

Inspect kernel and device state through virtual interfaces. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

`/proc` exposes process and kernel information; `/sys` exposes structured device, driver, and kernel-object information. Many entries are generated dynamically rather than stored as ordinary disk files. Some interfaces are writable controls and can change system behavior.

## How it works in practice

Use these files for observation when possible, and read documentation before writing to sysfs or procfs controls. Values may vary with kernel version, namespace, permissions, and hardware.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
cat /proc/uptime
cat /proc/meminfo | head
cat /proc/cpuinfo | head
ls /sys/class
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Treating virtual files as static config files; assuming a value exists on every kernel; writing a control without understanding its effect; exposing process details unnecessarily in shared environments.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Inspect a few `/proc` values and explain which are snapshots, counters, or dynamically generated information.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
