# 024. SQL Transactions, Concurrency, and Data Integrity

> Book: PHP · Level: beginner to advanced · Part 24 of 45

# Learning goals
- Use transactions to preserve invariants.
- Understand race conditions and database constraints.
- Make retries and idempotency deliberate.

A transaction groups database operations into an atomic unit. A typical flow begins a transaction, performs reads and writes, commits on success, and rolls back on failure. Transactions do not automatically solve every race: isolation levels, row locks, unique constraints, and conditional updates matter.

For example, checking stock and then decrementing it in separate unprotected steps can oversell under concurrency. Use a conditional update such as decrementing only when available stock is sufficient, check affected rows, and enforce database constraints as a final guardrail.

Retries are safe only when the operation is designed for them. A transaction may fail due to deadlock; retry the whole transaction with bounded backoff when appropriate. External side effects such as sending email should not be casually performed inside a transaction because the database cannot roll them back. Use an outbox or post-commit workflow for reliable integration.

## Practice
Model a money transfer or inventory decrement. State its invariants and test concurrent attempts.
