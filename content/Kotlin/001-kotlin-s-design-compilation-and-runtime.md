# 001. Kotlin’s design, compilation, and runtime

## Learning objectives

By the end of this lesson, you should be able to:

- Explain Kotlin’s goals, compilation pipeline, targets, and the difference between language guarantees and runtime behavior.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin is statically typed: the compiler checks many mistakes before execution, but types do not prove that business rules are correct. On the JVM, Kotlin source is compiled to class files and runs on the Java Virtual Machine. The Kotlin standard library provides collection and language utilities; Java platform libraries remain separate APIs. Kotlin can also target JavaScript and native binaries, while Kotlin Multiplatform lets projects share selected source sets across platforms. A shared syntax does not imply identical platform capabilities.

## Worked example

```kotlin
fun main() {
    val message: String = "Hello, Kotlin"
    println(message)
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

The compiler parses source, resolves names and types, performs checks, and emits target-specific output. Runtime behavior still depends on libraries, environment, threading, input, and resource limits. Kotlin/JVM interoperability is powerful, but Java platform types can weaken null-safety at boundaries.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Confusing Kotlin the language with the JVM; assuming every library is multiplatform; treating successful compilation as proof of correctness.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Draw the source-to-runtime pipeline for a JVM program. Then list three failures that can happen after compilation and explain how to test for each.
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
