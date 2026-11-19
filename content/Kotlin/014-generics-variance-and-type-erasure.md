# 014. Generics, variance, and type erasure

## Learning objectives

By the end of this lesson, you should be able to:

- Design type-safe reusable APIs and understand JVM generic limitations.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A generic type parameter preserves relationships between inputs and outputs. `out T` makes a type producer-oriented (covariant); `in T` makes it consumer-oriented (contravariant). Invariant types both consume and produce values and therefore cannot safely vary in either direction. Kotlin uses declaration-site variance and use-site projections. On the JVM, most generic type arguments are erased at runtime, so `value is List<String>` cannot generally verify the element type.

## Worked example

```kotlin
interface Source<out T> { fun next(): T }
interface Sink<in T> { fun accept(value: T) }
fun printAll(source: Source<String>, sink: Sink<CharSequence>) {
    sink.accept(source.next())
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Variance is a safety rule, not just syntax. A producer cannot safely accept arbitrary values of its type parameter; a consumer cannot safely promise to return that parameter. `reified` type parameters work only for inline functions and do not magically restore every erased nested type check. Validate deserialized collections element by element.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Adding `out` or `in` to silence an error without understanding use sites; assuming runtime generic arguments are fully available; unchecked casts from external input.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a producer interface and a consumer interface. Explain which subtype substitutions are safe and write a test for an invalid external payload.
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
