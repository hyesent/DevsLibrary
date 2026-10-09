---
title: "Troubleshooting methodology and incident notes"
order: 37
book: "linux"
---

# Troubleshooting methodology and incident notes

## Learning goal

Diagnose from evidence using reversible tests and explicit hypotheses. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Effective troubleshooting is a controlled investigation. State the symptom precisely, establish scope and timeline, gather a baseline, generate hypotheses, and run tests that distinguish among them. Change one variable at a time where practical.

## How it works in practice

Preserve logs and state before restarting or reinstalling. Prefer read-only checks first. Record commands, timestamps, results, and changes. If a mitigation restores service, continue to investigate root cause rather than assuming the incident is fully explained.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
date -Is
uptime
free -h
df -h
ip route
ss -lntup
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Restarting immediately and destroying useful evidence; changing several settings at once; confusing correlation with causation; recording conclusions without the command output that supports them.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Write a short incident report with impact, timeline, evidence, hypothesis, test, mitigation, root cause confidence, and follow-up actions.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
