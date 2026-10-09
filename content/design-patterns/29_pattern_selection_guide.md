# Pattern Selection Guide

Use this as a starting point, not as a mechanical mapping from every problem to a pattern.

| Design pressure | Possible approach | Main caution |
|---|---|---|
| Several interchangeable algorithms | Strategy | Selection and configuration still need an owner |
| Notify interested components of a change | Observer / pub-sub | Lifecycle, ordering, and reliability |
| Centralize object creation choices | Factory | Avoid a factory for trivial construction |
| Create related product families | Abstract Factory | New product types can make all factories change |
| Many optional construction steps | Builder | May be excessive for simple data |
| Translate a vendor or legacy interface | Adapter | Do not leak the old contract |
| Simplify a complex subsystem | Facade | Do not create a god object |
| Add behavior around an object | Decorator | Wrapping order and contract preservation |
| Mediate access to a resource | Proxy | Security and cache correctness |
| Treat leaves and groups uniformly | Composite | Tree invariants and leaf-specific behavior |
| Store or queue an operation | Command | Retry and undo semantics |
| Behavior changes by lifecycle state | State | A small enum may be enough |
| Stable workflow with variable steps | Template Method | Inheritance coupling |
| Traverse without exposing representation | Iterator | Mutation and traversal complexity |
| Sequential request handlers | Chain of Responsibility | Ordering and omitted handlers |
| Coordinate a group of collaborators | Mediator | Central mediator can grow too large |
| Save and restore state | Memento | Memory and sensitive history |
| Add operations to stable element types | Visitor | New element types are expensive |
| Abstract domain data access | Repository | Avoid wrapping every ORM call without benefit |
| Supply dependencies from outside | Dependency Injection | Do not overbuild a container |

## A four-question decision process
1. **What is changing?** Identify the variation or complexity, not just the code shape.
2. **Where should it live?** Choose the component that owns the decision or invariant.
3. **What guarantee is needed?** Interface compatibility, transactionality, access control, durability, or merely readability are different goals.
4. **What is the simplest adequate design?** Compare against direct functions, conditionals, and modules.

## Capstone: DevsLibrary book delivery
Imagine a service that builds a ZIP for a book:
- A `BookSource` retrieves lesson files.
- A `ZipWriter` packages them.
- A `MetadataValidator` checks chapter references.
- A `DeliveryService` coordinates the workflow.
- A `StorageAdapter` translates between the service's storage contract and a cloud provider.
- A `Notifier` sends a completion message.

Before implementing every pattern, decide which variation exists today. The adapter is justified if storage providers differ. A facade-like delivery service may be justified if callers should invoke one workflow. A Strategy is useful only if packaging policies genuinely vary. If there is one stable implementation for each step, simple composition may be enough.

## Capstone tasks
1. Draw the dependency direction.
2. State which component owns validation and what happens if it fails.
3. Decide whether delivery is atomic. If it is not, specify cleanup or recovery.
4. Define how duplicate jobs are detected.
5. Write tests for malformed metadata, missing lessons, storage failure, and repeated delivery.
6. Document one architecture decision and one rejected alternative.

## Final principle
Patterns are tools for making important design decisions visible. Their value is measured by clarity, testability, and the cost of future change—not by how many pattern names appear in the code.
