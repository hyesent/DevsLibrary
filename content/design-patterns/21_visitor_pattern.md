# Visitor Pattern

## Intent
Add operations across a stable family of element types without putting every operation directly on each element.

## When it helps
A compiler or document-processing system may have a stable syntax tree but need several operations: printing, validation, metrics, and code generation. Visitor can keep each operation together.

## Conceptual example
A typed expression tree could define `NumberLiteral`, `AddExpression`, and `VariableReference`. A visitor would have a method for each node type, and each node would dispatch to the corresponding method. The exact implementation depends on language support for discriminated unions, pattern matching, and exhaustiveness checks.

In TypeScript, a discriminated union with a `switch` can sometimes be simpler than a classic object-oriented Visitor:

```ts
type Expr =
  | { kind: "number"; value: number }
  | { kind: "add"; left: Expr; right: Expr };

function evaluate(expr: Expr): number {
  switch (expr.kind) {
    case "number": return expr.value;
    case "add": return evaluate(expr.left) + evaluate(expr.right);
  }
}
```

With strict compiler settings, an exhaustive-check helper can make new variants visible as compile-time errors. This union-based approach is not the classic Visitor pattern, but it often serves the same need more directly in TypeScript.

## Trade-offs
Visitor makes it easy to add a new operation when element types are stable, but adding a new element type can require changing every visitor. It is therefore less attractive when the element hierarchy changes frequently.

## Summary
Visitor separates operations from a stable set of element types. In modern languages, compare it with pattern matching and discriminated unions before committing to the classic structure.
