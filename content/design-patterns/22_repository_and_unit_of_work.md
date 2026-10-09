# Repository and Unit of Work

## Important distinction
Repository and Unit of Work are common application/data-access patterns, not members of the classic Gang of Four object-oriented pattern catalog.

A **Repository** presents a collection-like interface for retrieving and persisting domain objects. A **Unit of Work** tracks changes that should be committed together within a transaction boundary.

## Repository example
```ts
type Course = { id: string; title: string };

interface CourseRepository {
  findById(id: string): Promise<Course | null>;
  save(course: Course): Promise<void>;
}

async function renameCourse(
  repository: CourseRepository,
  id: string,
  title: string
): Promise<void> {
  const course = await repository.findById(id);
  if (!course) throw new Error("Course not found");
  if (!title.trim()) throw new Error("Title is required");
  await repository.save({ ...course, title: title.trim() });
}
```

The service depends on the repository contract rather than a specific database library. The example does not demonstrate optimistic concurrency, authorization, or a multi-step transaction.

## Unit of Work
A Unit of Work can collect several changes and commit them through one database transaction. The exact guarantees depend on the database and implementation. A transaction generally cannot atomically include arbitrary external effects such as sending an email unless an additional coordination design is used.

## Avoid repository theater
Wrapping every ORM method in a one-to-one interface may add ceremony without isolating meaningful domain or persistence concerns. Use a repository when it creates a useful boundary, supports domain-oriented queries, or protects application code from persistence details.

## Summary
Repository abstracts access to persisted domain data; Unit of Work groups changes for a commit boundary. Neither removes the need to understand transactions and failure modes.
