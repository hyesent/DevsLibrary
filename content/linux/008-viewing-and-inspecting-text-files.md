---
title: "Viewing and inspecting text files"
order: 8
book: "linux"
---

# Viewing and inspecting text files

## Learning goal

Choose the right tool for short files, large logs, and structured output. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Use `cat` for concatenation and small files, `less` for interactive navigation, `head` and `tail` for boundaries, and `wc` for counts. `tail -f` follows appended output; `tail -F` can follow a pathname across some log rotations.

## How it works in practice

Text is a byte stream, and encoding matters. Commands such as `file`, `od`, and `xxd` can help identify unexpected formats. Avoid dumping huge or binary files directly into a terminal, and remember that terminal display is not a faithful representation of every byte.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
file /etc/os-release
head -n 5 /etc/os-release
tail -n 5 /etc/os-release
wc -l /etc/os-release
less /etc/os-release
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Opening giant files with tools that load everything into memory; confusing line counts with record counts; assuming all text is UTF-8.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Inspect a log-sized sample with `less`, jump to the end, search for a term, and record the relevant line without editing the file.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
