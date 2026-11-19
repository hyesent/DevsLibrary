# 033. Architecture: domain, data, and presentation boundaries

## Learning objectives

By the end of this lesson, you should be able to:

- Separate business rules from I/O and UI frameworks.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Architecture should make change safe, not merely produce many folders. A domain layer contains rules and models; a data layer implements persistence and remote access; a presentation layer translates state into UI. Dependency direction matters: high-level business rules should not be forced to depend on concrete database or UI frameworks. Interfaces are useful at meaningful boundaries where implementations vary or tests need control.

## Worked example

```kotlin
interface TaskRepository { suspend fun tasks(): List<Task> }
class GetTasks(private val repository: TaskRepository) {
    suspend operator fun invoke() = repository.tasks()
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Avoid architecture by ceremony. A small application may need only a few clear modules, while a large application may benefit from stricter boundaries. Model loading, empty, success, and failure states explicitly. Decide where errors are translated and how cancellation propagates. Keep domain models independent of JSON field names and UI widget types where useful.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Creating abstractions with no real boundary; leaking database entities into every layer; catching all errors at the lowest layer; duplicating business rules in UI and backend.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Design the layers for a task tracker. Trace one user action from UI to use case to repository to storage and back, including validation and error handling.
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
