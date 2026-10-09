---
title: "Userspace permissions, ACLs, and capabilities"
order: 30
book: "linux"
---

# Userspace permissions, ACLs, and capabilities

## Learning goal

Go beyond basic mode bits without over-granting authority. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

POSIX ACLs add per-user and per-group permissions beyond the owner/group/other mode model. Linux capabilities divide some root powers into narrower privileges. Both mechanisms can solve legitimate access needs but make effective access less obvious.

## How it works in practice

Use `getfacl` and `setfacl` when ACL tools and filesystem support are available. The ACL mask can limit effective named-user and named-group permissions. Capabilities should be granted narrowly and audited; a capability is not equivalent to a harmless permission bit.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
command -v getfacl setfacl getcap setcap
getfacl . 2>/dev/null | head
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Forgetting ACL masks; setting capabilities on unexpected binaries; treating a capability as risk-free; debugging only `ls -l` when ACLs alter effective access.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Explain why a user might be denied access even when a named ACL entry appears to grant it.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
