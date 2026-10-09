---
title: "DNS, ports, sockets, and service reachability"
order: 21
book: "linux"
---

# DNS, ports, sockets, and service reachability

## Learning goal

Connect names, addresses, ports, listening sockets, and applications. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

DNS maps names to records; IP moves packets between hosts; TCP and UDP provide transport behaviors; ports identify endpoints within a host. A listening socket can be bound to loopback, a specific interface, or all interfaces, which changes who can reach it.

## How it works in practice

`ss -lntup` can show listening TCP/UDP sockets and associated processes where permissions allow. `curl -v` reveals details of an HTTP connection. Firewall rules, NAT, container networks, proxies, and cloud security groups may each affect reachability.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
ss -lntup
curl -v --max-time 5 http://127.0.0.1:8000/
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Assuming `localhost` means the same thing inside and outside a container; binding to `0.0.0.0` without considering exposure; assuming DNS returns only one address or record type.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Run a local development server bound to loopback and explain why another machine cannot normally connect to it.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
