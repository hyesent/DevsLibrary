---
title: "Networking fundamentals and interface inspection"
order: 20
book: "linux"
---

# Networking fundamentals and interface inspection

## Learning goal

Diagnose local interfaces, routes, DNS, and connectivity in layers. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Networking problems should be narrowed by layer: link and interface state, IP address and route, name resolution, transport reachability, then application protocol. A successful ping does not prove a web service works, and a failed ping does not prove all network traffic is blocked.

## How it works in practice

Modern Linux systems commonly use `ip` for interfaces and routes, `ss` for sockets, and tools such as `getent`, `curl`, and `dig` for name and application checks. Tool availability varies. Inspect before changing network configuration, especially over a remote session.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
ip address
ip route
ss -tulpn
getent hosts example.com
curl -I https://example.com
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Changing routes remotely without a rollback; confusing DNS failure with routing failure; assuming a port is reachable because a process is running; exposing services on all interfaces unintentionally.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

For a site you are authorized to access, separately test name resolution, route selection, TCP/application response, and TLS.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
