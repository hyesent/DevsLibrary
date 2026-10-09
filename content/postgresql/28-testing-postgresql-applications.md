# Testing PostgreSQL Applications

Database tests should verify semantics and concurrency, not just that SQL executes. Mocked repositories can be useful for fast unit tests, but they cannot prove PostgreSQL constraint behavior, SQL syntax, isolation semantics, or query plans.

## Test against PostgreSQL

Use a disposable PostgreSQL instance or isolated test database that matches the production major version and required extensions. Run migrations from an empty database, seed known fixtures, and clean up deterministically. Avoid sharing mutable test databases between parallel tests unless each test has a safe isolation strategy.

## Test constraints and boundaries

Test invalid foreign keys, duplicate unique values, nulls in required columns, negative quantities, and delete behavior. Verify both application error mapping and database enforcement. A rule tested only through one endpoint may still be bypassed by another write path.

## Test transactions and races

Concurrency tests need multiple independent connections. To test the final inventory unit, start two transactions that attempt to claim it and assert that at most one succeeds. Sequential tests cannot expose a race that depends on overlap. Use barriers or explicit coordination rather than sleeps where possible.

## Test migrations

Run the entire migration chain against an empty database and test upgrades from a representative previous version with realistic data volume. Validate rollback or forward-recovery procedures. For lock-sensitive migrations, measure execution and blocking on a production-like copy.

## Property and invariant tests

State properties that must always hold: order totals equal the sum of line totals under the chosen pricing rules, inventory never becomes negative, one active membership exists per key, and idempotency keys do not create duplicate operations. Property-based tests can generate combinations that hand-written examples miss.

## Test query performance carefully

Performance tests need representative data size and distribution, not a table with five rows. Plans vary with statistics, cache, and parameter values. Prefer regression budgets and measurements over asserting an exact plan text that may change between PostgreSQL versions.

## Keep test setup deterministic

Tests that depend on current time, random IDs, or uncontrolled concurrent order can be flaky. Use fixed timestamps, explicit IDs where appropriate, and isolated schemas/databases. A rollback-per-test strategy is fast for many tests but does not work unchanged when code opens separate connections or commits independently. Choose cleanup based on actual transaction behavior.

Run migration tests in CI and include at least one upgrade test from the previous released schema. When testing performance, assert a reasonable latency envelope on controlled data rather than requiring an exact planner node that may legitimately change after an engine upgrade.

## Practice

Write tests for a transfer transaction, duplicate order request, and last-item inventory race. Include failure injection for a connection interruption and document which outcomes can be retried safely.
