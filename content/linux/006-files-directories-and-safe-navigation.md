---
title: "Files, directories, and safe navigation"
order: 6
book: "linux"
---

# Files, directories, and safe navigation

## Learning goal

Inspect, create, copy, move, and remove files deliberately. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

File commands usually operate on pathnames, not on abstract documents. `cp` copies, `mv` renames or moves, `mkdir` creates directories, and `rm` removes directory entries. Their behavior depends on options, permissions, filesystem boundaries, and whether targets already exist.

## How it works in practice

Use `-i` where interactive confirmation helps, `-n` where supported to avoid overwriting, and `--` to end option parsing before path operands. Quoting protects spaces and wildcard characters from shell expansion. Test complex operations with `printf` or `find ... -print` before adding destructive actions.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
mkdir -p ~/linux-lab/notes
printf 'draft\n' > ~/linux-lab/notes/example.txt
cp ~/linux-lab/notes/example.txt ~/linux-lab/copy.txt
mv ~/linux-lab/copy.txt ~/linux-lab/renamed.txt
ls -la ~/linux-lab
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Running `rm -rf` with an unchecked variable; forgetting that `*` is expanded by the shell; expecting `mv` to behave identically across filesystems.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create a sandbox, copy a file, rename it, and remove only the sandbox after checking its exact path.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
