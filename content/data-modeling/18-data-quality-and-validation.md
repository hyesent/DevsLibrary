# 18. Data Quality and Validation

A technically valid row can still be factually wrong. Data quality includes accuracy, completeness, consistency, uniqueness, timeliness, and fitness for a particular use. A model should make quality expectations explicit and support detecting violations.

## Validation layers

- **Type and domain constraints:** prevent values outside a defined type or range.
- **Relational constraints:** primary keys, foreign keys, uniqueness, and checks.
- **Application validation:** context-dependent rules and helpful user feedback.
- **Cross-system validation:** reconciliation against external sources or business records.
- **Monitoring:** detect trends, anomalies, missing data, and unexpected distributions.

Validation should happen as close to the authoritative data as practical, but not every rule belongs in a single layer. A form can tell a user that a date is invalid; the database must still prevent invalid data from being committed through other entry points.

## Avoid weak constraints

A `CHECK (status IN ('new', 'done'))` prevents misspellings but may not enforce valid state transitions. If a task may move from `new` to `in_progress` to `done`, but never directly from `done` back to `new`, transition rules require controlled updates or another mechanism. Similarly, a check on a single row cannot always enforce a rule involving other rows.

## Imports and messy source data

Imports need a strategy for malformed values, duplicates, missing references, and partial failure. A staging table can preserve raw input and record validation outcomes before merging into production tables. Do not silently discard invalid rows without reporting them. Keep source identifiers and import batch IDs where they help trace and repair errors.

## Reconciliation

If a system stores both detailed transactions and an aggregate balance, reconcile them. If a search index mirrors database records, measure indexing lag and detect missing documents. If a payment provider is the source of payment settlement truth, compare provider reports with internal records. Reconciliation is especially important when data crosses transaction boundaries or external systems.

## Quality metrics

Examples include:
- Percentage of records missing a required attribute.
- Duplicate rate for a defined business key.
- Number of broken references detected in imported data.
- Time from source change to downstream availability.
- Difference between transaction-derived and stored aggregate totals.

Metrics should have owners and action thresholds. A dashboard that shows a worsening quality score without an escalation or repair process is incomplete.

## Practice

Design an import for course enrollments from a spreadsheet. Include staging, validation, duplicate handling, error reporting, safe retry, and a reconciliation report. Decide what happens when the same file is submitted twice.

**Key idea:** quality needs enforceable rules, observability, ownership, and repair—not just validation at the user interface.
