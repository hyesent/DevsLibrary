# Background Jobs, Schedulers, and Event Delivery

## Learning goals
Deploy asynchronous work reliably and avoid duplicate or lost business operations.

## Separate user requests from long work
A web request should not remain open indefinitely while generating a report, processing a large file or waiting on a slow third-party system. A queue or job system lets the API accept work and return a job identifier while a worker processes it. This improves responsiveness but requires status tracking and user-visible failure handling.

## Delivery guarantees
Many practical queues provide at-least-once delivery: a message can be delivered again if acknowledgement is lost or a worker crashes. Design consumers to be idempotent—processing the same logical job twice should not duplicate its effects. Exactly-once behavior across arbitrary systems is difficult; often it is implemented as idempotent processing plus deduplication and transactional boundaries.

## Retry and poison messages
Retry transient failures with backoff and a maximum policy. A permanently invalid message should not retry forever and block progress. Use dead-letter queues or equivalent quarantine, preserve diagnostic context safely, and define who investigates and how replay is authorized. Replaying a job may repeat side effects, so the idempotency design must cover replay too.

## Scheduled jobs
Scheduled tasks can overlap if one run takes longer than the interval or if multiple instances start the scheduler. Use distributed coordination or a platform scheduler when appropriate, and make the task safe to retry. Store progress for long-running jobs so a process restart does not require starting from scratch.

## Observability
Track queue depth, oldest-message age, processing duration, retry count, failure rate and worker saturation. A queue can be technically healthy while the backlog grows beyond the business deadline. Alert on age and throughput, not just whether the worker process is alive.

## Practice
Design an export job for a library platform. Define the queue message, job status lifecycle, retry policy, idempotency key, maximum runtime, cancellation behavior, access permissions and retention of generated files. Decide how an operator can replay a failed job without accidentally emailing or billing a user twice.
