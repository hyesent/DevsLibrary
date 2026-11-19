# 032. Security fundamentals for Kotlin applications

## Learning objectives

By the end of this lesson, you should be able to:

- Apply input validation, least privilege, safe storage, and careful logging.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Kotlin’s type system helps express constraints but does not eliminate injection, authorization, insecure storage, or supply-chain risks. Validate external data, parameterize database queries, use vetted cryptographic libraries, and store secrets in appropriate platform facilities. Authentication answers who a caller is; authorization answers what they may do. Enforce authorization on the trusted server, not only in client UI code.

## Worked example

```kotlin
// Conceptual rule: pass data as a parameter, never splice untrusted text into SQL.
// Use your database library’s parameter-binding API for actual queries.
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Do not implement custom cryptography. Use platform cryptographic APIs and well-maintained libraries with reviewed algorithms and key management. Avoid logging access tokens, passwords, personal data, or full untrusted payloads. Dependency updates, signature verification, build secrets, and reproducible builds are part of application security.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Hardcoding secrets in source; relying on client-side role checks; writing custom encryption; logging credentials during debugging.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Threat-model a small Kotlin service. Identify assets, trust boundaries, attacker-controlled inputs, authorization checks, sensitive logs, and dependency risks.
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
