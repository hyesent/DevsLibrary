# 037. Android persistence, networking, and offline-first behavior

## Learning objectives

By the end of this lesson, you should be able to:

- Design durable data and resilient synchronization for mobile conditions.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Mobile connections can be slow, intermittent, metered, or absent. A repository can combine a local source of truth with remote refresh. Persist only data needed across process death and define cache freshness and conflict policies. Database transactions protect related updates; they do not automatically solve conflicts with a server. Treat retries as potentially duplicated operations and use idempotency where appropriate.

## Worked example

```kotlin
// Architecture sketch, not a complete Room/HTTP implementation:
interface TaskRepository {
    fun observeTasks(): Flow<List<Task>>
    suspend fun refresh(): RefreshResult
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Use platform-appropriate persistence libraries and networking clients. Configure timeouts, cancellation, and error mapping. Do not assume a failed request means the server did not process it; the response may have been lost after the write succeeded. Queue offline mutations with explicit status and conflict resolution if the product requires it.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Treating network as always available; retrying non-idempotent writes blindly; storing tokens in plain preferences; confusing cached data with confirmed server state.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Design offline behavior for editing a task. Define local persistence, synchronization states, retries, duplicate handling, and what the user sees during conflicts.
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
