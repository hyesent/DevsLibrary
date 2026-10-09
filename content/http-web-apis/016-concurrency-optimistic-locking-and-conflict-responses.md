# 016. Concurrency, Optimistic Locking, and Conflict Responses

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 16 of 30

## Learning goals
- Prevent lost updates.
- Use version fields and conditional writes.
- Model conflicts as part of the API contract.

Two clients can read the same representation and update it independently. Without concurrency control, the later write may silently overwrite the earlier one. Optimistic locking uses a version column or ETag; a write succeeds only if the version still matches the client's expected version.

HTTP conditional requests may use `If-Match` with an ETag. A failed precondition can return 412 Precondition Failed; 409 Conflict can describe a domain conflict. Choose and document the policy. The client should know whether to reload, merge, or ask the user to resolve the conflict.

Database transactions and constraints remain necessary. Application-level “check then write” logic is vulnerable to races unless the check and write are atomic or protected. For important workflows, define invariants and test simultaneous requests.

## Practice
Design an API for editing a shared document. Simulate two clients editing version 7 and show how the second write is prevented from silently overwriting the first.
