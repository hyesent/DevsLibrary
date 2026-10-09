# Installation, Clients, and Environments

PostgreSQL has a server process and client tools. `psql` is the interactive terminal client; graphical clients are useful for exploration, but repeatable work should still be captured as SQL migrations and scripts. Application drivers speak PostgreSQL's wire protocol and manage connection pooling differently from an interactive shell.

## Verify the server, not just the client

```bash
psql --version
pg_isready -h localhost -p 5432
psql "postgresql://localhost:5432/library" -c 'SELECT version();'
```

`psql --version` proves that a client binary exists. `pg_isready` checks whether a server is accepting connections at the selected endpoint; it does not prove your credentials or target database are correct. A successful authenticated query confirms more of the path.

## Environment separation

Treat development, test, staging, and production as distinct environments. Each should have an explicit connection configuration, appropriate data sensitivity, and a repeatable schema version. Never run a destructive reset script against an ambiguously selected database.

A safe application configuration reads values from the environment:

```text
DATABASE_URL=postgresql://app_user:...@db-host:5432/library
```

Do not print the complete URL in logs: it may contain a password. Log a sanitized host/database identifier if operationally useful. Rotate secrets when exposure is suspected.

## Useful `psql` commands

```text
\conninfo       -- connection details
\l              -- list databases
\dn             -- list schemas
\dt app.*       -- list tables in app schema
\d app.authors  -- describe a table
\x              -- expanded display toggle
\timing         -- show query duration
\q              -- quit
```

Commands beginning with a backslash are `psql` meta-commands, not SQL. They will not run unchanged in every graphical client or through an application driver.

## Troubleshooting by layer

1. **Network:** Is the host resolvable and port reachable? Check firewall, container networking, and whether the server listens on the expected interface.
2. **Server readiness:** Is PostgreSQL running and accepting connections?
3. **Authentication:** Does `pg_hba.conf` allow this connection method, address, database, and role? Does the role have valid credentials?
4. **Authorization:** Can the authenticated role connect to the database and access the schema/object?
5. **Application behavior:** Is the app using the expected environment and connection pool settings?

Avoid changing authentication to `trust` as a general fix. It removes credential checks for matching connections and can expose data. Diagnose the failing layer and apply the narrowest correction.

## Configuration files and service context

The server's effective configuration may combine compiled defaults, configuration files, command-line settings, and values changed with SQL. `SHOW` reports many effective settings; `pg_settings` adds context such as source and whether a restart is required. A setting edited on disk may not be active until reload or restart. Do not assume a successful edit changed the running server.

For containers, distinguish the container's loopback address from the host's loopback address. An application in another container usually connects to the database service name on the shared network, not `localhost`. Keep database ports private unless external access is required, and test connectivity from the application's actual runtime environment.

## Practice

Set up a local database, connect with `psql`, create a table, and connect from a second client. Deliberately use a wrong database name and a wrong password; record how the error differs. Confirm that development configuration cannot accidentally point at production.
