# 031. Performance, allocation, and profiling

## Learning objectives

By the end of this lesson, you should be able to:

- Measure before optimizing and connect costs to actual user-visible behavior.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Performance depends on algorithmic complexity, allocations, I/O, synchronization, garbage collection, and target hardware. Kotlin collection pipelines can allocate intermediate objects; boxing can occur around generic primitives; string building and reflection can be costly in hot paths. But micro-optimizing readable code without measurements often wastes time. Establish a workload, measure a baseline, identify the bottleneck, change one thing, and measure again.

## Worked example

```kotlin
// Prefer a single-pass aggregate when it improves clarity and avoids needless intermediates.
val total = orders.asSequence()
    .filter { it.isPaid }
    .sumOf { it.totalCents }
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

On JVM, use a profiler and benchmark harness suitable for the workload; account for JIT warmup, dead-code elimination, and variance. On Android, measure startup, frame time, memory, and battery under realistic conditions. Big-O is useful but does not include constants, allocation pressure, or I/O. Keep correctness tests when optimizing.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Using wall-clock measurements from one run; optimizing the wrong layer; trading correctness for tiny gains; assuming `Sequence` is always faster.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Benchmark two implementations on representative data. Record input sizes, warmup strategy, runtime environment, allocation behavior if available, and whether the difference matters.
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
