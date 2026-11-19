# 040. Library design, documentation, and compatibility

## Learning objectives

By the end of this lesson, you should be able to:

- Publish APIs that are predictable, discoverable, and safe to evolve.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A library’s API includes public names, types, defaults, exceptions, behavior, and binary signatures. Prefer small interfaces with explicit contracts. Document units, thread-safety, cancellation, ownership, nullability, and failure conditions where relevant. Semantic versioning is useful only when compatibility policy is defined and followed. Deprecate APIs with a migration path rather than removing them abruptly when consumers depend on them.

## Worked example

```kotlin
/** Returns a non-negative timeout in milliseconds. */
fun timeoutMillis(seconds: Long): Long {
    require(seconds >= 0)
    return Math.multiplyExact(seconds, 1_000L)
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Public Kotlin APIs consumed by Java may need overloads or annotations. Avoid exposing internal dependency types unless they are intended to be part of the public contract. Test compiled artifacts from a consumer project, not only source inside the library. Include examples that compile and state which Kotlin/JDK versions are supported.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Changing public semantics without release notes; exposing internal types; documenting behavior that tests do not verify; assuming source compatibility implies binary compatibility.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Design a small published utility library. Write API documentation, define error behavior and supported versions, and create a consumer-style test module.
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
