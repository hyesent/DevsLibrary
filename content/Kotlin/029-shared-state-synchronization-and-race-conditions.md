# 029. Shared state, synchronization, and race conditions

## Learning objectives

By the end of this lesson, you should be able to:

- Recognize data races and choose confinement, atomic operations, or locks.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Coroutines can interleave even on one thread, and multiple threads can execute concurrently. A read-modify-write sequence such as `counter++` is not automatically atomic. Strategies include thread confinement, immutable messages, atomic variables, mutexes, and concurrent collections. Choose the simplest mechanism that matches the invariant. A mutex protects a critical section only when all relevant access follows the same synchronization rule.

## Worked example

```kotlin
val mutex = Mutex()
var balance = 0
suspend fun add(amount: Int) {
    mutex.withLock { balance += amount }
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Avoid holding locks across slow external calls when doing so blocks unrelated work. Atomic variables are good for simple atomic state changes but not for multi-field invariants without a suitable protocol. Test concurrent behavior with controlled synchronization where possible; timing-only tests can miss races.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming a single coroutine means no race; protecting writes but not reads; locking around a large operation that includes network calls.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Implement a shared counter with a mutex and compare it to an unsafe version under concurrent increments. Explain what property is guaranteed and what is not.
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
