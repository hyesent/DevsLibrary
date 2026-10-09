# Lesson 23: Architecture Decision Records and Safe Evolution

**Track:** Practice

## Learning objectives
- Record decisions without writing novels
- Make trade-offs visible
- Revisit decisions using evidence

## Lesson
### What belongs in a decision record

An architecture decision record (ADR) should capture a meaningful choice that affects structure, quality attributes, operations, or future change cost. Include title, status, context, decision, alternatives considered, consequences, and revisit triggers. The context explains the problem; the decision states what will be done; consequences explain both benefits and costs.

An ADR is not a substitute for implementation documentation. It records why the team chose a direction so future maintainers do not repeat the same debate without understanding the original constraints.

### Compare alternatives fairly

Compare realistic options against the same criteria. For example, compare a queue, synchronous HTTP call, and scheduled batch for sending notifications using latency, durability, retry behavior, complexity, and cost. Do not make the preferred option look good by comparing it to a deliberately weak alternative.

Record uncertainty. “We expect traffic to remain below 100 RPS” is an assumption, not a fact. Give it a source and a threshold that would cause a review.

### Architecture fitness functions

A fitness function is an automated or repeatable check that guards an architectural property. Examples include a test that forbids a domain module from importing HTTP controllers, a budget for maximum bundle size, a test that all public endpoints have authentication metadata, or a load test for a critical invariant. These checks help prevent architecture from decaying as the codebase grows.

Do not automate a rule that is vague or routinely produces false positives. A useful fitness function is understandable, actionable, and tied to a real risk.

### Evolution and migration paths

Architecture changes should be staged when possible. Introduce an interface before extracting a service, add new schema before removing old schema, or dual-read during a controlled data migration. Define how to compare old and new behavior and how to stop the rollout. Big-bang migrations can be justified, but they require strong rollback, rehearsal, and ownership.

Technical debt is not simply old code. It is a trade-off with a cost that should be visible. Some debt is rational when it buys learning quickly; dangerous debt is hidden, unbounded, or tied to critical correctness assumptions.

### A review cadence

Review major decisions after incidents, substantial workload changes, a new compliance requirement, a team-ownership change, or repeated friction in deployment. Avoid reviewing every ADR on an arbitrary calendar if nothing has changed. The goal is to keep decisions aligned with evidence rather than preserve an architecture because it was once chosen.

## Worked example

ADR-014: Keep webhook processing asynchronous. Context: provider delivery deadline is short and downstream billing can be slow. Decision: verify and persist events synchronously, then process via a durable queue. Alternatives: process all work in the request or schedule periodic polling. Revisit if event volume or provider constraints change materially.

## Exercises

1. Write an ADR for choosing a modular monolith.
2. Propose two fitness functions for a multi-tenant API.
3. Name three events that should trigger an architecture decision review.

## Solution notes

Include context, decision, alternatives, consequences, and revisit triggers. Fitness functions can test tenant scoping and enforce dependency boundaries. Incidents, workload changes, compliance changes, and ownership shifts are good review triggers.

## Review checklist

- Can I explain: record decisions without writing novels?
- Can I explain: make trade-offs visible?
- Can I explain: revisit decisions using evidence?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
