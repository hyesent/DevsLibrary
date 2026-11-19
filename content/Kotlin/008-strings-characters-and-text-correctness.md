# 008. Strings, characters, and text correctness

## Learning objectives

By the end of this lesson, you should be able to:

- Work safely with string templates, Unicode, and text processing.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

String templates (`"Hello, $name"` and `"${user.name}"`) improve readability. Kotlin strings are immutable values, but repeated concatenation in a loop can create unnecessary intermediate objects; use `buildString` or a builder for substantial assembly. A `Char` is a UTF-16 code unit on the JVM, not necessarily a complete user-perceived character. Emojis and some historic scripts use surrogate pairs or multiple code points, and visible grapheme clusters can contain several code points.

## Worked example

```kotlin
val report = buildString {
    appendLine("Summary")
    append("Items: ")
    append(3)
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

For user-visible text, do not assume `text.length` equals the number of visible characters. Normalize and compare Unicode only when the domain requires it, and be careful with security-sensitive identifiers, confusable characters, and locale-dependent case conversion. Use locale-aware formatting for dates and numbers. Escape or parameterize data according to its destination (HTML, SQL, shell, logs); string interpolation is not output encoding.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Counting UTF-16 code units as visible characters; concatenating large strings in a tight loop; treating interpolation as SQL or HTML sanitization.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a summary containing user-provided text. Test quotes, newlines, emoji, empty strings, and long input; explain what your length calculation measures.
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
