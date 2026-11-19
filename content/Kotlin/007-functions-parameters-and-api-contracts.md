# 007. Functions, parameters, and API contracts

## Learning objectives

By the end of this lesson, you should be able to:

- Design functions with clear contracts, default arguments, and named parameters.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Functions should express one coherent operation. Kotlin supports named arguments, default values, single-expression functions, local functions, and extension functions. Defaults can simplify call sites, but public library defaults are part of the API contract. Keep side effects visible: a function named `calculateTotal` should not unexpectedly write a file or mutate global state. Return meaningful values rather than communicating only through mutable external variables.

## Worked example

```kotlin
fun discountedPrice(price: Double, rate: Double = 0.0): Double {
    require(price >= 0.0)
    require(rate in 0.0..1.0)
    return price * (1.0 - rate)
}
val total = discountedPrice(price = 80.0, rate = 0.15)
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Use domain-appropriate numeric types: floating-point arithmetic is usually unsuitable for exact currency without a deliberate representation and rounding policy. `require` is appropriate for invalid caller arguments; `check` is for invalid object or program state. Keep parameters limited, group related data into a type when that improves meaning, and document units and failure conditions.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Too many Boolean parameters; ambiguous units; hidden side effects; relying on floating-point values for exact money.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write a pure function for calculating a shipping fee. Document its units and invalid inputs, then test boundaries and verify repeated calls with the same input return the same output.
2. **Boundary tests:** add at least three cases, including an empty, invalid, or extreme input where appropriate.
3. **Explain:** write a short note describing the API contract, failure behavior, and why you chose this approach over one alternative.
4. **Refactor:** identify one way the code could become harder to maintain and improve it without changing the behavior.

## Review questions

1. What does the language or API guarantee here?
2. Which edge case could invalidate a naive implementation?
3. What is the likely performance or lifecycle cost?
4. What would you test at the boundary, and what should remain a separate integration test?
5. Which parts depend on Kotlin/JVM, Android, Native, or a library version?

## Completion criteria

Consider this lesson mastered when you can explain the concept without relying on the example, implement a variant independently, test its failure modes, and identify when a different approach would be more appropriate.
