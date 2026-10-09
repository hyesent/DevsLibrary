# Factory Method and Simple Factories

## Intent
Encapsulate object creation when the choice or setup of an object deserves its own responsibility.

## Two related ideas
A **simple factory** is a practical helper that selects and constructs an object. **Factory Method**, in the classic pattern catalog, lets subclasses or overriding methods decide which product to create. Teams often use “factory” loosely, so state which structure you mean.

## Example: document parser
```ts
interface DocumentParser {
  parse(input: string): unknown;
}

class JsonParser implements DocumentParser {
  parse(input: string): unknown {
    return JSON.parse(input);
  }
}

class CsvParser implements DocumentParser {
  parse(input: string): unknown {
    return input.split("\\n").map(line => line.split(","));
  }
}

function createParser(format: "json" | "csv"): DocumentParser {
  switch (format) {
    case "json": return new JsonParser();
    case "csv": return new CsvParser();
  }
}
```

The factory centralizes selection. The CSV parser is intentionally simplistic: correct CSV parsing must handle quoting, commas and newlines inside fields, escaped quotes, and encoding.

## When to use a factory
- Construction involves meaningful validation or setup.
- Callers should not depend on concrete classes.
- A configuration or input selects among several implementations.
- Object creation needs a clear test seam.

Do not introduce a factory merely to hide a one-line constructor with no variation or meaningful setup.

## Error handling and validation
If a format comes from external input, validate it before selecting a parser. A TypeScript union helps at compile time but does not validate an arbitrary HTTP request at runtime. Unknown formats should produce a clear error rather than a mysterious undefined value.

## Summary
Factories isolate creation decisions. Keep them simple unless creation complexity genuinely warrants a more elaborate pattern.
