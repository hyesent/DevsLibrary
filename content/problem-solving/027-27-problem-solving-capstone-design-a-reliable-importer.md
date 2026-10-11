---
title: "Capstone: Design a Reliable Importer"
order: 27
book: "problem-solving"
---

Design a service that imports user-provided CSV files into an existing application. The importer must handle malformed rows, duplicate records, large files, retries, partial failure, and unauthorized attempts. The purpose is to practice the entire reasoning process rather than jump directly to code.

**Frame the requirements.** Define accepted encodings, maximum file size, required columns, duplicate policy, atomicity policy, user-visible progress, and retention of uploaded files. Ask whether a failed import must leave no changes or may commit valid rows with a report. That choice changes the architecture.

**Model the workflow.** Represent an import job with states such as `uploaded`, `validating`, `ready`, `processing`, `completed`, `completed_with_errors`, and `failed`. Define legal transitions and which actor can initiate or inspect them. Give each job an owner and an idempotency identity.

**Decompose the pipeline.** Separate byte upload, decoding, parsing, row validation, normalization, duplicate resolution, persistence, and result reporting. Bound memory use by streaming or processing chunks. A parser must correctly handle quoted delimiters, escaped quotes, embedded newlines, and malformed records; splitting each line on commas is not a CSV parser.

**Define data guarantees.** Choose whether duplicates are detected within the file, against existing records, or both. Use database constraints to protect uniqueness under concurrent imports. Decide what happens if the client retries after the server commits but before the response arrives. A durable job record and idempotent processing can prevent duplicate effects.

**Plan failures.** A worker may crash after writing some rows. If all-or-nothing behavior is required, use a transaction only if its size and duration are safe, or stage validated rows and commit them in a controlled phase. If partial success is allowed, record per-row outcomes and make retries skip already-applied operations safely.

**Protect the boundary.** Enforce ownership on every job read and cancellation request. Limit file size, row count, processing time, and concurrent jobs. Treat filenames and cell contents as untrusted. Avoid exposing internal database errors in downloadable reports, and prevent spreadsheet formula injection when users open exported error reports.

**Verify.** Test empty files, malformed quoting, huge fields, duplicate IDs, encoding errors, permission failures, concurrent retries, worker crashes, and storage outages. Include property tests for normalization and idempotency tests that repeat the same job.

**Operationalize.** Measure queue depth, processing duration, failure categories, and retry counts. Keep logs free of secrets and sensitive row contents. Define how stuck jobs are detected and safely resumed.

**Deliverables:** a one-page requirements note, a state diagram, a data model, API contracts, a test matrix, a threat model, and a rollout plan. Your design is complete only when it explains not just the happy path but what happens when each boundary fails.

**Reflection:** Which assumptions did you initially overlook? Which invariants protect the system most strongly? Which decisions would you revisit if files grew from thousands to hundreds of millions of rows?
