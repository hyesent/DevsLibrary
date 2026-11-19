# 049. Capstone extension: API, persistence, and synchronization

## Learning objectives

By the end of this lesson, you should be able to:

- Extend the task tracker with durable storage and a remote synchronization boundary.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A realistic application needs a policy for stale data, retries, duplicate operations, and conflicting edits. Define which system is authoritative and whether local writes are optimistic, queued, or blocked until online. Use stable operation IDs for retriable mutations where the server supports idempotency. Keep transport DTOs separate from domain entities and persist synchronization status explicitly when offline support is promised.

## Worked example

```kotlin
data class SyncOperation(val id: String, val taskId: String, val kind: String, val createdAt: Instant)
enum class SyncState { Pending, InFlight, Synced, Failed }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

A timeout does not tell you whether the server committed the operation. Retries must be designed around that uncertainty. Conflict resolution may use server versions, timestamps, user choice, or domain-specific merging; “last write wins” can silently lose work. Test interrupted requests, duplicate responses, app restart with pending work, and schema migration.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Claiming offline-first without a queue; assuming request failure means no server-side effect; storing sync state only in memory; merging conflicting changes without a defined policy.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write a synchronization protocol note for the capstone: operation identity, retry limits, idempotency, conflict handling, observability, and recovery after process death.
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
