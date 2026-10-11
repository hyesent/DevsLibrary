---
title: "Decomposition and Managing Complexity"
order: 6
book: "problem-solving"
---

Decomposition means splitting a difficult task into parts whose behavior can be understood and tested separately. The objective is not to create the largest number of functions or files. It is to create boundaries that reduce mental load without hiding important interactions.

A useful decomposition follows responsibilities and decisions. For a file import workflow, distinct responsibilities may include reading bytes, decoding text, parsing rows, validating fields, resolving duplicates, writing records, and reporting errors. Each stage has a different failure mode and can have a clear input-output contract.

Avoid splitting purely by arbitrary line count. A function that delegates every line to another function may increase navigation cost without improving understanding. Conversely, one enormous function that mixes parsing, authorization, persistence, retries, and UI messages makes it difficult to identify which responsibility failed.

Use **cohesion** and **coupling** as diagnostics. Cohesion asks whether a module's contents belong together. Coupling asks how much one module depends on another's details. High cohesion and deliberately limited coupling make changes more local. However, zero coupling is impossible and often undesirable: components must collaborate to produce a useful system.

Decomposition requires deciding what information crosses a boundary. Pass the smallest meaningful data required, but do not create dozens of tiny parameters that obscure a coherent concept. A named object can communicate a stable set of related values. A boundary should also define error behavior, ownership, and side effects.

Work top-down to establish major responsibilities, then bottom-up to validate the details. If the pieces cannot be integrated without many special cases, the decomposition is probably wrong. Integration difficulty is evidence about the model, not merely a nuisance to be patched.

**Practice:** Break “users can upload an avatar” into stages. Include file size and type validation, storage, database updates, old-file cleanup, permissions, and failure recovery. Mark which steps must be atomic and which can be asynchronous.

**Connection:** Decomposition underlies functions, modules, services, teams, test boundaries, and system architecture.
