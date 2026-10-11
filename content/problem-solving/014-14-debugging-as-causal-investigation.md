---
title: "Debugging as Causal Investigation"
order: 14
book: "problem-solving"
---

Debugging is not random editing until the symptom disappears. It is a controlled investigation into why observed behavior differs from expected behavior.

Start by reproducing the issue. Record the exact input, state, environment, steps, and expected versus actual result. If the failure is intermittent, reduce the case and capture evidence rather than assuming it is fixed because it did not happen again.

Form hypotheses that make different predictions. If a request returns stale data, possible causes include browser caching, an application cache, a database transaction, replica lag, or a client state bug. Inspect evidence that distinguishes these possibilities. Clearing every cache may hide the symptom while leaving the causal defect untouched.

Use a narrowing strategy:
1. Establish where the expected behavior diverges.
2. Inspect boundaries between components.
3. Reduce the input or sequence.
4. Change one variable at a time when practical.
5. Confirm the hypothesis with a targeted experiment.
6. Add a regression test or monitoring signal.
7. Remove temporary instrumentation and document the cause.

Distinguish root cause from trigger and contributing conditions. A null value may trigger a crash, but the root cause may be an API contract that allowed the value unexpectedly. A production outage may be triggered by traffic growth, while the deeper cause is unbounded work per request.

Beware of confirmation bias: developers often interpret evidence in favor of their first theory. Ask what observation would prove the theory wrong. Preserve logs and timestamps, but do not log passwords, tokens, or sensitive payloads.

In concurrent systems, timing changes caused by logging can make a race disappear. Prefer structured traces, deterministic tests, synchronization diagnostics, and minimal experiments.

**Practice:** A save button sometimes creates duplicate records. Form three competing hypotheses and identify the smallest observation that distinguishes each one.

**Connection:** Causal debugging is central to incident response, observability, testing, and reliable architecture.
