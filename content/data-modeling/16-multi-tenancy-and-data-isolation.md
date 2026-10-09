# 16. Multi-Tenancy and Data Isolation

A multi-tenant application serves multiple organizations or customers from one service. Its data model must make tenant ownership clear and help prevent one tenant from reading or modifying another tenant's data. Tenant isolation is a security property, not just a query convention.

## Common strategies

- **Shared tables with tenant keys:** many tenants share the same tables; rows include `tenant_id`.
- **Separate schema per tenant:** tenants share a database server but use distinct schemas.
- **Separate database per tenant:** each tenant has an isolated database.
- **Separate infrastructure:** stronger operational isolation for particular regulatory or scale needs.

Each strategy trades off isolation, cost, migrations, operations, and cross-tenant reporting. Shared tables can be efficient but require disciplined access control. Separate databases can reduce some blast radius but do not automatically solve identity, backups, or operational mistakes.

## Composite tenant-aware references

If IDs are only unique within a tenant, model that explicitly. If global IDs are used, tenant scope can still be included in uniqueness constraints to ensure related records cannot accidentally cross boundaries. A composite foreign key can enforce that an order and its customer share the same tenant, rather than relying solely on application code.

Conceptually:

```sql
CREATE TABLE customer (
  tenant_id BIGINT NOT NULL,
  id BIGINT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY (tenant_id, id)
);

CREATE TABLE orders (
  tenant_id BIGINT NOT NULL,
  id BIGINT NOT NULL,
  customer_id BIGINT NOT NULL,
  PRIMARY KEY (tenant_id, id),
  FOREIGN KEY (tenant_id, customer_id)
    REFERENCES customer (tenant_id, id)
);
```

This example uses tenant-scoped composite keys. A system with globally unique IDs may choose a different physical design, but it should still enforce tenant-consistent relationships where needed.

## Row-level security

Some database engines support row-level security (RLS), allowing policies to restrict visible or writable rows. RLS can provide defense in depth, but it depends on correct policy definitions, session context, privileges, and connection-pool handling. Test with the actual application role, not only an administrator that bypasses policies. Do not assume RLS is enabled simply because the database supports it.

## Background jobs and tenant context

Jobs, exports, analytics, support tools, and administrative endpoints are common isolation failure points. Every data-access path must establish the correct tenant scope. Global admin access should be explicit, audited, and tightly controlled. Avoid relying on an untrusted client-supplied tenant ID without verifying that the authenticated principal has access to it.

## Practice

Review a schema with `tenant`, `user`, `project`, and `task`. Show how a task's project reference can be constrained to the same tenant. List the read paths and background jobs that need isolation tests.

**Key idea:** make tenant boundaries enforceable in the data model and verify them across every access path.
