---
title: "Permissions, ownership, and mode bits"
order: 12
book: "linux"
---

# Permissions, ownership, and mode bits

## Learning goal

Reason about who can read, modify, and traverse filesystem objects. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Traditional permissions define read, write, and execute bits for owner, group, and others. For files, execute means the ability to execute it subject to other controls. For directories, read lists names, write changes directory entries, and execute (search) permits traversal and access by name.

## How it works in practice

`chmod` changes mode, `chown` changes owner, and `chgrp` changes group. Symbolic modes express intent (`u+x`, `g-w`); octal modes encode bit sets (`640`, `755`). A directory usually needs execute permission to traverse it, even when its names are readable.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
umask
stat ~/linux-lab/notes/example.txt
chmod 600 ~/linux-lab/notes/example.txt
ls -l ~/linux-lab/notes/example.txt
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Using `chmod 777` as a universal fix; forgetting directory execute permissions; changing ownership recursively without confirming the target; overlooking ACLs and mount options.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Set a private file to owner-only read/write, then explain what each digit in `600` means.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
