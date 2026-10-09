---
title: "Performance profiling and benchmarking on Linux"
order: 38
book: "linux"
---

# Performance profiling and benchmarking on Linux

## Learning goal

Measure reproducibly and distinguish bottlenecks from symptoms. By the end, you should be able to explain the underlying model, select an appropriate tool, inspect the result, and recognize when a task needs additional documentation or authorization.

## Core mental model

Benchmarking needs a defined workload, warm-up behavior, environment, repetitions, and a metric that reflects user impact. A single elapsed-time sample is often too noisy to support a conclusion.

## How it works in practice

Tools such as `time`, `perf`, `strace`, and `hyperfine` may help, depending on installation and permissions. `strace` shows system calls but can perturb timing. Profiling tools have different overhead and may be restricted by kernel settings.

Treat commands as experiments. Before running one, identify its inputs, expected output, side effects, privilege requirements, and failure behavior. After running it, compare the result with your prediction. The examples below are deliberately small so that the system's behavior remains observable.

## Worked command-line example

```bash
time find ~/linux-lab -type f -print
command -v perf strace hyperfine
```

Read each line before running it. Some commands are illustrative and depend on tools being installed or on your distribution. Commands marked as inspection-only should not be turned into configuration changes without a plan.

## Failure modes and edge cases

Optimizing from one run; comparing results across different workloads; ignoring background activity and cache effects; running profilers on production without considering overhead or privacy.

Additional questions to ask when debugging:

- Am I on the intended host, in the intended account, and in the expected directory?
- Does the command exist here, and which implementation/version is it?
- Is the failure caused by permissions, environment, unavailable resources, malformed input, or a service boundary?
- Did the command partially succeed before returning an error?
- Can I reproduce the issue safely in a sandbox, and how will I verify a fix?

## Practice lab

Design a benchmark plan comparing two approaches, specifying warm-up, repetitions, summary statistics, and how you will avoid changing multiple variables.

**Extension:** Repeat the exercise with an edge case, such as a path containing spaces, a missing optional tool, a restricted account, or a failed command. Record what changed and why.

## Self-check

1. Explain the central concept in your own words without repeating the definition.
2. Identify one common misconception and the evidence that disproves it.
3. State what the example does, what it does not prove, and what could vary by distribution.
4. Describe a safe rollback or cleanup step, if the exercise changes state.

## Connection to system administration

Professional Linux work combines technical knowledge with operational judgment. Prefer read-only inspection first, least privilege, explicit paths, trustworthy software sources, documented changes, and verification after every important action. When a command's effects are unclear, stop and consult its installed manual or the relevant distribution documentation rather than guessing.
