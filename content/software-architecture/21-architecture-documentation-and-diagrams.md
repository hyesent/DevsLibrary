# 21. Architecture Documentation and Diagrams

Architecture documentation should help a reader answer concrete questions: what exists, who owns it, how it communicates, where data is stored, which decisions constrain change, and how the system behaves when dependencies fail. A diagram that is visually polished but ambiguous does not accomplish this.

## Use multiple views

Different diagrams answer different questions:
- **System context:** users and external dependencies.
- **Container/runtime view:** major applications, data stores, and communication paths.
- **Component view:** responsibilities inside a bounded part of the system.
- **Sequence diagram:** the order of interactions for a specific workflow.
- **Deployment view:** runtime placement and failure domains.
- **Data-flow or trust-boundary view:** sensitive data movement and security boundaries.

Do not try to fit every view into one enormous diagram. Choose the smallest view that answers the question.

## Label arrows meaningfully

Show protocol or interaction type where relevant, such as synchronous HTTPS request, asynchronous event, or database transaction. Label important data ownership and trust boundaries. A line that simply says “connects to” may hide whether a caller waits for a response or whether data is copied asynchronously.

## Keep diagrams synchronized

Outdated diagrams are worse than missing diagrams when people rely on them for incident response or security review. Keep diagrams near the code or documentation they describe, assign ownership, and include updates in change reviews. Where practical, generate parts of deployment documentation from infrastructure definitions, while still documenting semantic relationships that generated output cannot explain.

## Avoid diagram-as-proof

A diagram cannot prove that a database constraint exists, a security policy is enforced, or a failover works. Link important design claims to implementation, tests, runbooks, or decision records. Use diagrams to communicate structure, not to replace executable verification.

## Practice

Create four views for a booking workflow: system context, component boundaries, sequence for creating a booking, and deployment topology. Mark the point at which the booking becomes committed, when payment outcome can be ambiguous, and which telemetry connects the steps.

**Key idea:** documentation should answer specific questions and remain traceable to the actual implementation.
