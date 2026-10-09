---
title: "Bash scripting: variables, quoting, and arguments"
order: 22
book: "linux"
---

# Bash scripting: variables, quoting, and arguments

## Learning goal

Write scripts whose inputs and expansions behave predictably. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A shell script is parsed by the selected shell; it is not a general-purpose programming language with automatic type safety. Variables are text, and expansions can trigger word splitting and pathname expansion unless quoted. Use `#!/usr/bin/env bash` for Bash-specific scripts when that interpreter is appropriate.

## How it works in practice

Use `"$name"` for a single argument, `"$@"` to preserve each positional argument, and `${var:-default}` to supply a default when a variable is unset or empty. Validate arguments early and print actionable usage errors.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
cat > ~/linux-lab/greet.sh <<'EOF'
#!/usr/bin/env bash
set -u
if (($# != 1)); then echo "Usage: $0 NAME" >&2; exit 2; fi
printf 'Hello, %s\n' "$1"
EOF
chmod +x ~/linux-lab/greet.sh
~/linux-lab/greet.sh 'Ada Lovelace'
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Using unquoted variables; using `$*` when argument boundaries matter; relying on the caller’s working directory; failing to validate missing arguments or filenames beginning with hyphens.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Extend the script to reject an empty name and return a documented nonzero status for invalid input.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
