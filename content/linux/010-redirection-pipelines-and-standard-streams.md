---
title: "Redirection, pipelines, and standard streams"
order: 10
book: "linux"
---

# Redirection, pipelines, and standard streams

## Learning goal

Compose commands by connecting input, output, and errors. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Programs commonly use standard input (fd 0), standard output (fd 1), and standard error (fd 2). Redirection connects these streams to files or other destinations; a pipeline connects one process’s output to another’s input.

## How it works in practice

`>` truncates a destination, `>>` appends, and `2>` redirects standard error. `2>&1` duplicates the current standard-output destination for standard error, so ordering matters. A pipeline normally reports the last command’s status in many shells; Bash `set -o pipefail` makes a pipeline fail when a component fails.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
printf 'alpha\nbeta\n' | grep beta
printf 'saved\n' > ~/linux-lab/output.txt
ls /missing-path > ~/linux-lab/out.txt 2> ~/linux-lab/err.txt
cat ~/linux-lab/err.txt
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Overwriting an important file with `>`; redirecting stderr in the wrong order; losing upstream failures in a pipeline; assuming all shells support the same options.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create separate stdout and stderr files from a command that intentionally encounters an error.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
