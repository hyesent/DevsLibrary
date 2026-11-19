# 039. Kotlin/Native memory, interop, and platform edges

## Learning objectives

By the end of this lesson, you should be able to:

- Understand native compilation and boundary costs without assuming JVM semantics.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin/Native compiles Kotlin to native binaries and has platform-specific interop and runtime behavior. Native interop can expose ownership, lifetime, error, and representation issues that are less visible in pure Kotlin code. Common Kotlin code should not assume Java reflection, JVM class loading, or Java-only libraries. Use explicit boundary types and test on the actual target platform.

## Worked example

```kotlin
// Keep a platform-specific API behind a common interface.
interface SecureTokenStore {
    suspend fun read(): String?
    suspend fun write(token: String)
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Interop details evolve with Kotlin and platform toolchains, so consult current official docs for memory management, Objective-C/Swift integration, and supported APIs. Avoid leaking platform objects into shared domain models. Treat callbacks crossing language boundaries carefully, especially around threading, exception translation, and object lifetime.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming JVM APIs exist on Native; ignoring ownership/lifetime semantics; sharing platform-specific exceptions across common code.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Wrap a platform-specific file or keychain implementation behind an interface. Define error mapping and test how callbacks and cancellation cross the boundary.
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
