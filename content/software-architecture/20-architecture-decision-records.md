# 20. Architecture Decision Records

An Architecture Decision Record (ADR) captures a consequential design decision, its context, alternatives, and consequences. ADRs help future maintainers understand why a system has its current shape and which assumptions may need revisiting.

## A useful ADR format

A concise ADR usually includes:
- **Title and status:** proposed, accepted, superseded, or rejected.
- **Context:** the problem, constraints, and quality attributes.
- **Decision:** what will be done and the scope of the decision.
- **Alternatives:** credible options considered and why they were not selected.
- **Consequences:** benefits, costs, risks, and operational implications.
- **Follow-up:** how the decision will be validated and when it should be reviewed.

Record the decision, not every detail of the meeting. An ADR should make the reasoning discoverable without becoming a transcript.

## Focus on decisions that matter

Examples include choosing a modular monolith over microservices, selecting a primary database, defining a service ownership boundary, choosing an event-delivery pattern, or setting a data retention strategy. Not every library choice needs an ADR. Use judgment: record decisions that are costly to reverse, affect multiple teams, or encode important constraints.

## Capture trade-offs honestly

An ADR should not pretend the chosen option has no downside. If the team chooses asynchronous processing, record the user-visible pending state and operational monitoring required. If it chooses a monolith, record the expected scaling and ownership constraints that would trigger reconsideration.

## Superseding decisions

Do not silently rewrite history when a decision changes. Mark the old ADR as superseded and link the new decision. This preserves the reasoning path and helps distinguish a deliberate change from an accidental inconsistency.

## Decisions should be revisitable

An ADR is not a lifetime guarantee. Record signals that would justify revisiting it, such as sustained queue lag, repeated cross-team deployment conflicts, or a changed regulatory requirement. Review decisions when those signals occur, not on an arbitrary calendar alone.

## Practice

Write an ADR for choosing a modular monolith for a new course platform. Include constraints, alternatives, why the decision fits the current team, downsides, and measurable conditions that could justify extracting a service later.

**Key idea:** ADRs preserve the reasoning and trade-offs behind important choices so the architecture can evolve deliberately.
