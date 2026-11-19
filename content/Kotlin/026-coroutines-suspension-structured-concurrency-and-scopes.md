# 026. Coroutines: suspension, structured concurrency, and scopes

## Learning objectives

By the end of this lesson, you should be able to:

- Understand coroutine execution without confusing suspension with thread blocking.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A coroutine is a computation that can suspend and resume. A `suspend` function may suspend without blocking the underlying thread, but it can still call blocking code. Coroutine builders such as `launch` and `async` create child coroutines in a scope. Structured concurrency ties child lifetimes and failures to a parent scope, making cancellation and cleanup predictable. `async` returns a `Deferred<T>` and is intended for a result; `launch` returns a `Job`.

## Worked example

```kotlin
suspend fun loadDashboard(): Dashboard = coroutineScope {
    val profile = async { loadProfile() }
    val alerts = async { loadAlerts() }
    Dashboard(profile.await(), alerts.await())
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

The example runs children concurrently only if their functions suspend or perform asynchronous work appropriately. CPU-heavy work and blocking I/O need deliberate dispatcher choices. Avoid `GlobalScope` for ordinary application work because its lifetime is detached from a caller. Define who owns each scope and who cancels it.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming `suspend` means background thread; launching detached work without an owner; using `async` and never awaiting its result.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Build a suspending service that loads two independent resources. Test success, one child failing, and parent cancellation.
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
