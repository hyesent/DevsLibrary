# 030. Resource management, files, and lifecycle

## Learning objectives

By the end of this lesson, you should be able to:

- Keep resources bounded and close them reliably.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Files, streams, sockets, database cursors, and other resources have lifetimes. Use `use` for `Closeable`/`AutoCloseable` resources where applicable so cleanup happens even when a block throws. Distinguish a coroutine’s lifetime from a resource’s lifetime: cancellation should trigger cleanup, but only if code is written to cooperate. In Android, activity and screen lifecycles add ownership constraints for UI-related resources.

## Worked example

```kotlin
File(path).bufferedReader().use { reader ->
    reader.lineSequence().take(100).toList()
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not read an unbounded file fully into memory unless size is controlled. For network streams, handle partial reads, timeouts, and cancellation. Ensure temporary files and sensitive buffers are treated appropriately. Resource cleanup should not hide the original exception; language/library constructs generally preserve suppressed exceptions, but custom cleanup logic must be careful.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Forgetting to close streams; loading unbounded data into memory; retaining activity references in long-lived objects; treating cancellation as guaranteed cleanup without `finally`/`use`.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Write a file-processing function that handles empty and large inputs, closes the stream on failure, and does not keep the whole file in memory.
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
