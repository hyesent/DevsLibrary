# Lesson 1: What Backend Architecture Actually Solves

**Track:** Foundations

## Learning objectives
- Distinguish architecture from framework choice
- Connect requirements to design decisions
- Recognize quality attributes and constraints

## Lesson
### Start with the system, not the stack

Backend architecture describes the important structures and rules that let a service meet its goals as it changes. It includes request flows, data ownership, trust boundaries, deployment units, failure handling, and the ways components communicate. It is not synonymous with choosing Express, Fastify, Django, Spring, or a cloud provider. Two systems built with the same framework can have radically different architectures because their data boundaries and failure policies differ.

Begin by asking what the system must do, who uses it, what data it protects, how much traffic it expects, how quickly it must respond, and what happens when dependencies fail. A small booking API with strict double-booking prevention has different architectural pressure from a read-only public catalogue, even if both serve the same number of requests.

### Functional and quality requirements

Functional requirements describe observable capabilities: create an account, reserve a seat, publish a lesson, or issue a refund. Quality attributes describe how well those capabilities must work: latency, availability, durability, privacy, auditability, maintainability, and cost. Quality requirements need measurable targets. “Fast” is not actionable; “95% of normal reads complete in 200 ms at the expected load” is a starting point.

Constraints are different again. A small team, a fixed hosting platform, an existing relational database, a data residency rule, or a two-week deadline can make a theoretically elegant solution impractical. Architecture is the act of making these constraints explicit and choosing trade-offs deliberately.

### Use scenarios to expose design pressure

Write a short scenario for each critical quality attribute. Example: “During a payment-provider timeout, the API must not charge a customer twice when the client retries.” This immediately raises questions about idempotency keys, provider references, durable state, timeout policy, and reconciliation. Another scenario might be: “A compromised public endpoint must not expose the service-role database credential.” That makes secrets, authorization boundaries, logs, and deployment configuration architectural concerns rather than afterthoughts.

For each scenario record the stimulus, operating condition, expected response, and how you will measure success. A scenario is useful when it can influence a design or a test.

### Architecture decisions should be reversible when possible

Some choices are cheap to change: a local helper function, a module name, or an internal response formatter. Others are expensive: splitting a database across services, committing to a vendor-specific workflow engine, or exposing a public API contract used by many clients. Make expensive decisions with evidence, and delay them when uncertainty is high. This is not an excuse to avoid decisions; it is a reason to identify which decisions are hard to reverse.

A decision record should state the context, decision, alternatives, consequences, and revisit trigger. For example, “We will keep the first release as a modular monolith because one team owns the domain and independent scaling is not yet required. Revisit when deployments block each other or measured load isolates a module as a bottleneck.”

### A practical first architecture document

For a small service, a useful first document can fit on a few pages: system purpose and actors; critical use cases; data entities and ownership; request and background-job flows; trust boundaries; external dependencies; reliability targets; deployment shape; and the largest known risks. Include a context diagram and one sequence diagram for the riskiest operation. Avoid diagrams that merely decorate the document without explaining behavior.

Keep the document close to the code and update it when decisions change. Architecture documentation is not a prediction of every future requirement; it is a shared model of the decisions that currently matter.

## Worked example

A course platform has public lesson reads, authenticated progress writes, instructor publishing, and a nightly export. Treat these as separate flows because their authorization, latency, and failure requirements differ. Public reads may be cached; progress writes need ownership checks and durable confirmation; publishing needs validation and audit history; exports belong in a background workflow rather than holding an HTTP request open.

## Exercises

1. Write three measurable quality scenarios for a booking API.
2. List two constraints that could change your architecture and explain how.
3. Create a one-page decision record for choosing a modular monolith for the first release.

## Solution notes

A strong answer distinguishes user-visible behavior from implementation preference. For the retry scenario, include a measurable duplicate-charge target, an idempotency mechanism, and a recovery path. For the monolith decision, state the conditions that would cause you to revisit it.

## Review checklist

- Can I explain: distinguish architecture from framework choice?
- Can I explain: connect requirements to design decisions?
- Can I explain: recognize quality attributes and constraints?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
