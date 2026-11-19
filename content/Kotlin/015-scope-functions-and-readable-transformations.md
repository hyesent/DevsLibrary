# 015. Scope functions and readable transformations

## Learning objectives

By the end of this lesson, you should be able to:

- Choose `let`, `run`, `with`, `apply`, and `also` based on receiver and return value.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Scope functions execute a lambda in the context of an object, but differ in how that object is referenced (`this` or `it`) and what the lambda returns. `let` and `also` use `it`; `run`, `with`, and `apply` use `this`. `apply` returns the receiver and is useful for configuration; `also` returns the receiver and is useful for side observations; `let` is useful for transformations or nullable branches. These functions are conveniences, not required structure.

## Worked example

```kotlin
val normalized = rawName
    ?.trim()
    ?.takeIf { it.isNotEmpty() }
    ?.let { it.lowercase() }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Nested scope functions can create multiple implicit receivers and make it unclear which object a property belongs to. Use explicit names for nontrivial lambdas. Avoid `also` for important business mutations because a chain of “side effects” can hide control flow. Consider whether an ordinary local variable is clearer than chaining.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Choosing a scope function based only on style; deeply nesting `this`; hiding important side effects in a fluent chain.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Rewrite a nested scope-function chain using named local variables. Compare readability and identify where each value changes.
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
