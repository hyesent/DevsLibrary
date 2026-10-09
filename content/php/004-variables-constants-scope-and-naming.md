# 004. Variables, Constants, Scope, and Naming

> Book: PHP · Level: beginner to advanced · Part 4 of 45

# Learning goals
- Use variables and constants safely.
- Explain local, global, static, and superglobal scope.
- Avoid accidental state coupling.

## Variables
PHP variables begin with `$`, such as `$userId`. Names are case-sensitive. Variables have values whose runtime types can change, but a codebase benefits from stable semantic meaning and clear naming.

```php
$userId = 42;
$isPublished = true;
$title = "Introduction";
```

Use names that describe the domain. Prefer `$totalCents` to `$x`, and encode units in names where confusion is likely.

## Constants
Use `const` for compile-time constants and `define()` where runtime definition is needed. Class constants belong to a class. Constants should represent stable values, not mutable application state. Never commit credentials as source constants.

## Scope
Function-local variables are separate from variables in the outer scope. `global` imports a global variable into function scope; excessive use creates hidden dependencies. `static` local variables retain their value across calls within the same request execution context. Superglobals such as `$_GET`, `$_POST`, `$_SERVER`, and `$_SESSION` expose request/runtime data and must be treated as untrusted or environment-dependent.

## Practice
- Refactor a function that reads a global variable to accept an explicit parameter.
- Distinguish configuration constants from secrets.
- Explain why `$_SERVER` values should not automatically be trusted.
