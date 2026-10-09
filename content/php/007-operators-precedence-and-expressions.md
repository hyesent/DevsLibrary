# 007. Operators, Precedence, and Expressions

> Book: PHP · Level: beginner to advanced · Part 7 of 45

# Learning goals
- Use arithmetic, comparison, logical, assignment, and null-related operators.
- Avoid precedence traps.
- Make conditions readable.

PHP has arithmetic operators, string concatenation (`.`), comparisons, logical operators, null coalescing (`??`), nullsafe access (`?->` in supported versions), and many compound assignments. Precedence determines grouping; when code is not immediately obvious, add parentheses.

```php
$displayName = $inputName ?? 'Guest';
$isAllowed = $isAuthenticated && ($isOwner || $isAdmin);
```

`??` is useful for defaults when a value is absent or null. It is not the same as `?:`, which uses truthiness and may replace valid false-like values. `&&` and `||` have different precedence from `and` and `or`; avoid mixing them in assignments.

Use `===` and `!==` for strict comparisons when appropriate. Avoid clever chained ternaries; clear branches are easier to debug and review.

## Practice
Refactor five dense boolean expressions into named intermediate variables. Test boundary values including zero, empty string, and null.
