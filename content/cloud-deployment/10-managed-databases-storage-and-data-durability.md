# Managed Databases, Storage, and Data Durability

## Learning goals
Choose managed data services deliberately and distinguish replication, backups and durability.

## Keep state out of disposable compute
Application instances may be replaced during scaling, deployment or failure. Store important state in a database or durable object/file store rather than assuming a local container filesystem will survive. A persistent volume can preserve files, but its failure, attachment and backup characteristics depend on the storage service.

## Database choices
A managed relational database may handle infrastructure patching, automated backups and failover, but teams still need to manage schemas, indexes, connection counts, query performance, access controls and recovery testing. Connection pooling matters because autoscaling application instances can create more database connections than the database can handle. Set pool limits and plan for connection storms during restart or failover.

## Replication is not backup
Replication can improve availability and may reduce data-loss windows, but accidental deletion or corrupted writes can replicate too. Backups provide a separate recovery path if they are retained, protected from the same failure or compromised credentials, and tested. Point-in-time recovery (PITR) generally depends on base backups plus a log stream or equivalent provider mechanism; verify the actual retention window and restore granularity.

## Object storage
Object stores are well suited to uploads, static assets, exports and backups. Design for access policies, lifecycle rules, object versioning where needed, upload size limits and safe content handling. Do not assume that an object URL should be public. Use short-lived signed access when appropriate and validate uploaded files before processing them.

## Migrations and compatibility
Database schema changes must coexist with the deployment process. An additive migration—adding a nullable column, deploying code that writes it, backfilling, then enforcing constraints—can be safer than a one-step destructive change. Backups do not make an unsafe migration harmless unless the restore time and data loss are acceptable.

## Practice
For an API with user records and file uploads, specify the database, object store, backup schedule, retention, encryption, access policy, restore test frequency and owner. Then simulate deletion of a production table and an accidental public object policy. Write recovery steps and identify the permissions required to execute them.
