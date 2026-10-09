# Patterns for Async Work: Retry, Idempotency, and Outbox

## Scope
These are distributed application patterns and reliability techniques, not all classic object-oriented design patterns. They matter because many application designs must coordinate work across networks and process boundaries.

## Retry carefully
Retry can help with transient failures, but repeating a request may repeat its effect. Use bounded attempts, backoff, jitter where appropriate, and a deadline. Retry only errors that are plausibly transient and only when the operation is safe to repeat or protected by idempotency.

## Idempotency
An operation is idempotent when repeating it with the same effective input has the same intended effect as performing it once. For a payment request, an idempotency key can allow a server to recognize retries and return the original outcome. The server must store and scope keys correctly; a client-generated key alone provides no guarantee.

## Transactional outbox
A service may need to update a database and publish an event. Writing to the database and then publishing can fail between the two actions. A transactional outbox writes the business change and an event record in the same database transaction; a separate publisher sends pending records. Consumers still need duplicate handling because publication can be repeated.

## Sagas and compensation
A saga coordinates a sequence of local transactions and defines compensating actions when later steps fail. Compensation is not a universal rollback: a refund, for example, is a new business operation and may itself fail or be delayed.

## Design lesson
Patterns at this level address failure across boundaries. A class diagram cannot guarantee delivery, exactly-once effects, or transactionality. Specify the persistence boundary, retry policy, idempotency key, and recovery process.

## Summary
Retries, idempotency, outbox, and saga techniques are complementary reliability tools. Choose them based on actual failure modes and document their guarantees precisely.
