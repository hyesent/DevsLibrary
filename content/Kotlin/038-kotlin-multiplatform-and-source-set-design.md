# 038. Kotlin Multiplatform and source-set design

## Learning objectives

By the end of this lesson, you should be able to:

- Share code selectively while respecting target-specific capabilities.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin Multiplatform organizes code into source sets such as `commonMain`, `androidMain`, and `iosMain`. Common code should depend only on APIs available to its targets. Platform-specific behavior can be supplied through `expect`/`actual` declarations or injected interfaces, depending on the design. Shared code is valuable when business rules and data contracts truly match; sharing every line is not the goal.

## Worked example

```kotlin
// commonMain
interface DeviceClock { fun epochMillis(): Long }
class ExpiryChecker(private val clock: DeviceClock) {
    fun expired(deadline: Long) = clock.epochMillis() >= deadline
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Build and test each target in CI where possible; a common module compiling does not prove every platform target works. Native toolchains and Apple builds may require macOS infrastructure. Be cautious with dependencies whose platform support, binary compatibility, or license differs across targets. Keep UI framework choices separate from shared domain logic.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Putting JVM-only APIs in common source; assuming all targets share identical threading and filesystem semantics; sharing code that embeds platform-specific assumptions.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Identify which parts of a task tracker can be common (domain rules, validation, API models) and which require platform implementations (storage, secure secrets, UI).
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
