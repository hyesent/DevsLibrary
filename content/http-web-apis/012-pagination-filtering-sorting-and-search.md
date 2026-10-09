# 012. Pagination, Filtering, Sorting, and Search

> Book: HTTP & Web APIs · Level: beginner to advanced · Lesson 12 of 30

## Learning goals
- Design collection endpoints that scale.
- Keep pagination stable under changing data.
- Prevent expensive unbounded queries.

Offset pagination (`limit` and `offset`) is easy to understand but can become expensive at high offsets and may shift as records are inserted or deleted. Cursor pagination uses a stable ordering key and often performs better for large changing collections. Document whether cursors are opaque, how long they remain valid, and which sort order they encode.

Always impose a maximum page size. Validate filter names and sort fields against an allowlist; never concatenate arbitrary client input into SQL identifiers. Define multi-field ordering with a unique tie-breaker. Search semantics should specify case sensitivity, tokenization, ranking, and whether results are eventually consistent.

Response metadata may include `nextCursor`, `hasMore`, or links. Avoid promising an exact total count if obtaining it is costly or inconsistent with the query snapshot.

## Practice
Design a paginated endpoint for recent orders. Compare offset and cursor pagination under concurrent inserts and write tests for maximum page size and invalid sort fields.
