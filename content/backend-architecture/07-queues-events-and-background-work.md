# Lesson 7: Queues, Events, and Background Work

**Track:** Core Design

## Learning objectives
- Move long-running work out of request paths
- Design idempotent consumers
- Distinguish commands from events

## Lesson
### When work should leave the request

An HTTP request is a poor place to perform a long export, send a batch of messages, resize many images, or wait for a slow third-party service. The client connection may close, platform timeouts may terminate execution, and retries can repeat side effects. A background queue allows the API to validate and persist a job, return a job identifier, and let a worker perform the work under a separate timeout and concurrency policy.

Not every task belongs in a queue. A simple read that must return immediately should not be made asynchronous just to appear scalable. Use background work when latency, durability, retry policy, or workload isolation justify it.

### Commands, events, and delivery guarantees

A command asks a component to do something: `GenerateInvoice`. An event states that something happened: `InvoiceGenerated`. Commands normally have an intended handler; events may have multiple subscribers. Clear naming prevents consumers from treating a request for action as a historical fact.

Queue systems commonly provide at-least-once delivery. That means a message can be delivered more than once, especially after a worker completes an effect but crashes before acknowledging the message. Exactly-once claims are usually scoped to a specific broker operation and do not guarantee exactly-once external side effects. Design consumers to be idempotent.

### Idempotency and durable job state

Give each job a stable ID and track states such as queued, running, succeeded, failed, and cancelled. A worker should be able to recognize repeated delivery. For database work, a unique job-effect record or conditional state transition can prevent duplicate application. For an external provider, use its idempotency mechanism if available and persist the provider's operation ID.

Retries need classification. A transient network error may be retried with exponential backoff and jitter. Invalid input is usually permanent and should go to a dead-letter queue or terminal failed state. Retrying a permanent error wastes capacity; retrying a non-idempotent action can cause harm.

### The transactional outbox

Suppose an API writes an order to the database and then publishes `OrderCreated` to a broker. If the database commit succeeds but publishing fails, downstream systems never learn about the order. If the event is published first and the transaction rolls back, consumers hear about an order that does not exist. The outbox pattern writes the business change and an outbox row in the same database transaction. A relay publishes the row later and marks it delivered.

The relay itself can publish twice if it crashes after sending but before recording success, so consumers still need idempotency. The outbox solves the dual-write gap; it does not remove every distributed-systems failure.

### Operations: backlog, poison messages, and ordering

Monitor queue depth, oldest-message age, processing duration, retry counts, dead-letter volume, and worker saturation. A growing backlog may mean insufficient workers, slow downstream dependencies, a poison message, or a sudden traffic spike. Increasing concurrency without limits can overwhelm the database or provider.

Ordering is not free. If all messages for one account must be ordered, partition by account or use a serial processing strategy for that key. Global ordering can severely reduce throughput. Define whether ordering is required and at what scope.

## Worked example

An API creates an export job row and returns `202 Accepted` with `/jobs/{id}`. A worker claims the job, generates the file, stores it, and marks the job complete. The client polls the status endpoint. Retries use the same job ID, and the worker never trusts a client-supplied path as an output location.

## Exercises

1. Explain why a queue consumer must tolerate duplicate delivery.
2. Draw the outbox flow from database commit to event consumer.
3. Define retry rules for timeout, invalid payload, and rate-limit response.

## Solution notes

At-least-once delivery and crash windows can duplicate messages. The outbox transaction stores business data plus event intent; a relay publishes and consumers deduplicate. Timeout may be retried, invalid payload should fail permanently, and rate limiting should respect provider guidance such as `Retry-After` with bounded backoff.

## Review checklist

- Can I explain: move long-running work out of request paths?
- Can I explain: design idempotent consumers?
- Can I explain: distinguish commands from events?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
