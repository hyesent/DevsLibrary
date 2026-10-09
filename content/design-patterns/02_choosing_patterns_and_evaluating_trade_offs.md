# Choosing Patterns and Evaluating Trade-offs

## Learning goals
Choose patterns based on actual change pressure, and explain the costs that come with them.

## 1. Start from the change you expect
A pattern is most useful when it isolates a meaningful source of change. Examples include adding a new export format, replacing a vendor SDK, introducing a new pricing policy, or coordinating a multi-step workflow.

Avoid designing around every imaginable future. Speculative flexibility can make the current design harder to understand without ever being used.

## 2. Use a small decision record
For a proposed pattern, record:
- The concrete pain or requirement.
- The smallest design that would meet it.
- The pattern being considered and why.
- Costs, alternatives, and conditions for revisiting the choice.

This keeps “we use Strategy because it is clean” from becoming an unexamined rule.

## 3. Compare designs with a concrete example
Suppose an app exports reports as CSV or JSON.

**Simple conditional:** appropriate for two small, stable branches.

**Strategy:** appropriate when formats have substantial, independent behavior, are selected dynamically, or are added by separate modules.

**Plugin system:** justified only if independent packages must register formats or be loaded without changing the host application. It requires a lifecycle, validation, versioning, and security model.

These are not three levels where the most abstract is always best. Choose the least complex design that meets real requirements.

## 4. Coupling and cohesion
**Coupling** describes how strongly one component depends on another. **Cohesion** describes how well the responsibilities inside a component belong together. A good design usually reduces unnecessary coupling and keeps related behavior together, but neither concept means “make every class tiny.”

Interfaces can reduce compile-time or source-level dependencies while leaving runtime dependencies intact. A system can have many interfaces and still be tightly coupled through shared databases, global state, timing assumptions, or deployment requirements.

## 5. Beware of hidden costs
Patterns can add:
- Indirection and navigation overhead.
- More objects and interfaces.
- Harder debugging due to dynamic dispatch.
- Configuration complexity.
- More places where behavior can be inconsistent.

Evaluate whether the pattern makes the important change easier, not whether the class diagram looks elegant.

## Exercise
For a feature that supports email and SMS notifications, write two designs: a direct conditional and a common notification interface. List the requirements under which you would move from the first design to the second. Include a requirement that would make a plugin architecture excessive.

## Summary
Use patterns to address a real pressure on the design. Keep the simplest workable option, and revisit it when the pressure changes.
