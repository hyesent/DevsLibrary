# Database Access and the Data Layer

Server Components and Server Actions can call server-only data modules directly. Keep connection strings and privileged database code away from the client module graph. In serverless environments, understand connection pooling and provider limits.

Use a clear layer of functions such as `getBookBySlug` and `saveBookmark`. Add repositories or domain services when they provide meaningful boundaries, consistency, or testability—not merely to rename a database call. Parameterize SQL or use a safe ORM API; use transactions when several writes must succeed together.

Make it clear whether a function returns public, user-specific, or privileged data. Avoid caching personalized results across users. Version migrations and plan compatibility when old and new application instances overlap. For risky schema changes, consider expand-migrate-contract: add compatible schema, backfill, deploy code, then remove obsolete schema after old code no longer depends on it.

**Practice:** Specify the not-found behavior, authorization, query safety, and caching policy of a server-only book lookup.
