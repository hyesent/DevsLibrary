# Application Integration and Safe SQL

The application-to-database boundary should make parameterization, transaction handling, pooling, and error recovery routine. A database driver is not merely a way to send strings; it is responsible for binding values, converting types, managing connection state, and exposing errors to the application.

## Parameterized queries

Use driver parameters for values:

```sql
SELECT id, email FROM app.customers WHERE email = $1;
```

The driver sends the query and values separately according to its API. Do not concatenate untrusted values into SQL. Parameters cannot replace identifiers such as table names or sort directions; map user choices to a strict allowlist of known identifiers.

## Transaction lifecycle

When using a pool, always return a connection in a clean state. If a statement fails inside a transaction, PostgreSQL marks the transaction as aborted until rollback or rollback to a savepoint. A connection returned to the pool with an open transaction can retain locks and snapshots, affecting unrelated requests.

Use a structured `try/finally` or equivalent driver pattern: acquire connection, begin transaction if needed, commit on success, rollback on failure, and release in every path. Do not swallow rollback failures without logging and retiring a potentially unsafe connection.

## Type mapping

Be explicit about timestamp zones, numeric precision, JSON serialization, UUID formats, and large integer handling. Some languages cannot exactly represent every PostgreSQL `bigint` in their default number type. Driver defaults may map `numeric` to strings to preserve precision. Know the behavior rather than silently rounding identifiers or monetary values.

## Error classification

PostgreSQL reports SQLSTATE codes. Applications should classify errors by meaning: unique violation, foreign-key violation, serialization failure, deadlock, connection failure, and so on. Do not retry every error. A validation or permission error will not become successful after retry; a serialization failure may require retrying the whole transaction.

## Retries and idempotency

A connection can fail after the server commits but before the client receives confirmation. The application may not know whether the operation committed. For operations that must not duplicate, use idempotency keys and a transactionally stored result or unique constraint. Retry policy must distinguish “known not committed” from “outcome unknown.”

## Type conversion is part of correctness

A JavaScript number cannot exactly represent every integer above its safe-integer range. If a PostgreSQL `bigint` is used as an identifier, choose a driver mapping that preserves it, such as a string or a bigint-capable type, and serialize it consistently in APIs. Similarly, do not convert exact `numeric` money values to binary floating point unless the application has a deliberate precision strategy.

Map database errors to stable application errors without returning raw SQL, schema names, or sensitive values to end users. Keep detailed diagnostics in restricted logs and include a request correlation ID so the error can be investigated.

## Practice

Implement a create-order endpoint that uses parameters, validates references through constraints, writes the order and lines in one transaction, and returns the new order ID. Design behavior for duplicate idempotency keys, a lost connection after commit, and serialization errors.
