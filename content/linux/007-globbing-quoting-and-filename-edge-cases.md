---
title: "Globbing, quoting, and filename edge cases"
order: 7
book: "linux"
---

# Globbing, quoting, and filename edge cases

## Learning goal

Predict shell expansion and safely handle unusual filenames. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Globs such as `*.log` are expanded by the shell before the program runs. Single quotes preserve literal characters; double quotes preserve most characters while still allowing parameter and command substitution; backslashes escape selected characters.

## How it works in practice

A filename may contain spaces, tabs, leading hyphens, and even newlines. Use quoted variables and `--` to protect operands. For robust automation, prefer NUL-delimited pathname streams (`find -print0` and `xargs -0`) over parsing newline-delimited output.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
touch -- 'file with spaces.txt' '-strange-name.txt'
printf '%s\n' ./*.txt
rm -- 'file with spaces.txt' '-strange-name.txt'
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Using `for f in $(find ...)`, which breaks on whitespace; forgetting that unmatched globs behave differently between shells; using `ls` output as a data format.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create files with spaces and leading hyphens, then safely list and remove them using quoted paths.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
