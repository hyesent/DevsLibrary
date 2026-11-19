# 019. Exceptions, result types, and error modeling

## Learning objectives

By the end of this lesson, you should be able to:

- Choose between exceptions and explicit result values based on failure semantics.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin has no checked exceptions enforced by the compiler. Exceptions are useful for exceptional failures and APIs that already use them, while explicit result types make expected failure branches visible in a function signature. `runCatching` captures thrown `Throwable`, including serious errors; indiscriminately swallowing all throwables is dangerous. A domain error should preserve enough context for a caller to decide whether to retry, display a message, or stop.

## Worked example

```kotlin
sealed interface ParseResult {
    data class Valid(val value: Int) : ParseResult
    data class Invalid(val reason: String) : ParseResult
}
fun parseCount(input: String): ParseResult = input.toIntOrNull()
    ?.takeIf { it >= 0 }
    ?.let { ParseResult.Valid(it) }
    ?: ParseResult.Invalid("Expected a non-negative integer")
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not expose raw stack traces or sensitive server messages to end users. Preserve causes when translating exceptions. Catch an exception at the layer that can meaningfully handle it, and avoid catch-and-ignore. Cancellation exceptions in coroutine code must generally propagate rather than be converted into ordinary failure results.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Catching `Throwable` and continuing; returning `null` for every possible error; losing diagnostic context when wrapping an exception.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Implement parsing with explicit success and failure cases. Test empty input, whitespace, overflow, negative values, and valid values.
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
