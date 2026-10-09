# Refactoring Toward a Pattern

## Start with working behavior
A safe refactor changes structure without intentionally changing externally observable behavior. Before extracting a pattern, capture the current behavior with tests or characterization examples, especially around edge cases.

## Example: growing conditional
Suppose a report function handles CSV, JSON, and XML through a long switch. Do not immediately introduce a plugin framework. First:
1. Add tests for each supported format and error behavior.
2. Identify duplicated or format-specific code.
3. Extract one formatter behind a small contract.
4. Move a second formatter behind the same contract.
5. Let the caller select a formatter in one place.
6. Compare the resulting code and tests with the original.

The goal is a clear boundary, not a prescribed number of classes.

## Refactor in small steps
- Keep changes reviewable.
- Run tests after each structural change.
- Preserve logging, errors, ordering, and side effects.
- Avoid combining a behavior change with a large refactor unless the change is separately specified and tested.
- Remove dead code after verifying that it is truly unused.

## When not to refactor
A repeated expression is not necessarily a pattern waiting to emerge. If the code is stable, small, and easy to understand, leaving it alone may be the best design decision.

## Measuring success
Ask whether adding a new variant is easier, whether tests are more focused, whether dependencies are clearer, and whether the new abstraction reduced or increased the reader's mental model. Count of files or classes is not a useful success metric by itself.

## Exercise
Take a real conditional from a small project. Write down its current branches, tests, and likely future change. Refactor it only if the pattern solves a specific problem, then compare both versions.

## Summary
Refactor toward a pattern when the design pressure is visible. Preserve behavior, move incrementally, and evaluate the resulting complexity honestly.
