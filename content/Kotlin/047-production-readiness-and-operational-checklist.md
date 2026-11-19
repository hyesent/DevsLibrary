# 047. Production readiness and operational checklist

## Learning objectives

By the end of this lesson, you should be able to:

- Prepare a Kotlin application for real users, failures, and future maintenance.
- Explain the guarantee this technique provides and the cases it does not cover.
- Select an appropriate design for a real project and justify the trade-offs.
- Test normal behavior, boundaries, and at least one failure path.

## Core lesson

Production readiness combines correctness, security, observability, performance, compatibility, and recovery. Define supported platforms and versions, configure safe defaults, document failure behavior, and provide a rollback or migration plan. For services, health checks and metrics should reflect actual ability to serve work. For mobile apps, monitor crashes and performance with privacy-aware telemetry and account for offline operation and OS restrictions.

## Worked example

```kotlin
// A release checklist should be checked into the repository and adapted to the app.
// Verify: tests, migration, permissions, secrets, logging, rollback, compatibility.
```

Read the example in terms of inputs, outputs, state changes, and possible failures. Identify which assumptions are enforced by the compiler and which remain a responsibility of the programmer. For production code, add the imports, dependencies, error handling, and platform-specific configuration required by the actual project. Snippets are intentionally focused; they are not substitutes for a complete runnable project.

## Deeper reasoning and edge cases

Operational signals need context: a high error rate can be caused by a dependency, a bad release, or a traffic spike. Avoid collecting more personal data than necessary. Database migrations must account for deployed old and new application versions when rollouts overlap. Define who responds to incidents and how a release can be disabled or reverted.

When this topic crosses a system boundary, treat the other side as potentially different from your assumptions. Data may be missing or malformed; dependencies may fail; execution may be cancelled; the process may restart; or the target platform may have different capabilities. Write down the contract at that boundary and make it observable in tests.

## Common mistakes

- Shipping without a rollback plan; logging sensitive data; applying irreversible migrations without backup strategy; treating “works on my machine” as release evidence.
- Solving a symptom at the call site instead of making the underlying invariant explicit.
- Testing only a successful, small, in-memory example and assuming that proves production behavior.
- Depending on undocumented runtime behavior or an unpinned toolchain version.

## Practice and implementation tasks

1. **Implement:** Create a release checklist for the capstone. Include build provenance, tests, migration strategy, secrets review, telemetry, crash handling, accessibility, and rollback criteria.
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
