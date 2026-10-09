# 003. PHP Syntax, Tags, Statements, Comments, and Strict Types

> Book: PHP · Level: beginner to advanced · Part 3 of 45

# Learning goals
- Read PHP source confidently.
- Understand statements, expressions, comments, and type declarations.
- Use strict typing deliberately.

## Source structure
PHP code is normally placed between `<?php` and `?>`. In PHP-only files, omit the closing tag to avoid accidental trailing whitespace or output. Statements commonly end in semicolons. Braces define blocks. PHP identifiers are generally case-sensitive for variables, while language keywords and function names have different case rules; prefer consistent conventional casing.

```php
<?php
declare(strict_types=1);

$message = "Ready";
$count = 3;
echo $message, " (", $count, ")";
```

Comments include `//`, `#`, and `/* ... */`. Use comments to explain intent or constraints, not to narrate every obvious line. PHPDoc can document complex contracts and help static analysis.

## Strict types
`declare(strict_types=1);` affects scalar type coercion for calls made from the file where it is declared; it is not a universal runtime validation switch and does not eliminate all coercions or input validation needs. Put it at the beginning of source files where that policy is desired.

## Expressions and statements
An expression produces a value; a statement performs an action or controls execution. Assignment, comparison, function calls, and arithmetic are expressions used within statements. Parenthesize non-obvious logic rather than relying on readers to remember precedence.

## Practice
1. Write a function call and predict its output.
2. Add strict typing to a file and compare a scalar-argument call with and without it.
3. Review a file for accidental output before headers.
