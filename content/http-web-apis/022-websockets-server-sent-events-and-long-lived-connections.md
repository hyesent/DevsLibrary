# 022. WebSockets, Server-Sent Events, and Long-Lived Connections

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 22 of 30

## Learning goals
- Choose a protocol for real-time updates.
- Manage authentication, backpressure, and reconnects.
- Understand that long-lived connections change operational assumptions.

Polling repeatedly asks for updates. Server-Sent Events (SSE) stream server-to-client events over HTTP; WebSockets support bidirectional messaging after an upgrade. Each approach requires reconnect behavior, heartbeat or timeout strategy, and resource limits. SSE is simpler for one-way updates; WebSockets suit interactive two-way communication.

Authenticate connection establishment and authorize every subscribed channel or message action. A connection authenticated once may outlive token validity or permission changes, so define revalidation and revocation behavior. Bound message size and rate, validate every message, and prevent one slow consumer from consuming unbounded memory.

Load balancers and proxies need suitable idle timeouts. Scale-out often requires a shared pub/sub or event distribution layer. Do not assume message delivery is durable; add sequence IDs, replay buffers, or durable messaging when the product requires it.

## Practice
Design a live notification stream. Specify reconnect, event IDs, missed-message recovery, authorization changes, and slow-client behavior.
