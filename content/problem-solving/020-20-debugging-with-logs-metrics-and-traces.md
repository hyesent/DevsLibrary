---
title: "Debugging with Logs, Metrics, and Traces"
order: 20
book: "problem-solving"
---

When a problem spans multiple components, one local log line rarely explains the whole story. Logs, metrics, and traces provide different views of behavior.

**Logs** record events and contextual details. **Metrics** aggregate measurements over time, such as request rate, error rate, and latency percentiles. **Traces** connect work across boundaries so one request can be followed through a browser, API, database, and downstream service.

Use correlation or trace identifiers to connect events, but avoid placing secrets or personal data in identifiers and payloads. Structured fields are easier to query than unstructured messages. A useful event might record operation, outcome, duration, and safe resource identifiers.

Metrics should represent questions you actually need to answer. A rising error rate may indicate a broad failure; a latency percentile can reveal that a small fraction of users experience very slow responses even when average latency looks healthy. Beware of high-cardinality labels such as raw user IDs or URLs with unique query strings, which can make monitoring expensive and expose sensitive information.

Instrumentation can itself fail. Clock skew complicates cross-service timelines. Sampling may omit a trace. Missing logs do not prove an event did not happen. Correlate independent evidence and understand each tool's blind spots.

For an incident, define the symptom, scope, start time, affected dependencies, recent changes, and current mitigation. Preserve evidence before restarting components or clearing state. After recovery, identify which missing signal would have shortened diagnosis and add it deliberately.

**Practice:** A request is slow only when saving a document. Propose a trace span layout and three metrics that distinguish client delay, application processing, database time, and external service latency.

**Connection:** Observability makes causal debugging possible in distributed systems and provides feedback about real production assumptions.
