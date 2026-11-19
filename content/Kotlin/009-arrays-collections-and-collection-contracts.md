# 009. Arrays, collections, and collection contracts

## Learning objectives

By the end of this lesson, you should be able to:

- Choose collection interfaces and implementations based on the required operations.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin distinguishes read-only interfaces (`List`, `Set`, `Map`) from mutable interfaces (`MutableList`, `MutableSet`, `MutableMap`). Read-only means the reference does not expose mutating operations; it does not prove that no other reference can mutate the underlying object. Lists preserve order and allow duplicates; sets model uniqueness; maps associate keys with values. Arrays have a fixed size and are useful when interoperability or primitive arrays matter.

## Worked example

```kotlin
val tags: Set<String> = setOf("kotlin", "android")
val scores = mutableMapOf("Ada" to 10)
scores["Linus"] = 12
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Know the cost of operations. Indexing an array or array-backed list is typically constant-time; searching a list is linear; hash map operations are typically constant-time on average but depend on hashing and collisions. Choose `IntArray` for primitive integer storage on JVM when appropriate, rather than assuming `Array<Int>` has identical representation. Preserve insertion order only when it is part of the required contract.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Choosing a list when uniqueness is required; assuming every collection operation is constant-time; exposing mutable internal collections directly.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Given a contact directory, choose data structures for lookup by ID, ordered display, and unique labels. Explain the operation costs and mutation policy.
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
