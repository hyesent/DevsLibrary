# 024. Testing strategy and Kotlin test design

## Learning objectives

By the end of this lesson, you should be able to:

- Build deterministic unit tests and select test doubles carefully.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A good test observes externally meaningful behavior rather than mirroring implementation details. Unit tests are fast and isolate logic; integration tests verify collaboration with real dependencies; end-to-end tests verify important user flows across boundaries. Arrange, act, and assert is a useful structure, but test names should state the behavior and condition. Prefer injecting time, randomness, and I/O interfaces over sleeping or relying on machine state.

## Worked example

```kotlin
class PriceTest {
    @Test fun `discount is applied to valid price`() {
        assertEquals(85.0, discountedPrice(100.0, 0.15), 0.0001)
    }
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

For money, test the actual chosen representation and rounding policy rather than relying on approximate `Double` equality. Test boundary values, failure paths, and invariants. Avoid excessive mocks: mocks are useful at system boundaries, but faking every collaborator can make tests pass while the real components do not work together. Keep tests isolated and deterministic.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Testing only happy paths; sleep-based timing tests; asserting private implementation details; a mock setup so complex it obscures behavior.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write tests for one pure function, one invalid-input case, and one integration boundary. Make the tests fail before implementing the behavior, then pass after the change.
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
