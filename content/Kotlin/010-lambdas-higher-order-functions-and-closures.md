# 010. Lambdas, higher-order functions, and closures

## Learning objectives

By the end of this lesson, you should be able to:

- Understand function values, lambda capture, and higher-order APIs.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A higher-order function accepts a function or returns one. Lambdas are useful for transformations, callbacks, and policy injection. A closure can capture variables from its surrounding scope; captured mutable state can make behavior harder to reason about, especially when callbacks run later or on different threads. Prefer pure transformations when possible and name complex lambdas rather than building deeply nested expressions.

## Worked example

```kotlin
fun <T> select(items: List<T>, predicate: (T) -> Boolean): List<T> =
    items.filter(predicate)
val longNames = select(listOf("Ada", "Alexander")) { it.length > 3 }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Inline functions can reduce some lambda allocation and enable reified type parameters, but `inline` affects compilation and API behavior; it is not a universal speed switch. `crossinline` prevents certain non-local returns, while `noinline` keeps a function parameter as a normal value. Understand these modifiers before using them in library APIs.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Using lambdas so dense that intent disappears; capturing mutable variables in delayed callbacks; adding `inline` without understanding its semantics.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write a generic filtering function. Then write a callback that captures a counter and explain why calling it later or concurrently changes the design risks.
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
