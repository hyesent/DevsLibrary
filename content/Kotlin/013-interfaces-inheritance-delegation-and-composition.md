# 013. Interfaces, inheritance, delegation, and composition

## Learning objectives

By the end of this lesson, you should be able to:

- Use abstraction without making behavior unpredictable.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin classes are final by default. `open` opts into inheritance; interfaces can declare abstract members and default implementations. Multiple interfaces can contribute members, so conflicting defaults may require an explicit override. Delegation (`by`) can forward an interface implementation to another object and is often less fragile than inheritance for reuse. Composition keeps dependencies explicit and lets tests substitute implementations.

## Worked example

```kotlin
interface Clock { fun nowMillis(): Long }
class ExpiryPolicy(private val clock: Clock) {
    fun isExpired(deadline: Long) = clock.nowMillis() >= deadline
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Dependency injection does not require a large framework. Passing a `Clock`, repository, or transport interface can make behavior deterministic in tests. Avoid interfaces with only one implementation when they add no useful seam or contract. If inheritance is needed, document which methods subclasses may override and preserve the base class’s behavioral promises.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Creating deep base-class hierarchies; overriding behavior in ways callers cannot predict; mocking every tiny class without a clear test seam.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Refactor a service that reads system time directly so a clock can be injected. Test the before-deadline and after-deadline cases without waiting.
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
