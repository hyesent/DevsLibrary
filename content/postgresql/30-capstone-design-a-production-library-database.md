# Capstone: Design a Production Library Database

This capstone brings together modeling, SQL, transactions, indexes, access control, operations, and testing. Build a database for a digital library where readers browse books, enroll in learning paths, track lesson progress, and bookmark lessons.

## Requirements

- Books have a stable ID, title, slug, publication state, and ordered lessons.
- A lesson belongs to exactly one book and has a stable order within that book.
- Readers can bookmark a lesson and record completion progress.
- Draft books are visible only to authorized editors; published books are visible to readers.
- A reader cannot create duplicate bookmarks for the same lesson.
- Progress updates should be safe when two devices submit overlapping requests.
- The system should report completion rates by book and allow an editor to publish a book safely.

## Proposed relational core

```sql
CREATE TABLE books (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft','published','archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE lessons (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id bigint NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  position integer NOT NULL CHECK (position > 0),
  slug text NOT NULL,
  title text NOT NULL,
  body_markdown text NOT NULL,
  UNIQUE (book_id, position),
  UNIQUE (book_id, slug)
);
CREATE TABLE bookmarks (
  reader_id bigint NOT NULL,
  lesson_id bigint NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (reader_id, lesson_id)
);
CREATE TABLE lesson_progress (
  reader_id bigint NOT NULL,
  lesson_id bigint NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (reader_id, lesson_id)
);
```

Add the readers table and foreign keys according to your identity provider. Do not store an external identity as an unvalidated arbitrary string if the application has a canonical user record. Decide whether archiving a book preserves progress and bookmarks; cascading deletes are not always the right lifecycle policy.

## Queries to implement

1. List published books with lesson counts.
2. Retrieve lessons for one book in deterministic order.
3. Return the current reader's bookmarked lessons for a book.
4. Compute progress per reader and book without double-counting joins.
5. Find draft books whose lessons have duplicate or missing positions before publication.

## Transactions and concurrency

Implement a publish operation that checks required lesson content and changes the book status in one transaction. If validation depends on many rows, decide how concurrent lesson edits are prevented during publishing. A row lock on the book may be a useful coordination point only if every relevant edit path follows the same protocol.

For progress, use an upsert keyed by `(reader_id, lesson_id)` and define whether a later request can clear completion. Make the update semantics explicit rather than letting arrival order accidentally decide business state.

## Index and measure

The unique constraints create indexes for book slug, lesson position/slug within a book, and bookmarks by reader/lesson. Add a separate index only for a demonstrated query pattern, such as retrieving a reader's progress by lesson or a book's published catalog ordering. Capture plans with realistic lesson counts and reader activity.

## Security and operations

Use separate migration and runtime roles. Apply authorization to draft books and reader-specific progress. If RLS is used, test it with the actual runtime role and safe request identity propagation. Configure backups, restore drills, pool limits, and alerts for connection saturation, slow queries, storage growth, and failed migrations.

## Deliverables

- Versioned migrations from an empty database.
- Seed data and integration tests.
- Query plans for catalog and progress queries.
- A transaction/concurrency test for publishing and progress updates.
- A backup-and-restore runbook.
- A short architecture decision record explaining the schema, indexes, authorization model, and operational trade-offs.

**Completion standard:** another developer can recreate the database from migrations, run the tests, understand each invariant, and explain how the service behaves under concurrency and failure.


## Review the design like a production change

Before calling the capstone complete, ask a reviewer to challenge row grain, uniqueness, deletion behavior, historical semantics, transaction boundaries, and permissions. Try invalid writes directly in SQL to prove constraints are real. Use two independent sessions to exercise races. Run the migration chain from an empty database and from the previous schema version.

Then simulate failures: stop the publisher after an outbox insert, interrupt a client after commit, attempt to publish a book while a lesson is being edited, and restore a backup into a clean environment. Document expected behavior and recovery steps. A production design is defined as much by its failure behavior as by its happy-path schema.
