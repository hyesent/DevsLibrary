---
title: "The Event Loop"
order: 49
book: "javascript"
---

## The idea

JavaScript execution in a typical browser is single-threaded at the level of a given JavaScript execution context, but the environment can perform work outside the JavaScript call stack and later schedule JavaScript to process the result.

The critical distinction is between the call stack, jobs such as promise reactions, and host-managed tasks such as timers or user interaction. When current JavaScript finishes, the runtime can process queued work according to host scheduling rules. Promise reactions use the ECMAScript job mechanism and are commonly observed as microtasks in browser terminology; timers and many external events enter task queues.

This explains behavior such as:

```js
console.log("A");

setTimeout(() => console.log("timer"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("B");
```

The synchronous logs happen first because the current execution must finish. The promise reaction is then processed before the timer task in normal browser scheduling, so the observed order is A, B, promise, timer.

The architectural lesson is not to memorize a queue diagram. It is to ask: is this work synchronous, a promise reaction, or host-scheduled work? What keeps the current call stack busy? What work can be delayed? What happens if a callback performs expensive CPU work? Those questions let you predict real application behavior.

## What to understand

You should be able to explain **The Event Loop** without relying on memorized wording. Start from the mechanism, not the API name. Identify what JavaScript stores, what it evaluates, what it schedules, or what boundary it crosses.

When two pieces of code look similar but behave differently, compare their bindings, values, invocation context, prototype relationships, or host environment. JavaScript often feels inconsistent only when two different mechanisms are being treated as one.

## Example

A useful exercise is to create a tiny program involving the event loop, then predict the result before executing it. Change exactly one variable at a time: the value, scope, invocation form, timing, object identity, or host API. Record what changed and why.

For example, when investigating a function or object feature, ask: “What exists before this line? What is created by this line? What reference points to it? What remains reachable after this line?” That turns debugging into a model-building exercise instead of trial and error.

## Architecture reflex

When you encounter **The Event Loop** in a real codebase, ask:

1. What JavaScript mechanism is actually responsible?
2. What state does it read or mutate?
3. What is the lifetime of that state?
4. Is this language behavior or a host-environment API?
5. What assumptions does the surrounding architecture make?
6. What failure or edge case would violate those assumptions?

If you can answer those questions, you understand the feature rather than merely recognizing its syntax.

## Practice

Build three tiny experiments around the event loop:

- a minimal case showing the normal behavior;
- an edge case that exposes a common misconception;
- a real application-shaped case where the concept affects architecture.

For each experiment, write your prediction first. Then run it and explain any difference. The goal is to train the ability to predict JavaScript behavior from its underlying model.

## Connection

This concept connects to later JavaScript architecture and to the technologies built on JavaScript. TypeScript adds compile-time information but does not replace JavaScript runtime semantics. React relies heavily on functions, closures, identity, scheduling, and object state. Node.js uses the same language while supplying a different host environment. Understanding the underlying mechanism here makes those later systems much easier to reason about.
