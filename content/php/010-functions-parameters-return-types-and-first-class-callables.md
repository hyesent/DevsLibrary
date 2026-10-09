# 010. Functions, Parameters, Return Types, and First-Class Callables

> Book: PHP · Level: beginner to advanced · Part 10 of 45

# Learning goals
- Design explicit function contracts.
- Use defaults, variadics, named arguments, and return types.
- Keep functions focused and testable.

A function should have a clear purpose, input contract, output contract, and error behavior. Declare parameter and return types where possible. PHP supports nullable types, union types, intersection types in supported versions, and `void` or `never` return types in suitable cases.

```php
function formatUserLabel(string $name, ?string $role = null): string {
    return $role === null ? $name : "$name ($role)";
}
```

Parameter defaults should be stable values or supported constant expressions. Avoid using mutable global state as an implicit parameter. Variadic parameters (`...$values`) collect multiple arguments; use them when the domain genuinely supports a variable number of values.

Named arguments improve clarity but couple callers to parameter names, so renaming a public parameter can be a compatibility change. First-class callables and closures are useful for callbacks and dependency injection.

## Practice
Design a pure function that calculates a cart total. Specify what happens for negative quantities, invalid prices, and empty carts before implementing it.
