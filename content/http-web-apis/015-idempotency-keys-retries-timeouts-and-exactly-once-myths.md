# 015. Idempotency Keys, Retries, Timeouts, and Exactly-Once Myths

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 15 of 30

## Learning goals
- Design APIs for unreliable networks.
- Make retry behavior safe for state-changing requests.
- Understand the limits of “exactly once.”

A client may send a request, the server may commit it, and the response may be lost. The client cannot infer from a timeout whether the operation happened. Idempotency keys allow a client to label a logical operation so repeated submissions can return the original result rather than create duplicates.

A robust design scopes keys to an authenticated principal and operation, stores a request fingerprint, defines retention, and rejects reuse with a different payload. Coordinate key storage with the operation's database transaction; otherwise the key record and business write can diverge. Concurrent requests with the same key must be serialized or handled safely.

Set connection and total timeouts. Use bounded retries with exponential backoff and jitter for transient failures. Do not blindly retry non-idempotent operations. “Exactly once” is usually an end-to-end application property approximated through deduplication, idempotency, transactions, and reconciliation—not a magic network guarantee.

## Practice
Design a payment-creation endpoint with idempotency, concurrent duplicate submissions, timeout recovery, and a safe replay response.
