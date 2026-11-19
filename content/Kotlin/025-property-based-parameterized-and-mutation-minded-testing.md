# 025. Property-based, parameterized, and mutation-minded testing

## Learning objectives

By the end of this lesson, you should be able to:

- Expand test coverage beyond a handful of hand-picked examples.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Example-based tests prove behavior for selected inputs. Parameterized tests run the same contract over a table of cases. Property-based testing generates many inputs and checks general invariants such as round-trip serialization, sorting order, or parse/format consistency. Mutation testing evaluates whether tests detect deliberately introduced defects. These techniques complement rather than replace readable examples and regression tests.

## Worked example

```kotlin
// Example invariant to test for many generated lists:
// result is sorted, contains every original item, and has the same size.
fun sortedCopy(values: List<Int>): List<Int> = values.sorted()
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Generators must include edge cases rather than producing only ordinary values. Shrinking helps reduce a failing generated input to a simpler counterexample. Property tests need mathematically correct properties; an incorrect property can reject valid implementations. Mutation scores are signals, not absolute measures of quality.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Generating only positive numbers when negatives matter; asserting implementation details instead of invariants; interpreting a high mutation score as proof of correctness.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Define properties for a parser or sorting function. Include empty input, duplicates, extreme integer values, and Unicode where relevant.
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
