# 13. Data Consistency and Distributed Transactions

Consistency describes which states and observations a system promises as operations occur. The term has several meanings in computing, so be specific: database constraint consistency, read-after-write behavior, replica freshness, and consistency across independent services are different concerns.

## Local atomicity

A database transaction can make a group of operations atomic within the database's supported transaction boundary. It can protect invariants across rows and prevent partial commits. It does not automatically include an HTTP call to a payment processor or a message broker.

## Cross-service workflows

When a workflow spans independent services, there is often no practical single transaction covering every participant. One approach is a **saga**: a sequence of local transactions with explicit continuation and compensation behavior. A compensation is a business action that counteracts a prior action where possible; it is not always a perfect rollback.

For example, a travel booking may reserve a seat, authorize payment, and issue a ticket. If ticket issuance fails, the workflow may release the seat and void or refund payment. These actions can fail too, so the saga needs persistent state, retries, timeouts, and reconciliation.

## Eventual consistency

An eventually consistent projection may lag behind the authoritative write model. This is acceptable for some dashboards and search results, but may be unacceptable for claiming the last seat or confirming a payment. Identify which reads can be stale and for how long. If a user must immediately see their own change, consider a read-your-writes strategy or return the committed result directly.

## Idempotency

A retry-safe operation has the same intended effect when repeated with the same idempotency key. Persist the key and the outcome for an appropriate retention period, and scope it to the actor or operation to avoid collisions. Define what happens if the same key is reused with a different request body. An idempotency key alone does not help unless the effect and result are recorded consistently.

## Reconciliation

Distributed workflows need ways to compare internal state with providers and repair ambiguous outcomes. Reconciliation can detect a payment captured externally while the local system still says pending. It should be designed as a normal reliability mechanism, not a last-minute script written only after an incident.

## Practice

Design a purchase workflow that reserves inventory and captures payment. Identify the authoritative state for each step, the saga transitions, compensation actions, idempotency keys, and reconciliation queries. Explain which user-visible states can be temporarily pending.

**Key idea:** cross-service consistency is a workflow and recovery problem, not just a database transaction setting.
