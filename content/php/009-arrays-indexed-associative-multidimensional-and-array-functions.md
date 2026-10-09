# 009. Arrays: Indexed, Associative, Multidimensional, and Array Functions

> Book: PHP · Level: beginner to advanced · Part 9 of 45

# Learning goals
- Model lists and maps with arrays.
- Iterate, transform, filter, and reduce collections.
- Avoid confusing array keys and values.

PHP arrays are ordered maps: they can act as lists, dictionaries, or mixed structures. Numeric-looking keys may be converted to integers. Appending with `$items[] = $value` is convenient, but list invariants should be clear.

```php
$person = ['name' => 'Ada', 'active' => true];
$names = array_map(
    static fn (array $person): string => $person['name'],
    $people
);
```

Important tools include `array_map`, `array_filter`, `array_reduce`, `array_values`, `array_keys`, `array_key_exists`, `in_array`, `array_merge`, and sorting functions. Be careful with key preservation: `array_filter()` preserves keys, so reindex a list with `array_values()` if needed.

`in_array($needle, $haystack, true)` enables strict comparison. Avoid mutating arrays while iterating unless behavior is understood. For large datasets, consider memory cost: arrays are flexible but not necessarily memory-cheap.

## Practice
Build a list of orders, filter paid orders, total their amounts, and preserve a stable order. Add tests for empty arrays and missing keys.
