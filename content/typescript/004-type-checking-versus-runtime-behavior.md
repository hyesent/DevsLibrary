---
title: "Type checking versus runtime behavior"
order: 4
book: "typescript"
---

# Type checking versus runtime behavior

## What this lesson is really about

This lesson teaches **Type checking versus runtime behavior** as part of TypeScript's type system and development workflow.

TypeScript should be understood as a layer on top of JavaScript—not as a replacement runtime.

## Mental model

Keep these layers separate:

```text
JavaScript language
        ↓
TypeScript type system
        ↓
Type checking / transformation
        ↓
JavaScript output
        ↓
runtime
```

A TypeScript type describes what a value is expected to look like. The JavaScript runtime still executes actual values.

## Core idea

Do not memorize syntax in isolation. Ask:

1. What does TypeScript know before the program runs?
2. What exists only during type checking?
3. What still exists at runtime?
4. What relationship between values is the type expressing?
5. What happens if the runtime receives data that violates the expected type?

## Example

```ts
type User = {
  id: number;
  name: string;
};

function greet(user: User): string {
  return `Hello ${user.name}`;
}

const user: User = {
  id: 1,
  name: "Ada"
};

console.log(greet(user));
```

Read this architecturally:

- `User` describes a shape.
- `user` is an actual runtime object.
- The annotation lets TypeScript check how that object is used.
- `greet` declares an input and output contract.
- The runtime eventually executes JavaScript.

## Connection to JavaScript

Everything from JavaScript still matters:

- values are still values,
- objects are still objects,
- functions still execute,
- closures still close over scope,
- promises still handle asynchronous work,
- the DOM is still the DOM.

TypeScript adds a **static reasoning layer** over that behavior.

## Practice

Explain the concept without looking at the lesson.

Then change the example and predict what TypeScript should report before running it.

## Key takeaway

**Use TypeScript to make program relationships, possible states, and boundaries explicit—not to add complexity for its own sake.**
