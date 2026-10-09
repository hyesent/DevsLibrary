---
title: "Searching with grep, find, and locate"
order: 9
book: "linux"
---

# Searching with grep, find, and locate

## Learning goal

Search file contents and filesystem names using the right model. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

`grep` searches text content; `find` evaluates filesystem objects using predicates; `locate` searches a prebuilt filename database when installed. These tools solve different problems and have different freshness, permission, and performance characteristics.

## How it works in practice

Use `grep -n` for line numbers, `-i` for case-insensitive matching, `-r` for recursive search when appropriate, and `find` predicates such as `-type`, `-name`, `-mtime`, and `-size`. Understand that `find` actions execute as the traversal proceeds.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
grep -n 'root' /etc/passwd
find ~/linux-lab -type f -name '*.txt' -print
find ~/linux-lab -type f -size +1M -print
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Searching the whole system unnecessarily; confusing regex syntax with shell globs; using `find -exec rm` before reviewing the matched paths.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Find all `.txt` files in your sandbox, then search their contents for a chosen word.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
