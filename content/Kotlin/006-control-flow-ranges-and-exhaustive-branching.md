# 006. Control flow, ranges, and exhaustive branching

## Learning objectives

By the end of this lesson, you should be able to:

- Use expressions to make decisions explicit and exhaustive.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

In Kotlin, `if` and `when` can produce values. `when` can match values, ranges, types, and predicates. For sealed hierarchies and enums, an exhaustive `when` lets the compiler identify missing cases when the hierarchy changes. Use ranges such as `1..10` for inclusive endpoints and `until` for an exclusive upper endpoint. Labels and non-local returns inside nested lambdas deserve care because they can change which scope exits.

## Worked example

```kotlin
val label = when (status) {
    "ready" -> "Ready"
    "busy" -> "Working"
    else -> "Unknown"
}
for (index in 0 until items.size) println(items[index])
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Prefer iteration over collections when indices are not needed. When using indices, avoid off-by-one errors: `0..items.size` includes an invalid final index for a nonempty list, while `0 until items.size` does not. A `when` with a broad `else` may hide a newly added state; sealed domain states often benefit from exhaustive handling.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Off-by-one ranges; nested `if` statements that obscure state; a default branch that silently ignores a new business state.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Model a download as queued, running, complete, or failed. Render every state using an exhaustive `when` and test the transition labels.
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
