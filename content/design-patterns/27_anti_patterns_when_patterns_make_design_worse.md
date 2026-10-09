# Anti-Patterns: When Patterns Make Design Worse

## 1. Pattern fever
A pattern is not a scorecard. Adding Abstract Factory, Builder, Adapter, and Facade to a two-field configuration object can make a small task harder than the direct implementation.

## 2. The god object
A single manager, service, mediator, or facade that owns unrelated responsibilities becomes hard to test and risky to change. Split by cohesive responsibility, not by arbitrary line counts.

## 3. Interface for every class
Interfaces are valuable at boundaries and where behavior must vary. An interface that has exactly one implementation, no meaningful contract, and no likely variation may only duplicate names. There are valid reasons for single-implementation interfaces, but “every class must have one” is not sufficient reasoning.

## 4. Inheritance as default reuse
Subclassing can couple a child to base-class assumptions and lifecycle hooks. Prefer composition when behavior needs to be assembled independently. Use inheritance when there is a stable substitutable relationship and the base contract is designed for extension.

## 5. Hidden global coordination
A global event bus or service locator can make dependencies invisible and execution order difficult to trace. Use direct calls for simple, synchronous relationships and events where decoupling genuinely matters.

## 6. Abstraction leaks
An Adapter that exposes vendor types, a Repository that exposes ORM query objects everywhere, or a Facade that leaks internal workflow steps may not provide the boundary its name promises.

## 7. Premature flexibility
Do not add plugin registries, generic factories, or configurable pipelines for speculative requirements. First identify a real source of variation. Refactor when the need becomes concrete, while keeping an eye on the cost of delayed change.

## Review checklist
- Does the abstraction have a clear owner?
- Is its contract smaller than the implementation details it hides?
- Can a reader trace the main flow?
- Are failure and lifecycle behaviors explicit?
- Would deleting the abstraction make the code simpler without making change harder?

## Summary
Good design is not the maximum number of patterns. It is the minimum complexity that expresses the requirements and leaves sensible room for change.
