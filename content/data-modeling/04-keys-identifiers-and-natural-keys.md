# 4. Keys, Identifiers, and Natural Keys

A key identifies a row or a candidate for identification. A **primary key** is the candidate key selected as the table's main identifier. A **foreign key** links a row to a referenced key. Choosing keys affects correctness, integrations, index size, privacy, and how difficult records are to merge.

A key should be unique and non-null. A primary key should also be stable: changing it can require updates across every referencing record and every external system that stores it.

## Natural and surrogate keys

A natural key comes from the domain, such as an ISO country code or a legally defined identifier. A surrogate key is assigned primarily to identify a record, such as a generated integer or UUID.

Natural keys can be meaningful and avoid an extra identifier, but real-world identifiers sometimes change, are corrected, are not globally unique, or contain privacy-sensitive information. Email addresses are poor primary keys for most user tables: people change email, addresses can be recycled, and the address may be exposed in URLs or logs.

Surrogate keys decouple internal identity from mutable business attributes. They do not remove the need for business uniqueness. A table with `id` as its primary key may still need `UNIQUE (tenant_id, external_code)`.

## Integer IDs and UUIDs

Generated integers are compact, easy to index, and convenient for local relational data. Sequential IDs can reveal approximate insertion volume if exposed publicly, and distributed generation may need coordination.

UUIDs support decentralized generation and make accidental collisions extremely unlikely when generated correctly. They use more storage than a 32-bit integer and generally require larger indexes; random UUIDs can also produce less-localized index writes than time-ordered identifiers. UUID versions and database implementations have different properties, so choose deliberately rather than assuming every UUID is equally ordered or private.

Neither integers nor UUIDs are authorization mechanisms. An unguessable identifier does not prove that a user is allowed to access the corresponding record. Every request still needs an access-control check.

## Composite keys

A composite key consists of multiple columns. A junction table such as `enrollment(student_id, course_id)` may use both columns as its primary key if each student can enroll in a course only once. If re-enrollment history is required, the key might need an enrollment ID or include a distinct attempt/term dimension. The right key depends on the business rule.

Composite unique constraints remain valuable even when a surrogate primary key exists. They encode rules such as “one active membership per person and organization” where supported by the database's constraint features.

## Referential integrity

Foreign keys protect relationships from pointing to nonexistent records. Decide what should happen when a referenced record is deleted. `RESTRICT`/`NO ACTION` may prevent deletion; `CASCADE` propagates it; `SET NULL` removes the relationship when the column permits nulls. Cascades are useful for dependent records but dangerous when applied casually to business history. Understand the exact semantics of your database engine.

## Practice

Design keys for users, orders, order lines, and products. Identify the primary key for each table, at least one business uniqueness rule, and the foreign keys. Explain what should happen if a product is discontinued or a user account is deactivated.

**Key idea:** separate stable identity from business uniqueness, and treat foreign-key behavior as a deliberate policy.
