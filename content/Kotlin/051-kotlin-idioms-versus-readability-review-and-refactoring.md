# 051. Kotlin idioms versus readability: review and refactoring

## Learning objectives

By the end of this lesson, you should be able to:

- Review code for clarity, explicit contracts, and maintainable change.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Idiomatic Kotlin is not the shortest possible Kotlin. A good review asks whether a reader can identify the state, side effects, failure paths, and invariants. Scope functions, extension methods, destructuring, and collection chains should reduce cognitive load. Refactoring should preserve externally observable behavior, and tests provide evidence that the behavior remained stable.

## Worked example

```kotlin
// Explicit control flow can be clearer than a nested clever chain.
val user = repository.find(id) ?: return NotFound
if (!user.isActive) return Inactive
return Ready(user)
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Avoid style arguments detached from consequences. A small abstraction is valuable when it names a domain concept or isolates a volatile boundary. Avoid speculative generality and duplicated business logic. During review, consider nullability, cancellation, resource lifetime, concurrency, error translation, API compatibility, and testability—not just formatting.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Optimizing for line count; refactoring and changing behavior in the same patch without tests; abstracting a one-off expression into a framework.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Review a deliberately over-chained function. Refactor for clarity, add tests before changing it, and explain the behavioral contract preserved.
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
