# 13. Relational and Document Models

Relational databases organize data into tables with explicit relationships and constraints. Document databases commonly store a record with nested objects or arrays. Neither model is universally superior. The right choice depends on the shape of the domain, transaction boundaries, query patterns, consistency requirements, and operational capabilities.

## Embedding versus referencing

A document such as a product page might embed a small set of display settings that are read and updated with the product. Embedding can reduce read round trips and keep an aggregate together. But if the nested data grows without bound, is independently updated, or must be queried across many parents, embedding can create large writes and awkward indexing.

Referencing stores related records separately and links them by identifier. This supports independent lifecycle and reuse, but queries may require joins or multiple requests, and referential integrity may be weaker or implemented differently depending on the database.

Ask:
- Is the child bounded in size?
- Is it normally read and written with the parent?
- Can it be independently shared or authorized?
- Does it need global queries?
- What happens when the parent is deleted?
- Which atomicity guarantees does the database provide?

## Relational JSON columns

A relational database may support JSON columns for flexible or semi-structured attributes. This can be useful for provider payloads, optional metadata, or fields whose shape genuinely varies. It should not become an excuse to hide stable, heavily queried domain relationships inside an opaque blob.

If a field must be unique, joined, validated, indexed, and reported on routinely, a typed relational column or related table may be clearer. JSON schema validation in application code is not automatically enforced by the database unless you add suitable constraints or validation mechanisms.

## Duplication and consistency

Document models often duplicate data to make reads efficient. That creates a propagation problem: if a customer's display name is copied into many order documents, decide whether old orders should preserve the name at purchase time or reflect current profile data. The answer is a domain rule, not merely a database preference.

## Polyglot persistence

A system may use a relational database for transactions, object storage for files, a search index for full-text search, and a cache for fast repeated reads. Each additional store adds synchronization, backup, security, and operational cost. Avoid introducing multiple data technologies without a concrete requirement and an owner for consistency.

## Practice

For a course platform, decide where to store lesson content, enrollment records, user profiles, and uploaded videos. Justify each choice based on lifecycle, access pattern, consistency, and scale—not on popularity of a database product.

**Key idea:** choose storage shape based on the unit of consistency, access patterns, and lifecycle of the data.
