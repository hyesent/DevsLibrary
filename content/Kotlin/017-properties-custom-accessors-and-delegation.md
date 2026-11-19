# 017. Properties, custom accessors, and delegation

## Learning objectives

By the end of this lesson, you should be able to:

- Understand property accessors, lazy initialization, observable state, and delegated properties.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A Kotlin property is an abstraction over accessors and sometimes backing storage; it is not always a direct public field. Custom getters can compute values on each access. `lateinit` delays initialization for certain non-null `var` properties and throws if read too early; it is not a general replacement for proper construction. `lazy` initializes a value on first access with a configurable thread-safety mode. Delegates such as `observable` and `vetoable` add behavior to reads or writes, but can also obscure important state transitions.

## Worked example

```kotlin
val config by lazy { loadConfig() }
var name: String by Delegates.observable("Guest") { _, old, new ->
    if (old != new) println("Name changed")
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Lazy initialization can retain expensive objects longer than expected, and its thread-safety mode matters if multiple threads may access it. Avoid side effects in getters because property reads look cheap and may happen more often than expected. For dependency-injected Android objects, lifecycle-aware initialization is usually safer than an unguarded `lateinit` field.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Using `lateinit` to hide lifecycle errors; performing network calls inside getters; assuming all lazy modes have identical synchronization behavior.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Compare eager initialization, `lazy`, and `lateinit` for a configuration object. State what happens if the value is never read or is read before setup.
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
