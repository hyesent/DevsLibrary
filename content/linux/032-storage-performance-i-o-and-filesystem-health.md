---
title: "Storage performance, I/O, and filesystem health"
order: 32
book: "linux"
---

# Storage performance, I/O, and filesystem health

## Learning goal

Separate capacity problems from latency and device failures. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Storage can be constrained by capacity, inode exhaustion, latency, throughput, queue depth, filesystem behavior, or a failing device. Applications may appear slow even when CPU usage is low if they are blocked waiting for I/O.

## How it works in practice

`df -h` checks capacity, `df -i` checks inodes, and tools such as `iostat` may show device performance when installed. SMART tools can expose drive health information for supported devices. Do not run repair or destructive filesystem tools on mounted filesystems without understanding the recovery procedure.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
df -h
df -i
iostat -xz 1 3 2>/dev/null
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming disk-full is the only storage failure; running `fsck` against a mounted filesystem; benchmarking production disks without estimating impact; overlooking deleted-but-open files.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Build a diagnostic decision tree for “writes are failing” that distinguishes capacity, inodes, permissions, read-only mounts, and device errors.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
