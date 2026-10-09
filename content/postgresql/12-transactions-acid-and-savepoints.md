# Transactions, ACID, and Savepoints

A transaction groups statements into one logical unit. It either commits its changes or rolls them back. Transactions are the foundation for preserving invariants across multiple writes, especially when requests overlap.

## Explicit transaction

```sql
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;
```

This transfers value atomically only if the application checks that the first update actually matched a row and that the balance rule is enforced. A transaction does not automatically make an incorrect algorithm correct. Add constraints and appropriate concurrency control.

## ACID in practical terms

- **Atomicity:** all transaction changes take effect or none do.
- **Consistency:** constraints and application invariants remain satisfied across committed states.
- **Isolation:** concurrent transactions are controlled so they do not observe or create unacceptable interference.
- **Durability:** committed changes survive failures according to the server's durability configuration and storage guarantees.

Durability is not a substitute for backups. Backups and recovery drills protect against accidental deletion, corruption, operator mistakes, and broader failures.

## Rollback and savepoints

```sql
BEGIN;
UPDATE inventory SET quantity = quantity - 1 WHERE sku = 'A' AND quantity > 0;
SAVEPOINT after_inventory;
-- optional additional work
ROLLBACK TO SAVEPOINT after_inventory;
COMMIT;
```

A savepoint lets a transaction undo work after that point without discarding all earlier work. It is not a replacement for careful transaction design. In application code, ensure every error path either rolls back or returns the connection to a clean state before it is reused.

## Transaction boundaries in applications

Keep transactions short. Do not hold locks while waiting for a user, calling a slow external API, or streaming a large response. Long transactions can block other work and prevent vacuum from reclaiming old row versions. If an external side effect must be coordinated with a database write, consider an outbox pattern rather than trying to make an HTTP call part of a database transaction.

## Read Committed and repeatable reads

PostgreSQL's default isolation level is Read Committed: each statement sees a snapshot of data committed before that statement began. Two reads in one transaction can see different committed states. Repeatable Read provides a stable transaction snapshot but may still require careful reasoning about concurrent writes. Serializable detects executions that cannot be explained by a serial order and may abort a transaction; applications must be prepared to retry the whole transaction.

## Keep external effects outside the transaction

A transaction can roll back database writes, but it cannot undo an email already sent or a payment request accepted by an external provider. Calling external services while holding database locks also lengthens the transaction and makes failure handling harder. Prefer committing an intent record (often an outbox row) and processing the external action separately with idempotency.

Be aware of implicit transactions in clients and frameworks. Autocommit means each standalone statement is normally its own transaction; a multi-statement business operation needs an explicit transaction or a framework-managed unit of work.

## Practice

Implement a transfer with a nonnegative-balance invariant. Test insufficient funds, missing account IDs, and concurrent transfers. Identify which checks belong in SQL constraints, which belong in transaction logic, and which errors should be retried.
