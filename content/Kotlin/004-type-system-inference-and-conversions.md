# 004. Type system, inference, and conversions

## Learning objectives

By the end of this lesson, you should be able to:

- Understand static types, numeric conversions, type checks, and smart casts.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin does not silently widen every numeric type. An `Int` is not automatically an `Long` in every context; use explicit conversion such as `toLong()`. Type inference uses declarations and expressions, but public contracts should make important types clear. `is` performs a runtime type check and may enable a smart cast when the compiler can prove the value has not changed in a way that invalidates it.

## Worked example

```kotlin
fun describe(value: Any): String = when (value) {
    is String -> "text(${value.length})"
    is Int -> "integer($value)"
    else -> "other"
}
val count: Long = 42.toLong()
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Smart casts depend on stability. A mutable property with a custom getter, a captured mutable variable, or a concurrently changing value may not be smart-cast safely. `Any` is the root of Kotlin’s non-null type hierarchy; `Any?` includes null. Use domain types instead of passing `Any` throughout an application.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Expecting Java-style numeric widening; forcing casts without validating input; using broad types that erase useful guarantees.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write a function accepting `Any` and returning a description for a string, integer, and unsupported value. Add a test for `null` by changing the input type to `Any?`.
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
