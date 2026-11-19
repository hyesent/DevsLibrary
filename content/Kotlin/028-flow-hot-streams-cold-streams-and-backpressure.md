# 028. Flow, hot streams, cold streams, and backpressure

## Learning objectives

By the end of this lesson, you should be able to:

- Choose Flow, StateFlow, SharedFlow, and channels based on data semantics.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A cold `Flow` starts its upstream work for each collection. `StateFlow` represents a current state and replays the latest value to new collectors; it conflates updates when collectors are slow. `SharedFlow` broadcasts events according to replay and buffer configuration. Channels provide suspending communication between coroutines and have ownership/closing semantics. These abstractions solve different problems: state, broadcast events, and point-to-point handoff should not be casually interchanged.

## Worked example

```kotlin
val names: Flow<String> = repository.observeUsers()
val normalized = names.map { it.trim() }.distinctUntilChanged()
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Flows are sequential by default unless operators such as `buffer`, `flowOn`, or concurrency operators alter execution. `flowOn` changes the context of upstream operators, not downstream collection. Be explicit about error handling and retry policy. UI collection should respect lifecycle so work does not continue unnecessarily when a screen is stopped.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Using SharedFlow as durable storage; expecting every StateFlow update to be delivered to a slow collector; launching collectors without a lifecycle or owner.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Choose an abstraction for a current connection state, one-off navigation event, and a stream of database rows. Explain replay, buffering, cancellation, and loss semantics.
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
