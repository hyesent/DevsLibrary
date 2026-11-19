# 042. Debugging, diagnostics, and troubleshooting

## Learning objectives

By the end of this lesson, you should be able to:

- Use compiler diagnostics, logs, debugger tools, and minimal reproductions systematically.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Debugging begins by stating expected and observed behavior and reducing the difference to a reproducible case. Compiler errors often point to a symptom rather than the original design problem. Use breakpoints and inspect values at boundaries; add structured logs that reveal correlation and state transitions without leaking secrets. Reproduce bugs with a test before fixing them when feasible, then keep the regression test.

## Worked example

```kotlin
// A useful boundary assertion can make an invalid assumption fail close to its source.
fun pageSize(value: Int): Int {
    require(value in 1..200)
    return value
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

For coroutine bugs, include coroutine names or structured diagnostic context where supported and inspect cancellation/parent-child relationships. For performance bugs, capture profiles rather than guessing. Avoid logging full tokens, passwords, or personal records. A minimal reproduction should remove unrelated frameworks and data while preserving the failure.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Changing several things before reproducing the bug; adding noisy logs without context; fixing a symptom but leaving the invariant unprotected.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Take a deliberately failing function, write a regression test, narrow the cause, fix the invariant, and document the evidence that the bug is resolved.
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
