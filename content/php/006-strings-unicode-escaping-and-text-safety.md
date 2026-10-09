# 006. Strings, Unicode, Escaping, and Text Safety

> Book: PHP · Level: beginner to advanced · Part 6 of 45

# Learning goals
- Work with strings and interpolation.
- Understand bytes versus characters.
- Escape output for its destination.

## String construction
Single-quoted and double-quoted strings have different interpolation and escape behavior. Prefer interpolation or concatenation consistently and keep complex formatting readable. Heredoc and nowdoc syntax help with multiline text, but neither makes embedded user input safe.

## Unicode
A PHP string is a byte sequence; it is not inherently a Unicode character array. UTF-8 is a common encoding, but character-aware operations often require the `mbstring` extension. Byte length (`strlen`) and character length (`mb_strlen`) answer different questions. Unicode normalization, grapheme clusters, and visual characters are also distinct concepts.

## Contextual output encoding
Never treat one escaping function as universal:
- HTML text/attribute contexts: `htmlspecialchars()` with suitable flags and UTF-8.
- URL components: `rawurlencode()` for a component, not a whole HTML attribute by itself.
- JavaScript, CSS, shell, and SQL contexts each have different rules; avoid concatenating untrusted input into executable syntax.
- SQL values should use prepared statements rather than manual escaping.

```php
echo htmlspecialchars($displayName, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
```

Escaping reduces interpretation as syntax in a particular context; it does not replace validation or authorization.

## Practice
- Compare `strlen()` and `mb_strlen()` on a UTF-8 string.
- Render a name containing `<`, `&`, quotes, and non-ASCII characters.
- Identify the output context before selecting an encoder.
