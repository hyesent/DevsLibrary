# 003. Methods and Their Semantics: Safety and Idempotency

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 3 of 30

## Learning goals
- Choose methods based on intended semantics.
- Distinguish safe from idempotent operations.
- Design retry behavior around those semantics.

GET retrieves a representation and is defined as safe: clients should not use it to request a state-changing action. HEAD is like GET but asks for response metadata without the response content. POST commonly submits data or invokes an operation. PUT creates or replaces the state of a target resource and is idempotent by HTTP semantics. PATCH applies partial modifications; idempotency depends on the patch semantics. DELETE requests removal and is defined as idempotent in its intended effect, even if responses differ between attempts.

Idempotent means repeating the same request has the same intended effect on server state. It does not mean every response must be identical. A client can lose a response after the server commits a change; retrying a non-idempotent operation can duplicate work. Use idempotency keys for suitable operations such as payment creation, with a defined key scope, retention period, payload matching policy, and replay response.

Do not put state changes behind GET endpoints. Crawlers, prefetchers, caches, and link previews may issue GET requests unexpectedly.

## Practice
Choose methods for listing orders, replacing a profile, changing one field, creating a payment, and deleting a comment. Explain retry risks for each.
