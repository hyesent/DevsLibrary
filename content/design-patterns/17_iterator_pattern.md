# Iterator Pattern

## Intent
Provide a way to traverse a collection without exposing how the collection is represented.

## Modern language support
JavaScript and TypeScript already have iterator protocols. A generator can implement a traversal without requiring callers to know the internal structure.

```ts
type TreeNode = { value: string; children: TreeNode[] };

function* depthFirst(root: TreeNode): Generator<string> {
  yield root.value;
  for (const child of root.children) {
    yield* depthFirst(child);
  }
}
```

A caller can use `for (const value of depthFirst(tree))`. This is depth-first pre-order traversal: each node is yielded before its children.

## Why an iterator abstraction?
It separates traversal from consumption. The same collection might support depth-first, breadth-first, filtered, or paginated traversal. Iterators can also support lazy data processing, avoiding a full intermediate array.

## Important limits
The recursive example can overflow the call stack for a very deep tree and assumes there are no cycles. A robust graph traversal may need an explicit stack and a visited set. Iterating a live mutable collection raises questions about whether changes are visible during traversal.

## Summary
Iterator hides traversal mechanics behind a common protocol. Prefer built-in iteration where it already expresses the behavior clearly.
