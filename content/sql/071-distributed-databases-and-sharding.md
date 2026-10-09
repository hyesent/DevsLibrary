---
title: "Distributed databases and sharding"
order: 71
book: "sql"
---

The central idea is **Distributed databases and sharding**. When one database stops being enough, sharding keys, cross-shard operations, consistency tradeoffs, and why distribution increases complexity. SQL becomes much easier to reason about once you stop treating statements as isolated commands and instead see them as transformations over relational state. A useful question throughout this lesson is: *what set of facts does this statement read, what set of facts does it produce, and which database rules constrain the transition?*

### Mechanics

Consider a realistic system where distributed databases and sharding affects customers, orders, accounts, or application state. The useful question is not only what SQL syntax expresses the operation, but what rows are represented before and after it, what invariants must remain true, and what the database must do when the operation competes with another transaction.

For example, a query such as:

```sql
SELECT ...
FROM ...
WHERE ...;
```

should be read semantically before it is read syntactically. Identify the source relation, the predicate that selects facts, the projection that chooses what is returned, and any operation that changes cardinality. When joins, grouping, windows, or subqueries appear, explicitly identify what one intermediate row represents. This habit prevents a large class of SQL bugs because most surprising results are surprises about row meaning rather than punctuation.

### What can go wrong

SQL often permits a statement that is syntactically valid but semantically wrong. A missing join predicate can create a Cartesian product. A `LEFT JOIN` followed by a `WHERE` condition on the nullable right side can accidentally behave like an inner join. A `COUNT(*)` over a one-to-many join can count child combinations rather than parent entities. An `UPDATE` without the intended predicate can change every row. A query that appears fast on ten thousand rows can become unusable at ten million because its access path scales differently.

These are not random gotchas. They follow from the underlying model. If you know what a relation contains, what each row means, and how an operator changes that shape, the failure becomes predictable.

### A concrete design exercise

Suppose an application stores customers and orders. Before writing SQL, state the invariants in plain language: every order belongs to one customer; a customer may have many orders; an order's total must satisfy whatever business rule the system requires; deleting a customer must have an explicitly chosen consequence. Then encode the structural rules with keys and constraints, and use queries to ask questions over those facts.

For a read operation, first write the desired result in words: “one row per customer, showing customers who placed at least one order during the period.” That sentence immediately suggests an important distinction: joining customers to orders produces one row per matching order, while the requested output is one row per customer. `EXISTS`, `GROUP BY`, or a distinct relational stage may therefore be more appropriate than blindly joining and deduplicating afterward.

### Architecture reflex

The architecture reflex for this topic is to separate three layers: the meaning of the data, the SQL statement that expresses the intent, and the database mechanisms that execute and protect that intent. At production scale, also ask where the responsibility belongs. Constraints protect invariants that must hold regardless of which application path performs a write. Application code owns workflows and user-facing decisions. Transactions protect a business operation's atomic boundary. Indexes support known access patterns. The query optimizer chooses an execution strategy. Mixing these responsibilities creates fragile systems.

### Connection to the next ideas

This lesson should connect naturally to the surrounding database model. Schema design determines the facts available to query. Keys and constraints define legal states. Queries describe how to derive information. Transactions govern state transitions. Indexes change the cost of obtaining the same logical result. Security determines who may observe or modify those facts. Production architecture determines what happens when scale, failure, and deployment enter the picture.

The goal is not to memorize one preferred SQL style. The goal is to be able to look at a schema and a query and reason from first principles about **meaning, correctness, cardinality, concurrency, and cost**.
