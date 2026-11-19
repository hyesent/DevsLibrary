# 027. Dispatchers, blocking work, cancellation, and timeouts

## Learning objectives

By the end of this lesson, you should be able to:

- Select execution contexts and preserve cooperative cancellation.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Dispatchers decide where coroutine code executes. `Dispatchers.Main` is used for UI work where available; `Dispatchers.IO` is intended for blocking I/O; `Dispatchers.Default` is appropriate for CPU-intensive work. A dispatcher does not make an unsafe API cancellable automatically. Cancellation is cooperative: suspending functions often check it, and long CPU loops may need `ensureActive` or `yield`. Use timeouts for bounded operations and always clean up resources.

## Worked example

```kotlin
suspend fun parseLarge(items: List<Item>): List<Result> =
    withContext(Dispatchers.Default) {
        items.map { item -> currentCoroutineContext().ensureActive(); parse(item) }
    }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not wrap every function in `withContext`; define dispatcher policy near the layer that knows whether work blocks or consumes CPU. Avoid swallowing `CancellationException` in broad catches. For blocking APIs that cannot be interrupted, cancellation may stop waiting but not necessarily stop the underlying operation. Use `try/finally` for cleanup.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Catching cancellation as a normal error; running CPU-heavy work on the UI dispatcher; believing timeout forcibly kills every blocking call.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a cancellable CPU loop and a blocking boundary. Verify cancellation behavior, resource cleanup, and how a timeout is reported.
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
