# 12. Audit Logs and Event Modeling

Audit records answer questions such as who changed a sensitive field, what changed, when it changed, and through which process. Business events answer what happened in the domain: payment captured, package shipped, membership revoked. The two overlap but have different purposes.

## Design audit records intentionally

A useful audit record may include:
- Actor identity or service identity.
- Action and affected entity.
- Timestamp and correlation/request identifier.
- Relevant before/after values or a safe change summary.
- Source channel and outcome.
- Reason or approval reference when required.

Avoid blindly copying whole rows into logs. Audit data may contain passwords, tokens, personal information, or payment details. Use field allowlists, redaction, retention policies, access controls, and tamper-resistance appropriate to the threat model. A log is not trustworthy merely because it is stored in a table.

## Events should describe facts

Prefer `PaymentCaptured` to a vague `PaymentUpdated` when the event represents a completed business fact. Event names should have stable semantics and distinguish commands (requests to do something) from events (something that happened). A command can fail; an event should describe an outcome that has occurred.

Events may be immutable records, but corrections still happen. A financial correction is often represented by a compensating event rather than rewriting history invisibly. The exact pattern depends on the business domain and legal requirements.

## Current state and event history

A practical design may store a current `payment` row and append payment events. The current row supports ordinary application reads; the event table supports audit and investigation. If both contain overlapping information, define which is authoritative, update them transactionally where possible, and implement reconciliation. If an event must be published to a message broker, a transactional outbox can avoid committing database state while losing the corresponding publication intent.

## Idempotency and duplicates

Distributed systems can deliver the same message more than once. Give events stable IDs and define deduplication rules. A consumer may record processed event IDs under a unique constraint so retrying the same message does not apply the effect twice. Idempotency is not just an API header; it is a data-modeling decision about identity, retention, and the meaning of repeated requests.

## Practice

Design audit and domain-event records for a bank-transfer workflow. Do not store secrets. Identify the actor, correlation ID, business event, status transition, and idempotency key. Explain how an investigator can distinguish a retry from a second legitimate transfer.

**Key idea:** audit history, business events, and current state serve different purposes; model their authority and privacy boundaries explicitly.
