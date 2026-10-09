# 011. Closures, Arrow Functions, and Functional Patterns

> Book: PHP · Level: beginner to advanced · Part 11 of 45

# Learning goals
- Distinguish named functions, closures, and arrow functions.
- Understand variable capture.
- Use callbacks without obscuring behavior.

Closures can capture outer variables with `use`; arrow functions capture referenced variables by value automatically. Neither mechanism makes captured objects immutable: an object variable contains an object handle, so object state can still change.

```php
$minimum = 10;
$eligible = array_filter(
    $scores,
    fn (int $score): bool => $score >= $minimum
);
```

Callbacks appear in sorting, mapping, filtering, event handlers, and framework APIs. Prefer simple callbacks. If a callback needs many branches, extract a named function or method so it can be tested and explained.

Functional style can reduce accidental mutation, but PHP arrays are value-like with copy-on-write behavior and objects have reference-like identity semantics. Understand the data model rather than assuming every value is deeply copied.

## Practice
Implement the same transformation with a loop and `array_map`; compare readability and edge cases.
