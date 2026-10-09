# Composite Pattern

## Intent
Represent part-whole hierarchies so clients can work with individual objects and groups through a common interface.

## Example: a learning content tree
```ts
interface ContentNode {
  title(): string;
  estimatedMinutes(): number;
}

class Lesson implements ContentNode {
  constructor(
    private name: string,
    private minutes: number
  ) {}
  title() { return this.name; }
  estimatedMinutes() { return this.minutes; }
}

class Module implements ContentNode {
  constructor(
    private name: string,
    private children: ContentNode[]
  ) {}
  title() { return this.name; }
  estimatedMinutes() {
    return this.children.reduce((sum, child) => sum + child.estimatedMinutes(), 0);
  }
}
```

A module and a lesson can both answer `estimatedMinutes()`. The client can recursively traverse a tree without needing a separate branch for each concrete node type.

## Where it fits
File systems, menu trees, document outlines, scene graphs, and nested learning content are common examples. Composite is most helpful when clients should treat leaves and groups uniformly.

## Design choices
Some composites expose child-management methods on the common interface; others keep them only on container types. A uniform interface is convenient but can make leaf objects support meaningless operations. Choose based on the client operations you need.

## Risks
- Cycles in a structure that is intended to be a tree.
- Extremely deep recursion.
- Expensive repeated aggregate calculations.
- Ambiguous behavior for operations that do not apply to leaves.
- Mutating child arrays without preserving invariants.

## Exercise
Add a `countLessons()` operation. Decide whether it belongs in the interface or is better implemented by a visitor/traversal utility. Explain the trade-off.

## Summary
Composite simplifies operations on hierarchies by giving leaves and groups a shared contract. Keep tree invariants and leaf/container responsibilities explicit.
