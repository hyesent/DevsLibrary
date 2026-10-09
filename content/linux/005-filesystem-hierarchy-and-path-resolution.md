---
title: "Filesystem hierarchy and path resolution"
order: 5
book: "linux"
---

# Filesystem hierarchy and path resolution

## Learning goal

Navigate absolute and relative paths and understand common directory purposes. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Linux presents files, directories, devices, and many system interfaces through a unified filesystem tree rooted at `/`. Common conventions include `/etc` for host configuration, `/home` for user homes, `/var` for changing data, `/tmp` for temporary files, `/usr` for most userland programs and data, and `/dev` for device interfaces.

## How it works in practice

A path is resolved component by component from `/` or the current working directory. `.` means the current directory and `..` its parent. A symbolic link redirects path resolution. Mounts can place another filesystem at a directory without changing the overall tree.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
pwd
ls -la /
realpath .
readlink -f /bin/sh
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming every machine has identical directory contents; deleting a directory because its name looks temporary; forgetting that a mounted filesystem can contain valuable data.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Draw the path from `/` to your home directory and identify which parts are convention versus machine-specific configuration.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
