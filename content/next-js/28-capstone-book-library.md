# Capstone: Build a Book Library

Build a library app with public catalogue pages and private reading progress.

Routes: `/`, `/books`, `/books/[slug]`, `/sign-in`, `/library`, and `/library/progress`. Add a Route Handler only if an external HTTP client actually needs an API. Use server-only catalogue queries, Server Components for public book content, and small Client Components for interactions requiring browser state. Keep mutations server-side and validate inputs.

Possible data model: `Book(id, slug, title, description, publishedAt, visibility)`, `User(id, email, displayName)`, `ReadingListItem(userId, bookId, addedAt)`, and `ReadingProgress(userId, bookId, percentComplete, updatedAt)`. Enforce unique slugs and unique `(userId, bookId)` relationships with database constraints; constrain progress to its valid range.

Acceptance criteria: unknown slugs show not-found UI; public pages have metadata; private routes check authentication and ownership; mutations validate server-side; empty/error states are clear; keyboard and mobile use work; cache policy preserves privacy; production build and critical end-to-end tests pass.

Stretch goals: locale formatting, pagination, background imports, observability, and a documented rollback plan. Review which code runs server-side, what may be cached, where authorization occurs, and how the app behaves when the database is unavailable.
