---
title: "Kernel, modules, boot, and startup sequence"
order: 41
book: "linux"
---

# Kernel, modules, boot, and startup sequence

## Learning goal

Understand how the machine reaches a running user environment. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

A typical boot path involves firmware, a bootloader, kernel initialization, an initramfs when used, mounting the real root filesystem, and starting PID 1 and system services. Details vary by firmware mode, distribution, bootloader, and init system.

## How it works in practice

`dmesg` and `journalctl -b` can expose kernel and boot messages, subject to permissions and retention. Kernel modules extend kernel functionality; loading modules is a privileged operation and should follow trusted package and device-management practices.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
uname -r
cat /proc/cmdline
lsmod | head
journalctl -b --no-pager | head -n 40
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Changing bootloader settings without a recovery path; loading untrusted kernel modules; assuming all distributions boot identically; confusing a kernel update with a running-kernel change before reboot.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Sketch the boot sequence of your system and identify the evidence you would collect if it failed before reaching a login prompt.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
