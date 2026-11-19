# 021. Equality, hashing, ordering, and identity

## Learning objectives

By the end of this lesson, you should be able to:

- Choose the correct equality contract for domain objects and collections.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin’s `==` calls structural equality (with null-safe semantics), while `===` checks reference identity. On JVM objects, `equals` and `hashCode` must agree: equal objects must have equal hash codes. Hash-based collections rely on stable equality and hash behavior while an object is stored. Ordering is a separate contract implemented by `Comparable` or a `Comparator`; a comparator should be consistent with the intended notion of ordering.

## Worked example

```kotlin
data class UserKey(val tenant: String, val id: String)
val a = UserKey("acme", "42")
val b = UserKey("acme", "42")
check(a == b)
check(a !== b)
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Mutable fields participating in equality are dangerous when an object is a key in a `HashMap` or member of a `HashSet`: after mutation, lookup may fail because the object is in the wrong bucket. If identity matters, state that explicitly rather than accidentally relying on references. Test comparator ties and null ordering.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Using `===` for ordinary value comparison; mutating hash keys; implementing `equals` without `hashCode`; assuming sort order defines uniqueness.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a key type and use it in a map. Demonstrate why immutable key fields matter and define a comparator for stable multi-field sorting.
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
