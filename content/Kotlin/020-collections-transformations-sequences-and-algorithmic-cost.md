# 020. Collections: transformations, sequences, and algorithmic cost

## Learning objectives

By the end of this lesson, you should be able to:

- Build expressive pipelines while tracking allocation, order, and complexity.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Functions such as `map`, `filter`, `groupBy`, `associateBy`, `fold`, `reduce`, `sortedBy`, and `distinct` express common transformations. Eager collection operations usually create intermediate collections; sequences can defer operations and may reduce intermediate allocations for suitable pipelines, but add their own overhead. The best choice depends on data size, pipeline shape, and readability. `associateBy` keeps one value per key, so duplicate keys overwrite earlier values.

## Worked example

```kotlin
val totals = orders
    .asSequence()
    .filter { it.isPaid }
    .groupBy { it.customerId }
    .mapValues { (_, orders) -> orders.sumOf { it.totalCents } }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Know semantic details: `first` throws if no element matches; `firstOrNull` represents absence; `single` asserts exactly one match. `sortedBy` sorts the full input. A sequence does not automatically make an algorithm faster, and it can be counterproductive for tiny collections. Use profiling for real bottlenecks.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Assuming sequences are always faster; ignoring duplicate-key behavior; using `reduce` on possibly empty input; chaining transformations without considering memory.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** For a dataset of orders, compute paid totals per customer. Explain the intermediate data structures and test an empty dataset and duplicate customer IDs.
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
