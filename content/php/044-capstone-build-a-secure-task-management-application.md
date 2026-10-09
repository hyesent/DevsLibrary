# 044. Capstone: Build a Secure Task-Management Application

> Book: PHP · Level: beginner to advanced · Part 44 of 45

# Project goals
Build a small but production-minded task-management application using PHP and a relational database. Keep the architecture proportional to the project.

## Required features
- Register/login/logout with secure password hashing and session handling.
- Create, view, update, and delete tasks with ownership enforcement.
- Server-side validation and safe HTML rendering.
- PDO prepared statements and database constraints.
- JSON endpoint or documented HTTP response behavior.
- Automated unit and integration tests.
- Structured logs with request correlation.
- Configuration via environment or deployment secrets.
- A README with setup, schema/migrations, tests, security assumptions, and deployment notes.

## Suggested structure
```text
public/
  index.php
src/
  Http/
  Application/
  Domain/
  Infrastructure/
templates/
tests/
migrations/
composer.json
.env.example
README.md
```
This is a starting point, not a mandatory architecture. Do not expose `.env` or source directories through the public document root.

## Acceptance tests
- Unauthenticated users cannot access private tasks.
- User A cannot read or mutate User B's task by changing an ID.
- Invalid input returns a clear error without exposing internals.
- HTML output is escaped.
- SQL values use prepared statements.
- Duplicate submission does not create unintended duplicate operations.
- Tests run from a clean checkout using documented steps.
- Logs contain diagnostic context but no secrets.

## Extension challenges
Add pagination, a queue-backed email notification, rate limiting, a migration rollback plan, API contract tests, and a deployment health endpoint. Document trade-offs rather than adding abstractions without purpose.
