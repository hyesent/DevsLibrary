---
title: "SSH, keys, and secure remote administration"
order: 27
book: "linux"
---

# SSH, keys, and secure remote administration

## Learning goal

Operate remote machines without weakening authentication. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

SSH provides encrypted remote login, command execution, forwarding, and file transfer. Public-key authentication uses a private key kept by the client and a public key installed on the server. Host-key checking helps detect unexpected server identity changes.

## How it works in practice

Use passphrases and an agent where appropriate, protect private-key permissions, and verify host keys through a trusted channel. Disable password or root login only after confirming a tested alternative and maintaining a recovery path. `scp` and `sftp` support file transfer.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
ssh -V
ssh-keygen -t ed25519 -C 'dev-machine-key'
ssh -o BatchMode=yes user@host true
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Copying private keys to servers; blindly accepting changed host keys; exposing SSH to the internet without controls; changing SSH configuration without a second session or console recovery.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Create a test keypair, inspect its public key, and document how you would revoke access after a device is lost.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
