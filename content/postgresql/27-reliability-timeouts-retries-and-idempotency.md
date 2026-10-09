# Reliability: Timeouts, Retries, and Idempotency

Reliable database applications assume that operations can fail in partial and ambiguous ways. A network error does not always mean the server did nothing; a timeout can occur after the transaction committed but before the response arrived. Retry behavior must be designed around those possibilities.

## Bound work

Set limits for connection acquisition, lock waits, statement execution, and total request time. A timeout should produce a controlled failure and release resources. A client timeout alone may leave server-side work running, so configure appropriate server/driver behavior and cancellation.

## Retry only when safe

Serialization failures and deadlocks commonly require retrying the entire transaction, because the previous attempt was aborted. Use bounded retries with jitter to avoid synchronized retry storms. Do not retry a transaction after an arbitrary exception unless you understand whether it committed and whether its side effects are idempotent.

## Idempotency keys

For a payment or order-creation API, store a client-supplied idempotency key with a unique constraint and the final operation result. The request handler claims the key and performs the business write in the same transaction, so concurrent duplicates cannot both create independent operations. Define how to handle a duplicate key with a different request body; rejecting it is usually safer than returning an unrelated prior result.

## Outbox pattern

A database transaction cannot atomically commit both a PostgreSQL row and an external message broker or HTTP call without a distributed transaction protocol. The outbox pattern writes the business state and an event row in one database transaction. A worker later publishes pending events and marks them delivered. Delivery may be repeated, so consumers should be idempotent and events need stable IDs.

## Circuit breakers and backpressure

When the database is overloaded, allowing every incoming request to queue can make recovery harder. Use bounded pools, request admission limits, deadlines, and graceful overload responses. Circuit breakers can reduce repeated attempts against a failing dependency, but they must not mask persistent data integrity problems.

## Exactly-once is an end-to-end property, not a database switch

A unique key can ensure one stored operation per idempotency token, but the surrounding workflow must still define request hashing, response replay, expiry, and concurrent duplicate behavior. If a client retries after a timeout, return the prior outcome for the same logical request rather than creating a second side effect. If the same token arrives with a different payload, reject it and log the mismatch.

For outbox delivery, mark work complete only after the publisher's acknowledgement policy is satisfied. A crash between publish and marking the row can cause duplicate delivery, which is why consumers need stable event IDs and deduplication.

## Practice

Design a retry policy for an order endpoint. Classify unique violations, validation failures, deadlocks, serialization errors, and connection loss after commit. Explain which cases are retried, which are returned to the caller, and how idempotency prevents duplicates.
