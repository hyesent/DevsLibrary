# 11. Event-Driven Architecture

Event-driven architecture uses events to communicate that something happened. Producers publish events; consumers react to them, often asynchronously. This can reduce direct dependencies and allow multiple consumers to respond independently, but it introduces delivery, ordering, duplication, and observability concerns.

## Commands, events, and queries

A command requests an action, such as `CancelOrder`. It may be rejected. An event records a fact, such as `OrderCancelled`, that has already occurred. A query asks for information. Confusing these concepts leads to contracts that are hard to reason about, especially when several services are involved.

Events should include a stable event ID, event type/version, occurrence time, relevant entity identity, and enough context for consumers to process them safely. Avoid putting unnecessary personal or secret data into broadly distributed messages.

## Delivery semantics

A broker may deliver messages more than once. Consumers should be designed for duplicate delivery where the platform does not guarantee otherwise. A common strategy records processed event IDs under a unique constraint and commits that record with the business effect. “Exactly once” claims must be interpreted within the precise boundaries of a broker, transaction, and consumer; they rarely mean every external side effect occurs exactly once across the whole system.

## The dual-write problem

Suppose an application commits an order to a database and then publishes `OrderPlaced`. If the database commit succeeds but publication fails, consumers never learn about the order. If publication happens first and the database commit fails, consumers see an event for an order that does not exist.

The transactional outbox pattern writes the order and an outbox record in one local transaction. A separate publisher delivers the outbox record and marks it sent. Delivery may still be repeated, so consumers need idempotency. The pattern closes the database-versus-message-intent gap without requiring a distributed transaction.

## Ordering and evolution

Events can arrive late or out of order. Include sequence/version information where consumers need to detect stale updates. Event schemas evolve; define compatibility rules and test old and new consumers. Avoid assuming the event timestamp alone establishes a total order across distributed producers.

## Observability

Track publication lag, consumer lag, retry counts, dead-letter queues, and processing failures. A message that is accepted by a broker but never processed is not a successful business outcome. Operators need a safe replay and repair process.

## Practice

Design an `OrderPlaced` event for a system that updates inventory and sends a receipt. Define duplicate handling, schema evolution, failure monitoring, and how an operator replays a failed event without double-decrementing stock.

**Key idea:** asynchronous events decouple timing, but correctness depends on idempotency, durable publication intent, and operational visibility.
