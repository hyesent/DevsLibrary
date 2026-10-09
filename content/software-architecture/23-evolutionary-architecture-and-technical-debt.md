# 23. Evolutionary Architecture and Technical Debt

Architecture changes as the product, workload, team, and operating environment change. Evolutionary architecture treats change as normal and uses feedback to adjust structures while protecting important qualities.

## Technical debt is contextual

Technical debt is a shortcut or design compromise whose future cost is understood or later discovered. Some debt is rational: a prototype may use a simple implementation to test a product hypothesis. Hidden debt is more dangerous when the team does not know the risk, impact, or conditions that make the shortcut expensive.

A useful debt record states the affected area, current impact, likely consequence, trigger for remediation, and an estimate of the cost to address it. “Rewrite this module someday” is not a useful plan without evidence and a decision criterion.

## Refactor in small, safe steps

Large rewrites are risky because they combine behavioral changes, migration risk, and uncertain scope. Incremental refactoring uses tests and observable behavior to change internal structure without changing intended behavior. For data migrations or service extraction, the work may need compatibility phases rather than a single code change.

## Use evidence to revisit decisions

Signals include rising deployment coordination, sustained resource saturation, repeated incidents from shared failure modes, expensive changes across module boundaries, or a new security requirement. Before redesigning, verify that the signal reflects an architectural problem rather than a local bug or missing operational practice.

## Strangler migrations

A strangler approach gradually routes selected capabilities to a new implementation while preserving a stable external interface. It requires careful ownership of data, routing, compatibility, and rollback. Running old and new implementations side by side can introduce dual-write and consistency problems, so the migration must define the authoritative source and reconciliation plan.

## Avoid architecture astronautics

Designing for hypothetical scale can slow delivery and create systems no one can operate. At the other extreme, ignoring known growth or compliance requirements can make later change unnecessarily expensive. Choose a design proportionate to current evidence, and preserve flexibility at boundaries where change is plausible and costly.

## Practice

A monolith's reporting module is becoming slow and frequently blocks releases. Gather evidence to distinguish a query-performance issue, poor module boundary, team-ownership problem, and genuine need for separate deployment. Propose the smallest experiment that could validate the diagnosis.

**Key idea:** evolve architecture in response to evidence, and make the cost and trigger of design compromises explicit.
