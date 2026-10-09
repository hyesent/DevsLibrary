# 2. Requirements and Quality Attributes

Functional requirements describe what a system does. Quality attributes describe how well it must do it under stated conditions. Architecture must support both, because two designs can implement identical features but differ dramatically in reliability, usability, security, and operating cost.

Common quality attributes include availability, latency, throughput, scalability, modifiability, testability, security, privacy, accessibility, interoperability, and recoverability. These attributes can conflict. More replication may improve availability but increase consistency complexity. More abstraction may improve some forms of modifiability while making the code harder to follow.

## Make quality requirements measurable

“Fast” is not a useful target by itself. A better requirement states a workload, a measurement, and a threshold, such as: “For the expected read workload, 95% of requests should complete within 250 ms under normal operating conditions.” The exact target must come from product needs and measurements, not from a universal template.

Specify:
- **Stimulus:** what happens, such as a user submitting a search.
- **Environment:** normal operation, peak load, degraded dependency, or recovery.
- **Response:** what the system does.
- **Measure:** latency, error rate, recovery time, or another observable quantity.

For example: when a payment provider times out, the system must preserve the payment's pending state, avoid creating a second charge on retry, and make the outcome discoverable to an operator.

## Use scenarios to expose trade-offs

A system may need to support ten times its current traffic, restore from a regional outage, add a new identity provider, or export personal data. These scenarios reveal which design decisions matter. Avoid writing a long list of vague adjectives and calling it a quality plan.

## Prioritize, do not maximize everything

It is usually impossible to maximize all qualities at once within a fixed budget. Rank the most important scenarios and state acceptable trade-offs. For a medical alert service, reliable delivery and clear failure handling may dominate visual customization. For an internal reporting tool, analytical correctness and maintainability may matter more than sub-100-ms responses.

## Functional requirements still shape architecture

A feature requiring atomic updates across several records influences transaction boundaries. A requirement to support offline editing affects conflict resolution and synchronization. A requirement for tenant-specific data isolation affects identity, authorization, storage, and tests. Quality attributes are not a separate checklist added after the system is designed; they influence the structure.

## Practice

Write five quality scenarios for a booking system: normal latency, peak traffic, duplicate submission, database outage, and a new payment provider. For each, state the stimulus, environment, expected response, and measurable outcome.

**Key idea:** turn quality adjectives into observable scenarios, then use the highest-priority scenarios to guide design.
