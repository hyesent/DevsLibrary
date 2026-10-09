# 016. Enumerations, Readonly Data, Value Objects, and DTOs

> Book: PHP · Level: beginner to advanced · Part 16 of 45

# Learning goals
- Represent finite states safely.
- Separate domain concepts from transport shapes.
- Choose mutable or immutable data intentionally.

Enums model a fixed set of named cases, reducing typo-prone string states. Backed enums associate cases with scalar values where persistence or serialization requires it. Use `match` or explicit mapping to translate domain states into user-facing labels.

Value objects express domain concepts such as money, email addresses, date ranges, or measurements. They should validate invariants and make invalid states difficult to represent. DTOs carry data across boundaries and should not accidentally become places for complex business logic.

Readonly properties and readonly classes (depending on PHP version) can reduce accidental mutation. Readonly is not deep immutability: referenced objects may themselves be mutable. `DateTimeImmutable` is often safer than mutable date objects for domain calculations.

## Practice
Replace a status string with an enum. Add an explicit conversion layer for API responses so internal enum names do not accidentally become permanent public contracts.
