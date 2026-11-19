# 012. Data classes, enums, sealed hierarchies, and value classes

## Learning objectives

By the end of this lesson, you should be able to:

- Represent domain states and values without losing semantic distinctions.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Data classes generate structural equality, `hashCode`, `toString`, `componentN`, and `copy` based primarily on primary-constructor properties. `copy` is shallow: mutable objects referenced by properties are not deep-copied. Enums model a fixed set of named constants. Sealed classes and interfaces model a controlled family of subtypes, making exhaustive branching possible. Value classes can wrap a value to express a domain concept with less accidental mixing, subject to target and boxing rules.

## Worked example

```kotlin
sealed interface LoadState {
    data object Loading : LoadState
    data class Success(val count: Int) : LoadState
    data class Failure(val message: String) : LoadState
}
fun label(s: LoadState) = when (s) {
    LoadState.Loading -> "Loading"
    is LoadState.Success -> "Loaded ${s.count}"
    is LoadState.Failure -> "Failed: ${s.message}"
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not use nullable fields to encode multiple unrelated states when a sealed model would make valid states clearer. Equality semantics matter for collections and caching. A data class containing a mutable list can change its effective hash code if that list participates in equality and is mutated after insertion into a hash set/map. Confirm language-version requirements for features such as data objects and value classes.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming `copy()` is deep; using strings for every identifier; representing loading, success, and failure with several loosely related nullable properties.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Design a sealed result type for a file import, including success counts and distinct failure reasons. Make the consumer handle every case.
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
