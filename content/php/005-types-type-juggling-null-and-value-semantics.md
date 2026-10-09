# 005. Types, Type Juggling, Null, and Value Semantics

> Book: PHP · Level: beginner to advanced · Part 5 of 45

# Learning goals
- Distinguish PHP's common types.
- Predict coercion and comparison behavior.
- Handle absent values explicitly.

## Core types
PHP includes booleans, integers, floats, strings, arrays, objects, resources, and `null`. A variable's type is determined at runtime. Type declarations on parameters, return values, and properties make contracts clearer.

```php
function priceWithTax(int $cents, float $rate): int {
    return (int) round($cents * (1 + $rate));
}
```

Use integers for money in minor units or a well-designed decimal strategy rather than casually using binary floating point for exact currency arithmetic.

## Type juggling and comparisons
PHP supports conversions between types. Loose comparison (`==`) may coerce values; strict comparison (`===`) checks both value and type and is usually safer when the types are known. Truthiness has edge cases: `0`, `0.0`, `""`, `"0"`, `[]`, `false`, and `null` are false-like. Do not use truthiness when `0` or `"0"` is valid domain data.

## Null and absence
`null` means no value. It is not the same as zero, false, an empty string, or a missing request key. Use `array_key_exists()` when the difference between a missing key and a key explicitly set to null matters; `isset()` returns false for null-valued keys.

## Practice
Create tests for `0`, `"0"`, `false`, `""`, `null`, and a missing array key. State what each means in your domain.
