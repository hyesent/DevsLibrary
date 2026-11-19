# 035. Android Kotlin foundations and lifecycle

## Learning objectives

By the end of this lesson, you should be able to:

- Understand Android components, lifecycle ownership, and platform constraints.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Android apps run within a component and process lifecycle managed by the operating system. Activities and fragments can be recreated; process memory can disappear; background execution is constrained. Do not treat an Activity instance as a permanent application container. Keep durable state in a repository or persistence layer, use lifecycle-aware APIs for UI observation, and restore transient UI state intentionally.

## Worked example

```kotlin
// Conceptual ViewModel state holder
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()
    fun increment() { _count.update { it + 1 } }
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Use the Android documentation and project’s selected Android Gradle Plugin/SDK versions for exact setup. Separate configuration changes from process death: a ViewModel can survive configuration recreation but is not durable storage. Request permissions in context, handle denial, and avoid blocking the main thread. Network access must be asynchronous and resilient to offline conditions.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Keeping all state in an Activity; assuming ViewModel data survives process death; performing blocking disk/network work on the main thread; assuming permission grants never change.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Build a screen that displays a count and restores an appropriate state after rotation. Explain what happens after process death and which data needs persistent storage.
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
