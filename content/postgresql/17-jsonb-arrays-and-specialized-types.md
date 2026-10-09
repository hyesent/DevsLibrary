# JSONB, Arrays, and Specialized Types

PostgreSQL supports flexible types for data that does not fit a simple scalar column. These features are useful when the model calls for them, but flexibility can make constraints, indexing, and application behavior less obvious.

## JSON versus JSONB

`json` stores the original JSON text representation; `jsonb` stores a decomposed binary representation optimized for processing and indexing. `jsonb` is usually the default for queryable JSON. It does not preserve insignificant formatting or object-key order, and it should not replace relational columns for core facts that require strong constraints and frequent joins.

```sql
CREATE TABLE events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kind text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

SELECT id, payload ->> 'actor' AS actor
FROM events
WHERE payload @> '{"severity":"warning"}'::jsonb;
```

`->` returns a JSON value; `->>` returns text. A missing key often yields null rather than an error. Validate required keys and value shapes when the data contract demands them.

## Indexing JSONB

A GIN index can support many containment and key-existence queries:

```sql
CREATE INDEX events_payload_gin ON events USING gin (payload);
```

The default GIN operator class and `jsonb_path_ops` have different supported operators and size/performance trade-offs. Index the operators your actual queries use, and remember that broad GIN indexes can increase write costs substantially.

## Arrays

Arrays are convenient for small, naturally grouped values, but they do not automatically enforce foreign-key relationships for each element. If each value has independent identity, lifecycle, permissions, or many-to-many relationships, a join table is usually clearer. Avoid turning arrays into a hidden relational model.

## UUID, range, and network types

UUIDs can be useful for distributed ID generation or avoiding guessable sequential identifiers, though UUIDs are larger than integer keys and random UUID patterns can affect index locality. Range types represent intervals and provide operators for overlap and containment. Network types such as `inet` and `cidr` encode IP addresses and networks with useful validation and operators.

## Full-text search

PostgreSQL full-text search tokenizes documents and supports lexeme matching and ranking. It is different from substring search and external search engines. Choose based on language support, relevance needs, update frequency, and scale. Use a `tsvector` expression or maintained column and a GIN index for common search patterns.

## Flexible documents still need contracts

If a JSONB field becomes central to filtering, joins, permissions, or reporting, consider promoting it to a typed column with constraints. Otherwise every consumer must repeat validation and casts, and malformed values can break queries. A useful hybrid design keeps stable identifiers and frequently queried dimensions relational while storing optional provider-specific details in JSONB.

When evolving JSON structures, version the payload or tolerate old and new shapes during a migration. Backfill in batches, validate shape and counts, and only remove compatibility code after all stored rows have migrated. JSON flexibility shifts some schema work to application code; it does not eliminate schema evolution.

## Practice

Store an event with a few flexible optional attributes but keep actor ID and event type as typed columns. Write a containment query and propose an index. Identify which fields should be promoted from JSON into relational columns as the application matures.
