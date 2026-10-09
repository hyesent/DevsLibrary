# Lesson 15: Edge Function Reliability: Webhooks, Retries, and Idempotency

**Track:** Edge Computing

## Learning objectives
- Handle duplicate webhook deliveries safely
- Bound retries and timeouts
- Build observable and recoverable function workflows

## Lesson
### Assume webhook delivery is at least once

Payment, repository, messaging, and commerce providers commonly retry webhook deliveries when they do not receive an accepted response. The same event may arrive more than once, arrive out of order, or be delivered after a long delay. Verify the signature over the exact raw body required by the provider before trusting the event. Parsing and reserializing JSON before signature verification can change the bytes and invalidate the signature.

Persist a provider event ID or another stable deduplication key with a uniqueness constraint. A process-local set is not durable and will not coordinate across concurrent instances. Decide whether the endpoint acknowledges immediately after durable receipt and processes asynchronously, or processes synchronously within a strict deadline.

### Idempotency is an end-to-end property

A handler is not idempotent just because it checks a cache before doing work. Two concurrent deliveries can both pass the check. Use a database uniqueness constraint, atomic insert, or conditional state transition. Record the event's processing state and outcome so a retry can distinguish “already completed” from “currently processing” and “failed, safe to retry.”

If the handler calls an external API, use that provider's idempotency mechanism where possible. A crash can occur after the external effect succeeds but before your database records success. Durable state, stable operation IDs, and reconciliation are needed to recover from this ambiguous window.

### Timeouts, retries, and asynchronous handoff

A webhook provider may expect a quick acknowledgement. If processing can exceed the provider's deadline, validate and durably store the event, enqueue work, and return success only after the handoff is durable. Do not return success and then rely on an in-memory promise to finish later unless the platform explicitly guarantees that lifecycle. Background execution capabilities vary by provider and must be verified.

Retry transient failures with bounded backoff and jitter. Do not endlessly retry malformed or permanently unauthorized events. Preserve failed payloads only as long as necessary and redact sensitive fields. A dead-letter workflow should let an operator inspect, replay, or discard a failed event with audit history.

### Observability and correlation

Log provider event ID, internal operation ID, request ID, outcome, duration, and retry count. Avoid logging raw signatures, tokens, or full payloads by default. Track accepted events, duplicate deliveries, signature failures, processing failures, queue age, and time to completion. A spike in signature failures may indicate configuration drift or an attack; a growing queue may indicate a broken downstream dependency.

Alert on user impact and stuck work rather than every individual transient failure. Document a replay procedure and make it safe to run twice.

### Production readiness

Before release, test valid and invalid signatures, duplicate delivery, concurrent duplicate delivery, out-of-order events, database outage, downstream timeout, provider retry, and recovery after a worker crash. Verify that one logical event produces one logical effect. Also test key rotation and provider secret changes. A function is not production-ready merely because the happy-path curl command succeeds.

## Worked example

For a `payment.succeeded` webhook, verify the signature against the raw body, insert `(provider, event_id)` into a table with a unique constraint, and create a durable processing job in the same transaction. If the event ID already exists, return the documented acknowledgement without charging or granting the entitlement twice.

## Exercises

1. Explain why an in-memory deduplication map is unsafe.
2. List failure points between receiving a webhook and completing its side effect.
3. Design five tests for a signed webhook endpoint.

## Solution notes

Instances may restart or run concurrently, so local memory is not durable or shared. Failure points include before verification, after persistence, before enqueue, during downstream call, after downstream success, and before recording completion. Test valid signature, invalid signature, duplicate, concurrent duplicate, and downstream timeout/retry.

## Review checklist

- Can I explain: handle duplicate webhook deliveries safely?
- Can I explain: bound retries and timeouts?
- Can I explain: build observable and recoverable function workflows?
- Can I describe one failure mode and how I would detect it?
- Can I justify the trade-off in terms of requirements rather than fashion?
