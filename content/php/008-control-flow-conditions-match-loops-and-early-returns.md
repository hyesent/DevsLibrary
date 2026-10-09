# 008. Control Flow: Conditions, Match, Loops, and Early Returns

> Book: PHP · Level: beginner to advanced · Part 8 of 45

# Learning goals
- Select appropriate branching and looping constructs.
- Avoid off-by-one and infinite-loop bugs.
- Use early returns to simplify logic.

PHP provides `if/elseif/else`, `switch`, `match` in modern PHP, `while`, `do...while`, `for`, and `foreach`. `match` uses strict identity, returns a value, and must be exhaustive or have a default branch. `switch` has different comparison semantics and fall-through behavior, so understand which construct you are using.

```php
$statusLabel = match ($status) {
    'draft' => 'Draft',
    'published' => 'Published',
    'archived' => 'Archived',
    default => 'Unknown',
};
```

`foreach` is often the clearest way to iterate arrays. Use references in `foreach` only when mutation is intended; unset the reference variable afterward when necessary to avoid surprising reuse.

Early returns reduce nesting:
```php
function canEdit(bool $isAuthenticated, bool $isOwner): bool {
    if (!$isAuthenticated) return false;
    if (!$isOwner) return false;
    return true;
}
```
Authorization must still be enforced at the relevant server-side operation, not merely in a view.

## Practice
Write a loop with a clear termination condition; test empty and single-item collections. Rewrite nested conditions using guard clauses.
