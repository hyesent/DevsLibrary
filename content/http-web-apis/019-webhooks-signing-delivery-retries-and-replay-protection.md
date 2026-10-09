# 019. Webhooks: Signing, Delivery, Retries, and Replay Protection

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 19 of 30

## Learning goals
- Build reliable webhook producers and consumers.
- Verify authenticity and integrity.
- Handle duplicates, reordering, and delayed events.

A webhook is an outbound HTTP request triggered by an event. Producers should sign a canonical byte sequence—commonly including a timestamp and raw body—using a secret and a well-defined HMAC scheme. Consumers must verify the signature over the exact raw bytes before parsing and use constant-time comparison where appropriate. Never invent a signature scheme without careful review.

Timestamps and replay windows limit old-message replay, but consumers still need event IDs and deduplication because legitimate retries are common. Delivery should use bounded retries, exponential backoff, and a dead-letter or operator-replay process. Events can arrive out of order; include event time and resource version or fetch the current resource if required.

Acknowledge quickly after durable acceptance. Do slow processing asynchronously. Rotate signing secrets with an overlap period where practical and never log the secret.

## Practice
Design a signed webhook for `order.paid`, including signature headers, timestamp, event ID, retry policy, deduplication, and secret rotation.
