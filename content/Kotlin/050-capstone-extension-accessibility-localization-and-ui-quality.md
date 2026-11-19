# 050. Capstone extension: accessibility, localization, and UI quality

## Learning objectives

By the end of this lesson, you should be able to:

- Make Kotlin-powered applications usable across abilities, languages, and device configurations.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Application correctness includes how people perceive and operate the interface. Android and Compose screens need meaningful semantics, focus behavior, adequate touch targets, and content descriptions for informative imagery. Text should resize without clipping. Externalized strings enable localization; avoid concatenating sentence fragments because grammar and word order differ across languages. Layouts should tolerate long labels, right-to-left direction, and different screen sizes.

## Worked example

```kotlin
// Compose example
IconButton(onClick = onDelete) {
    Icon(Icons.Default.Delete, contentDescription = stringResource(R.string.delete_task))
}
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not add redundant descriptions to decorative icons. Test with TalkBack, large font settings, keyboard/switch access where relevant, and localized pseudo-long strings. Dates, numbers, and currency should use locale-aware formatting. Accessibility cannot be reliably proven by color contrast alone or by a single automated scanner.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Hardcoding visible strings; relying on color alone for state; using vague labels like “button”; testing only one font size and locale.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Audit the capstone’s create/edit/list flow with screen reader semantics, large text, localization, and error messages. Document both automated and manual checks.
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
