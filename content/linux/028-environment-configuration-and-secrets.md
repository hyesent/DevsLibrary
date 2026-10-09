---
title: "Environment configuration and secrets"
order: 28
book: "linux"
---

# Environment configuration and secrets

## Learning goal

Keep configuration explicit and credentials out of source control. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Applications receive configuration from files, environment variables, command-line arguments, and secret managers. Each has trade-offs for precedence, auditability, exposure, and rotation. Environment variables can be convenient but may be visible to privileged inspection or accidentally logged.

## How it works in practice

Separate nonsecret configuration from secrets, define precedence, validate required values at startup, and rotate credentials when exposed. Use restrictive file permissions and managed secret stores in production. Avoid placing tokens directly in shell history, command arguments, screenshots, or committed `.env` files.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
umask 077
mkdir -p ~/linux-lab/private
printf 'API_URL=https://example.invalid\n' > ~/linux-lab/private/app.env
chmod 600 ~/linux-lab/private/app.env
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Committing `.env`; assuming environment variables are automatically encrypted; sharing production credentials in debugging output; forgetting rotation and revocation procedures.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Design a safe local development configuration and a separate production secret-management approach.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
