# 013. Object-Oriented PHP: Classes, Objects, Properties, and Methods

> Book: PHP · Level: beginner to advanced · Part 13 of 45

# Learning goals
- Model behavior with classes and objects.
- Use visibility and constructors intentionally.
- Keep invariants inside domain objects.

A class defines a type; an object is an instance. Properties hold state, and methods express behavior. `public`, `protected`, and `private` control visibility. Use the narrowest visibility that supports the design.

```php
final class Money
{
    public function __construct(
        public readonly int $cents,
        public readonly string $currency = 'NGN',
    ) {
        if ($cents < 0) {
            throw new InvalidArgumentException('Amount cannot be negative.');
        }
    }
}
```

This example assumes a PHP version supporting constructor property promotion and `readonly`. Check your project's minimum version before using modern syntax. Validate invariants at construction or at the operation that owns them. Do not use a class merely to wrap unrelated functions.

Static methods are appropriate for operations not tied to instance state, but excessive static coupling makes substitution and testing harder. Prefer objects with clear responsibilities and explicit collaborators.

## Practice
Model a `Task` with a title, status, and transition method. Decide which states are legal and prevent invalid transitions.
