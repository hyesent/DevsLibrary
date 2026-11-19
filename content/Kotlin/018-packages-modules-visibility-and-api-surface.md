# 018. Packages, modules, visibility, and API surface

## Learning objectives

By the end of this lesson, you should be able to:

- Control encapsulation across files and modules.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin visibility includes `public`, `internal`, `protected`, and `private`. `internal` limits declarations to a compilation module, not a package. `protected` is for subclasses, while top-level declarations can be private to a file. Public declarations become a compatibility promise: consumers may compile against names, signatures, default arguments, and behavior. A clean module boundary exposes stable concepts and hides implementation details.

## Worked example

```kotlin
internal class JsonCache
public interface UserRepository { suspend fun find(id: UserId): User? }
@JvmInline value class UserId(val value: String)
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Module boundaries should reflect ownership and change rate, not simply file count. Keep implementation classes internal where possible, and expose domain interfaces or functions that callers genuinely need. Binary compatibility on the JVM has details around generated methods, overloads, and default arguments; library maintainers should use compatibility checks when shipping public artifacts.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Making everything public; confusing package boundaries with module boundaries; exposing framework implementation types as permanent API contracts.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Design a public API for a small library. Mark which declarations should be public, internal, and private and justify each choice.
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
