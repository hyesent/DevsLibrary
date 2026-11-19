# 041. Capstone: a production-minded task tracker

## Learning objectives

By the end of this lesson, you should be able to:

- Integrate Kotlin language features, architecture, testing, persistence, and asynchronous work.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Build a task tracker around explicit domain rules. A task has a stable identifier, title, completion state, timestamps, and optional due date. The application should distinguish validation errors from infrastructure failures and represent loading, empty, content, and error UI states. Start with pure domain logic, then add a repository, persistence/network boundary, and presentation. Keep each layer testable without a running device or live server.

## Worked example

```kotlin
data class TaskId(val value: String)
data class Task(val id: TaskId, val title: String, val completed: Boolean)
fun rename(task: Task, title: String): Task {
    val normalized = title.trim()
    require(normalized.isNotEmpty())
    return task.copy(title = normalized)
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Define acceptance criteria before implementation: duplicate IDs are handled; blank titles are rejected; sorting is deterministic; failures are observable; cancellation does not become a user-visible “server error”; local edits survive restart if persistence is in scope. Add unit, repository integration, and UI tests at their appropriate layers. Include a README with setup, architecture, decisions, and limitations.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Putting business rules only in composables; testing only the happy path; making the repository swallow all exceptions; claiming offline support without a synchronization policy.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Implement create, rename, complete, list, and delete operations. Submit a test matrix, architecture diagram, failure-handling policy, and a list of known limitations.
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
