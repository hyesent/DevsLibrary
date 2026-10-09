# 033. Email, Queues, Background Jobs, and the Outbox Pattern

> Book: PHP · Level: beginner to advanced · Part 33 of 45

# Learning goals
- Move slow or unreliable work out of request handling.
- Design retry-safe background jobs.
- Avoid losing events between database and message delivery.

Email delivery, image processing, report generation, and webhooks may be better handled asynchronously. A job should carry the minimum required identifiers, be versioned when schemas evolve, and be safe to retry. Assume at-least-once delivery unless the queue system explicitly guarantees otherwise; deduplicate or make handlers idempotent.

The dual-write problem occurs when a database commit succeeds but publishing the corresponding message fails, or vice versa. An outbox pattern writes the domain change and an outbox event in one database transaction; a worker publishes pending events and marks them delivered. Consumers still need idempotency.

Define retry limits, backoff, dead-letter handling, monitoring, and operator replay procedures. Never place passwords or bearer tokens in job payloads or logs.

## Practice
Design a job to send a receipt after an order is committed. Explain how duplicate delivery, worker crashes, and failed email providers are handled.
