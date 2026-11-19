# 036. Jetpack Compose state, recomposition, and effects

## Learning objectives

By the end of this lesson, you should be able to:

- Model declarative UI and avoid side effects during composition.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Compose renders UI from state. When observed state changes, recomposition may rerun composable functions; it is not a promise that each function executes exactly once. Composables should be side-effect free during composition. `remember` retains values across recompositions for a composition identity; `rememberSaveable` can save supported UI state across recreation. Effects such as `LaunchedEffect` and `DisposableEffect` tie work or cleanup to composition keys and lifetime.

## Worked example

```kotlin
@Composable
fun Counter(count: Int, onIncrement: () -> Unit) {
    Column {
        Text("Count: $count")
        Button(onClick = onIncrement) { Text("Add") }
    }
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

State hoisting makes a component reusable and testable: state flows down, events flow up. Use stable keys in lazy lists when item identity matters. Avoid launching network calls directly in a composable body. Select effect keys carefully; changing a key cancels and restarts the effect. UI state should represent loading, success, and error explicitly.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Mutating external state during composition; using `remember` for durable data; effect keys that cause repeated requests; storing duplicate copies of the same state in parent and child.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a list screen with loading, empty, error, and success states. Hoist state to a state holder and test recomposition, item identity, and retry behavior.
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
