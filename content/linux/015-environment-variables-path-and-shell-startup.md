---
title: "Environment variables, PATH, and shell startup"
order: 15
book: "linux"
---

# Environment variables, PATH, and shell startup

## Learning goal

Understand how the environment influences commands and sessions. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Environment variables are name/value strings inherited by child processes. `PATH` is an ordered list of directories searched for executable commands. Shell startup files differ between login, interactive, and non-interactive sessions, and behavior differs among Bash, Zsh, and other shells.

## How it works in practice

`export NAME=value` makes a variable available to child processes. `env` can show or set a process environment. Prefer project-local configuration and explicit tool versions over globally changing PATH in ways that make unrelated projects behave differently.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
printf '%s\n' "$SHELL" "$PATH"
export DEMO_MODE=practice
sh -c 'printf "%s\n" "$DEMO_MODE"'
command -v python
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Putting secrets in shell history or world-readable startup files; assuming `.bashrc` is read in every context; shadowing system commands with unexpected PATH entries.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create a temporary environment variable, verify child inheritance, and unset it afterward.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
