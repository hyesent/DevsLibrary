# Lesson 5: Data Ownership, Transactions, and Invariants

**Track:** Core Design

## Learning objectives
- Identify invariants that need atomic enforcement
- Choose transaction boundaries
- Avoid relying on application checks alone

## Lesson
### Data models express rules, not only storage

A database schema is part of the system's correctness boundary. Primary keys establish identity; foreign keys preserve references; unique constraints prevent duplicates; check constraints reject invalid values; and transactions group related changes. If two concurrent requests must never reserve the same seat, a preliminary application query is not enough. Both requests can observe availability before either writes. The invariant must be protected by a unique constraint, lock, serializable transaction, or another explicit concurrency strategy.

Treat database constraints as executable documentation. They protect the system even when a new code path, admin script, or future service forgets an application-level check.

### Transaction boundaries should match invariants

A transaction should include the writes that must succeed or fail together. Creating an order and its line items may belong in one transaction. Sending an email generally does not: an email provider cannot join the database transaction, and holding a database lock while waiting on a network request is a poor trade. Instead, commit the business state and a durable event/outbox record together, then deliver the email asynchronously.

Long transactions increase lock duration and contention. Keep network calls out of transactions, use appropriate isolation, and handle serialization or deadlock failures deliberately. Retrying a transaction is safe only if its work is designed to be retried and external side effects are not duplicated.

### Isolation and concurrency anomalies

At weaker isolation levels, concurrent transactions may observe anomalies such as non-repeatable reads or write skew. The right level depends on the invariant and database. A conditional update such as `UPDATE inventory SET quantity = quantity - 1 WHERE id = ? AND quantity > 0` can atomically enforce a simple stock rule; check the affected-row count to know whether the operation succeeded. For more complex invariants, consider explicit locks or serializable isolation and test concurrent cases.

Do not assume local development reproduces production concurrency. Write tests that start competing operations at the same time and assert the invariant after all operations finish.

### Consistency across services

Once data is split across independent services, a single database transaction may no longer cover the full business operation. A saga coordinates steps and compensating actions; it does not magically create a global ACID transaction. A payment may be authorized, inventory reserved, and shipment requested in sequence. If inventory reservation fails after authorization, the workflow needs a release or void action and a durable state machine.

Compensation is not always a perfect inverse. A shipped package cannot be unshipped; a notification cannot be unread. Model the workflow state explicitly and decide which steps are reversible, retryable, or require human intervention.

### Read models and derived data

Derived counts, search indexes, caches, and analytics tables can be useful but may lag behind the source of truth. Document their freshness guarantees. If a UI shows a cached count, decide whether temporary staleness is acceptable. If the count controls whether a scarce item can be sold, it should not be the sole correctness mechanism.

Use reconciliation jobs to detect drift between related systems. Reconciliation is not an admission of failure; it is a practical control for distributed workflows where retries, outages, and partial completion are normal possibilities.

## Worked example

For seat booking, create a unique constraint on `(event_id, seat_id)` in the reservations table. Attempt the insert and map a uniqueness violation to “seat already reserved.” Do not implement `SELECT seat; if empty then INSERT` as the only protection.

## Exercises

1. Name three database constraints that enforce business invariants.
2. Explain why an email should not be sent inside a database transaction.
3. Describe a compensation for a payment authorization when stock reservation fails.

## Solution notes

Use uniqueness, foreign keys, and check constraints where appropriate. Email is an external side effect that can be slow or fail independently; use an outbox and worker. A payment workflow may void or release the authorization and record the compensation outcome.

## Review checklist

- Can I explain: identify invariants that need atomic enforcement?
- Can I explain: choose transaction boundaries?
- Can I explain: avoid relying on application checks alone?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
