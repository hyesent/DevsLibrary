# 034. Dependency injection and testable composition

## Learning objectives

By the end of this lesson, you should be able to:

- Build the application graph explicitly and manage object lifetimes.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Dependency injection means a component receives its dependencies rather than constructing all of them internally. Constructor injection makes requirements visible and enables deterministic tests. A composition root chooses concrete implementations and wires them together. Dependency injection frameworks can help with large graphs, but they do not replace lifecycle design or architectural boundaries.

## Worked example

```kotlin
class TaskService(private val repository: TaskRepository, private val clock: Clock) { /* behavior */ }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Singletons, per-request objects, screen-scoped objects, and transient objects have different lifetimes. A long-lived object must not retain a shorter-lived activity or request context. Cyclic dependencies often indicate responsibilities need to be separated. In tests, use a fake repository and deterministic clock rather than patching global state.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Service locators that hide dependencies; a singleton holding an Activity; constructing network/database clients inside every method; using mocks instead of simple fakes unnecessarily.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Wire a service with production and fake dependencies. Draw the object lifetime graph and identify any object that outlives one of its dependencies.
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
