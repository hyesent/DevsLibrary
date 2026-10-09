# PostgreSQL and the Relational Engine

PostgreSQL is an object-relational database server: clients send SQL statements over a connection, the server parses and plans them, and an execution engine reads or changes stored rows. It is not merely a file containing tables. A running server manages concurrent sessions, transactions, indexes, background maintenance, recovery, permissions, and durability.

## The mental model

A **cluster** is one PostgreSQL server data directory managed by a server instance. It can contain multiple databases. A database contains schemas; schemas contain tables, views, sequences, functions, types, and other objects. A table belongs to one schema, and a row is a tuple with typed attributes. Roles represent identities and can own objects or receive privileges.

A common connection string looks like:

```text
postgresql://app_user:secret@localhost:5432/library
```

It identifies a role, password, host, port, and database. Do not put production passwords in source control or logs. In local development, use environment variables or a secret manager and restrict database exposure to trusted networks.

## Create a small working database

```sql
CREATE ROLE library_app LOGIN PASSWORD 'replace-this-locally';
CREATE DATABASE library OWNER library_app;
```

Use a migration or administrator connection to create the role and database. For a real deployment, password handling, role membership, connection limits, and database ownership should be deliberate rather than copied blindly from a tutorial.

Inside `library`, create an application schema:

```sql
CREATE SCHEMA app AUTHORIZATION library_app;
SET search_path = app, public;
CREATE TABLE authors (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

Qualify important objects as `app.authors` in migrations and security-sensitive code. `search_path` is convenient but can create ambiguity if an untrusted role can create objects in a schema searched by privileged code.

## PostgreSQL is more than standard SQL

PostgreSQL supports standard relational features plus extensions such as JSONB, arrays, full-text search, rich index types, range types, and procedural functions. Extensions add capabilities but also introduce deployment and upgrade obligations. Prefer built-in features unless a measured requirement justifies an extension.

## Common misconceptions

- A database server and a database are not the same thing.
- A successful `INSERT` is not automatically durable if the transaction is later rolled back.
- A primary key does not automatically make every query fast; indexes must match access patterns.
- PostgreSQL does not automatically know your business invariants. Constraints and transaction boundaries must express them.

## Trace a request through the system

A typical request travels from the driver to the server process, is parsed and checked against catalogs and privileges, receives a plan, then executes against shared buffers and storage. Changes generate WAL so recovery can replay committed work after a crash. This explains why a query can fail before reading a row (syntax or privilege), spend time planning, wait for a lock, or spend time reading pages. Those are different diagnoses, not one generic “database is slow” problem.

PostgreSQL catalogs are themselves queryable system tables and views. `information_schema` gives a more portable view of metadata; `pg_catalog` exposes PostgreSQL-specific details. Prefer supported catalog views over parsing server files. Remember that visibility of catalog rows may depend on privileges.

## Practice

1. Draw the hierarchy from server cluster to database, schema, table, and row.
2. Create a role that owns application objects, separate from the administrative role.
3. Explain why an application should not connect as a superuser.
4. Inspect `current_database()`, `current_user`, and `version()` from a SQL client.

**Checkpoint:** You can explain where an object lives, which role owns it, and which server/database a connection targets.
