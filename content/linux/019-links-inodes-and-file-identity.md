---
title: "Links, inodes, and file identity"
order: 19
book: "linux"
---

# Links, inodes, and file identity

## Learning goal

Distinguish a pathname from the filesystem object it refers to. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A directory maps names to filesystem objects. A hard link is another name for the same inode on filesystems that support it; a symbolic link is a separate object containing a path reference. Multiple hard links share the same underlying file data and metadata.

## How it works in practice

`stat` shows inode and metadata information; `ln` creates hard links and `ln -s` creates symbolic links. Hard links generally cannot cross filesystem boundaries and normally cannot be created for directories by ordinary users. Relative symlinks resolve relative to the symlink’s containing directory.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
printf 'original\n' > ~/linux-lab/original.txt
ln ~/linux-lab/original.txt ~/linux-lab/hard.txt
ln -s original.txt ~/linux-lab/symbolic.txt
stat ~/linux-lab/original.txt ~/linux-lab/hard.txt
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming a symlink target exists; moving a relative symlink without considering its target path; believing removing one hard-link name always deletes the data.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Compare `stat` output for the original, hard link, and symbolic link before and after editing the original.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
