# 005. Null safety and platform boundaries

## Learning objectives

By the end of this lesson, you should be able to:

- Model absence explicitly and prevent null-related failures.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

A type such as `String` excludes null; `String?` includes it. Safe-call `?.` executes a member access only when the receiver is non-null. The Elvis operator `?:` supplies an alternative or can return/throw. `!!` asserts that a value is non-null and throws if the assertion is wrong; it should not be a routine way to silence the compiler. Null-safety is strongest inside Kotlin code and can be weakened by Java platform types, reflection, deserialization, or unsafe libraries.

## Worked example

```kotlin
fun displayName(raw: String?): String = raw?.trim()?.takeIf { it.isNotEmpty() } ?: "Anonymous"
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not confuse “missing” with “invalid” or “not loaded.” Those may require distinct states. At external boundaries, validate input and convert it into a domain representation. Java interop may expose a platform type (`T!`) where Kotlin cannot guarantee nullability. Check results from Java APIs and annotate Java declarations where possible. Avoid chains of `!!`; they hide the actual boundary that needs a check.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Using `!!` to bypass compiler errors; turning invalid values into plausible defaults without a product decision; assuming JSON fields are trustworthy because a Kotlin property is non-null.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Implement a parser for an optional age string. Distinguish absent, malformed, negative, and valid input rather than returning one default for all failures.
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
