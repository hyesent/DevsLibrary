# 014. Inheritance, Interfaces, Traits, and Composition

> Book: PHP · Level: beginner to advanced · Part 14 of 45

# Learning goals
- Choose composition or inheritance based on substitutability.
- Define interfaces as contracts.
- Use traits carefully.

Inheritance expresses an “is-a” relationship and creates coupling between base and derived classes. A subtype should honor the expectations of its parent type. Interfaces describe capabilities without forcing a shared implementation. Traits reuse methods, but can hide dependencies and create conflicts if overused.

Prefer composition when a class needs a collaborator to perform a task. For example, a report service can receive a `ReportExporter` interface rather than inherit from a specific PDF exporter. This allows substitution in tests and future implementations.

```php
interface Clock
{
    public function now(): DateTimeImmutable;
}

final class ReportService
{
    public function __construct(private Clock $clock) {}
}
```

This design makes time a dependency, so tests can use a predictable clock. It is often simpler than introducing a large framework abstraction.

## Practice
Refactor a class that inherits from a concrete service into one that receives an interface. Explain the substitutability contract.
