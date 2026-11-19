# 045. Date/time, locale, and deterministic domain logic

## Learning objectives

By the end of this lesson, you should be able to:

- Represent time and formatting without hidden timezone assumptions.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Time values have different meanings: an instant on the global timeline, a local date, a local time, and a timezone-aware date-time are not interchangeable. Persist instants or explicit domain dates according to requirements; format them for display using locale-aware APIs. Inject a clock into business logic so expiry and scheduling behavior can be tested deterministically.

## Worked example

```kotlin
interface Clock { fun now(): Instant }
fun isPast(deadline: Instant, clock: Clock): Boolean = clock.now() >= deadline
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Daylight-saving transitions create local times that may be missing or ambiguous. A birthday is usually a local date, not midnight UTC. A timestamp from an external system needs a documented timezone/offset contract. For multiplatform projects, select a date/time library and verify its target support and version.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Storing dates as ambiguous strings; using the machine’s default timezone in business rules; testing time-sensitive code against the real current clock.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Model a due date and an expiration instant. Explain the difference, then test both using a fixed clock around a timezone or boundary transition.
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
