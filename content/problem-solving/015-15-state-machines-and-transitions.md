---
title: "State Machines and Transitions"
order: 15
book: "problem-solving"
---

A state machine models a system as a set of states and allowed transitions triggered by events or conditions. It is useful whenever behavior depends on history, not only on the current input.

An order might move through `draft`, `submitted`, `paid`, `shipped`, `delivered`, or `cancelled`. A transition such as `paid -> shipped` is legal only after payment is confirmed. If every status can change to every other status, invalid transitions become easy to create.

Define:
- states and their meanings;
- events that may cause transitions;
- guards or preconditions;
- side effects;
- failure transitions;
- terminal states;
- invariants that must hold in each state.

Avoid representing a complex lifecycle as unrelated booleans such as `isPaid`, `isShipped`, `isCancelled`, and `isRefunded`. Four booleans permit sixteen combinations, many nonsensical. A state model can make legal combinations explicit, though real domains may need a richer model when payment and fulfillment progress independently.

The state machine should be enforced at the right boundary. UI buttons can hide invalid actions for usability, but the server must validate transitions because clients can be modified or requests replayed. Database constraints and transactions may be needed when concurrent requests race to perform a transition.

Distributed workflows introduce uncertainty. A request may time out after the server commits the change. The caller does not know whether the transition happened. Idempotency keys, status queries, durable event records, and retry-safe operations help resolve this ambiguity.

**Practice:** Model a password-reset token lifecycle. Include issued, used, expired, and revoked behavior. State whether reuse is rejected and how concurrent submissions are handled.

**Connection:** State machines connect to UI flows, API design, workflow engines, event-driven systems, and security protocols.
