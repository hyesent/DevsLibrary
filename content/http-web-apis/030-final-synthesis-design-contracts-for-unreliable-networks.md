# 030. Final Synthesis: Design Contracts for Unreliable Networks

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 30 of 30

## The durable mental model
An API is more than a list of routes. It is a set of observable contracts across unreliable networks, concurrent actors, evolving clients, and imperfect dependencies.

For every operation, define:
1. **Identity:** who is calling?
2. **Authority:** may they act on this resource?
3. **Input:** what is valid, bounded, and normalized?
4. **Semantics:** what does the method mean, and is retry safe?
5. **State:** which invariants and concurrency rules must hold?
6. **Representation:** what shape and encoding are returned?
7. **Failure:** which status and error contract applies?
8. **Capacity:** how are time, memory, request size, and concurrency bounded?
9. **Security:** which trust boundaries and abuse cases matter?
10. **Operations:** how is the API monitored, deployed, upgraded, and recovered?

A mature API makes important behavior explicit, documents compatibility, tests failure paths, and does not rely on clients guessing. Build small contracts, preserve them intentionally, and treat every external input and dependency as a potential source of uncertainty.
