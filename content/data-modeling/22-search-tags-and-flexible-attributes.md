# 22. Search, Tags, and Flexible Attributes

Tags, categories, and user-defined fields are common sources of modeling shortcuts. A comma-separated `tags` string seems simple, but it becomes hard to validate, search, rename, count, and enforce permissions consistently as requirements grow.

## Relational tags

A typical model uses a tag table and a junction table between the tagged entity and tag. A uniqueness constraint prevents the same tag from being attached twice. If tags are tenant-specific, enforce tenant scope in keys or constraints. Decide whether tags can be deleted, merged, renamed, or reused after deletion.

Tags are often many-to-many and may have relationship attributes such as who added the tag and when. If tag assignment needs an audit trail, model that explicitly.

## Categories versus tags

A category often represents a controlled taxonomy with rules such as one primary category per product or a hierarchical parent-child structure. Tags are usually more flexible and may be user-created. These are tendencies, not universal definitions; document the semantics.

Hierarchical categories require care. A parent foreign key alone does not prevent cycles. Queries may use recursive common table expressions, materialized paths, closure tables, or database-specific hierarchy support. Choose based on update patterns and descendant-query needs.

## Flexible attributes

An entity-attribute-value (EAV) model stores attributes as rows, often with separate typed value tables or a type discriminator. It supports highly dynamic schemas but complicates validation, uniqueness, reporting, and indexing. Queries that ask for several attributes can require self-joins or aggregation. Avoid EAV for stable fields merely to avoid migrations.

JSON fields can be a more natural choice when flexible properties are usually read as a document and have limited cross-record constraints. A hybrid model is often practical: stable, high-value fields are typed columns; optional extensions live in a constrained flexible structure.

## Search indexes

Full-text search, fuzzy matching, and faceting may require a specialized index or search service. Search results can be stale relative to the transactional database. Decide whether a result can be eventually consistent and how updates, deletes, and access controls propagate. Never assume hiding a result in the UI is enough to enforce authorization on the underlying record.

## Practice

Model tags for articles, a hierarchical category taxonomy, and custom fields for organization-defined assets. Identify which fields deserve typed columns and which genuinely need flexibility.

**Key idea:** flexibility has a cost; keep stable domain facts explicit and define lifecycle rules for tags and custom attributes.
