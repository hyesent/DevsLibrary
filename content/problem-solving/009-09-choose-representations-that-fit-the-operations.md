---
title: "Choose Representations That Fit the Operations"
order: 9
book: "problem-solving"
---

A data representation is not neutral. It determines which operations are simple, which are expensive, and which invalid states are easy to create.

Imagine storing a collection of unique usernames. A list preserves order and allows duplicates unless extra checks are added. A set expresses uniqueness directly, though it may not preserve the order your interface requires. A database table with a unique constraint protects the rule even when two requests arrive concurrently. Each representation provides a different level of guarantee.

Choose based on operations and invariants, not fashion. Ask which actions dominate: lookup, insertion, deletion, ordering, range queries, aggregation, or synchronization. A representation optimized for reads may make writes expensive. An in-memory cache may improve latency but introduce invalidation and consistency problems.

Distinguish **identity** from **position**. An array index identifies a location that may change when items are inserted. A stable ID identifies an entity across sorting and pagination. Using position as identity is a common source of UI state bugs and data corruption.

Distinguish **absence** from **empty value**. `null`, an empty string, zero, and an empty collection may mean different things. Collapsing them without a contract can lose information. Likewise, money should not casually use binary floating-point if exact decimal arithmetic or integer minor units better fit the domain.

Representation also includes units and encoding. A number might mean bytes, milliseconds, cents, or a count. A timestamp might be an instant or a local wall-clock time. Name units explicitly and normalize at boundaries.

**Practice:** Design a representation for inventory quantities with products, locations, reservations, and stock movements. Explain how it prevents overselling and how it records history.

**Connection:** This reasoning links algorithms to type design, relational modeling, serialization, API schemas, and distributed consistency.
