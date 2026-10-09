# Roles, Privileges, and Row-Level Security

Database security should follow least privilege: each role receives only the access needed for its job. A role that can connect is not automatically allowed to read every table, and a role that owns a table has powers that ordinary grants do not convey.

## Separate ownership from runtime access

A common pattern uses a migration/owner role for schema changes and a runtime role for application queries. The runtime role should not be a superuser and usually should not own the tables it accesses. Grant only required operations:

```sql
GRANT CONNECT ON DATABASE library TO library_runtime;
GRANT USAGE ON SCHEMA app TO library_runtime;
GRANT SELECT, INSERT, UPDATE ON app.orders TO library_runtime;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app TO library_runtime;
```

Default privileges can govern objects created in the future, but they are tied to the role that creates those objects. Test grants using the actual runtime role, not only as an administrator.

## Row-Level Security

Row-level security (RLS) can restrict which rows a role may see or change:

```sql
ALTER TABLE app.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY document_owner_policy ON app.documents
  USING (owner_id = current_setting('app.user_id')::bigint)
  WITH CHECK (owner_id = current_setting('app.user_id')::bigint);
```

This is an illustration, not a complete authentication design. The application must set identity context safely on each transaction/connection, prevent untrusted callers from choosing arbitrary identity values, and account for connection pooling. Policies should be tested for SELECT, INSERT, UPDATE, and DELETE paths. Table owners and roles with bypass privileges may bypass RLS unless configured appropriately.

## SQL injection and dynamic SQL

Use parameterized statements. If dynamic identifiers are needed, use driver-supported identifier escaping and allowlist acceptable names. In PL/pgSQL, `EXECUTE` requires careful construction; quoting a value as an identifier is different from binding a value parameter.

## Secrets, TLS, and network access

Restrict network exposure, require encrypted connections where appropriate, rotate credentials, and avoid logging secrets. Authentication rules in `pg_hba.conf` are evaluated in order, so a broad earlier rule can shadow a later narrow one. Use supported authentication methods and test from the actual network path.

## Audit and verification

Review role memberships, grants, default privileges, public schema permissions, and security-definer functions. Test both allowed and denied access. A security policy that is not tested can silently fail open after schema changes.

## Connection pooling changes identity assumptions

With pooled connections, session settings can leak between requests unless they are reset or scoped to a transaction. If RLS relies on a custom setting for user identity, set it transaction-locally and ensure every query executes inside that transaction. A missing identity should deny access rather than fall back to a privileged default. Test the exact pooling mode and role privileges used in production.

Review object ownership separately from grants. Owners can alter or drop objects and may bypass RLS; runtime roles should not own tables simply because they need to write rows. Periodically test denied operations as well as successful ones.

## Practice

Create a runtime role that can read published articles but cannot update them. Then create an owner-specific policy for private drafts and test access as two separate application identities.
