---
title: "Closures"
order: 25
book: "javascript"
---

## The idea

A closure is not merely “a function inside another function.” The important property is that a function retains access to the lexical environment in which it was created, even after the surrounding execution has finished.

Consider:

```js
function createCounter() {
  let count = 0;

  return () => {
    count += 1;
    return count;
  };
}

const next = createCounter();
```

When `createCounter` returns, its local `count` binding is no longer reachable through the call stack. Yet `next()` can still access it. The environment survives because the returned function still needs it.

This gives closures architectural power: private state, factories, callbacks, event handlers, memoization, module-like encapsulation, and function factories can all be built from the same mechanism.

The deeper lesson is that JavaScript variables are bindings in lexical environments, not simply boxes that disappear when a function returns. Garbage collection later determines whether those environments can be reclaimed based on reachability.

Closures can therefore also cause memory retention. If a long-lived event listener closes over a large object, that object may remain reachable longer than intended. The same mechanism that gives closures power also creates lifecycle responsibilities.

## What to understand

You should be able to explain **Closures** without relying on memorized wording. Start from the mechanism, not the API name. Identify what JavaScript stores, what it evaluates, what it schedules, or what boundary it crosses.

When two pieces of code look similar but behave differently, compare their bindings, values, invocation context, prototype relationships, or host environment. JavaScript often feels inconsistent only when two different mechanisms are being treated as one.

## Example

A useful exercise is to create a tiny program involving closures, then predict the result before executing it. Change exactly one variable at a time: the value, scope, invocation form, timing, object identity, or host API. Record what changed and why.

For example, when investigating a function or object feature, ask: “What exists before this line? What is created by this line? What reference points to it? What remains reachable after this line?” That turns debugging into a model-building exercise instead of trial and error.

## Architecture reflex

When you encounter **Closures** in a real codebase, ask:

1. What JavaScript mechanism is actually responsible?
2. What state does it read or mutate?
3. What is the lifetime of that state?
4. Is this language behavior or a host-environment API?
5. What assumptions does the surrounding architecture make?
6. What failure or edge case would violate those assumptions?

If you can answer those questions, you understand the feature rather than merely recognizing its syntax.

## Practice

Build three tiny experiments around closures:

- a minimal case showing the normal behavior;
- an edge case that exposes a common misconception;
- a real application-shaped case where the concept affects architecture.

For each experiment, write your prediction first. Then run it and explain any difference. The goal is to train the ability to predict JavaScript behavior from its underlying model.

## Connection

This concept connects to later JavaScript architecture and to the technologies built on JavaScript. TypeScript adds compile-time information but does not replace JavaScript runtime semantics. React relies heavily on functions, closures, identity, scheduling, and object state. Node.js uses the same language while supplying a different host environment. Understanding the underlying mechanism here makes those later systems much easier to reason about.
