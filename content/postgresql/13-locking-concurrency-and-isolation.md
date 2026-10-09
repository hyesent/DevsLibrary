# Locking, Concurrency, and Isolation

Concurrency bugs occur when separate transactions make decisions based on overlapping observations. PostgreSQL uses multiversion concurrency control (MVCC): readers and writers can often proceed without blocking each other, while locks coordinate conflicting changes. MVCC does not eliminate the need to reason about race conditions.

## The lost-update problem

Suppose two requests read a quantity of 10, each subtracts 7 in application memory, and each writes 3. The second write can overwrite the first decision. Avoid read-modify-write logic outside a protected transaction when a single atomic statement can express the change:

```sql
UPDATE inventory
SET quantity = quantity - $1
WHERE sku = $2 AND quantity >= $1
RETURNING quantity;
```

A returned row means the decrement succeeded. No row means the SKU was missing or stock was insufficient; use an additional lookup if the caller must distinguish those cases. The predicate and update happen atomically for the row.

## Row locks

```sql
BEGIN;
SELECT quantity FROM inventory WHERE sku = $1 FOR UPDATE;
-- validate and perform related changes
COMMIT;
```

`FOR UPDATE` locks selected rows against conflicting updates until the transaction ends. Use it when the decision requires reading a row and then doing several coordinated operations. Keep the lock duration short and acquire multiple locks in a consistent order to reduce deadlocks.

## Deadlocks

A deadlock occurs when transactions each hold locks the other needs. PostgreSQL detects deadlocks and aborts one transaction. The application should treat the error as a failed transaction, not continue issuing statements on the aborted transaction. Consistent lock ordering, smaller transactions, and appropriate indexes reduce risk but do not make deadlocks impossible.

## Isolation levels

- **Read Committed:** each statement gets a new snapshot; common and practical for many workloads.
- **Repeatable Read:** transaction reads use a consistent snapshot; write conflicts can still cause errors.
- **Serializable:** strongest serializable behavior, with possible serialization failures requiring whole-transaction retry.

Choosing a higher isolation level is not a universal fix. It can increase retries or reduce concurrency. Define the business invariant first, then choose the simplest mechanism that reliably enforces it: a unique constraint, conditional update, row lock, or serializable transaction.

## Advisory locks

Advisory locks coordinate application-defined resources that may not map neatly to one row. They are cooperative: PostgreSQL does not automatically force every code path to acquire the same advisory lock. Use stable key derivation, define transaction- versus session-level lifetime, and make sure every relevant code path follows the protocol.

## Retry the whole unit of work

A serialization failure or deadlock means the transaction's decisions cannot safely be treated as committed. Roll back and retry the complete transaction, including reads that informed its writes. Retrying only the last failed statement can reuse stale decisions and recreate the original race. Bound retries, add jitter where requests may synchronize, and emit metrics so a rising retry rate is visible as a concurrency problem.

Locking can be tested by opening two independent sessions and coordinating their steps. Record which statement blocks and which transaction releases it. A single-session test will not reveal lock-order cycles or the impact of long-running transactions.

## Practice

Design a seat-reservation flow where two users may try to book the last seat. Compare a conditional update, row lock, and serializable transaction. Include unique constraints where possible, and test concurrent requests rather than only sequential ones.
