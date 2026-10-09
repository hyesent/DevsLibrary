---
title: "State as a Snapshot"
order: 10
book: "react"
---

## The idea

React state should be understood as information associated with a component's position in the rendered tree, not as a mutable local variable that changes immediately after calling a setter.

A render receives a snapshot of state. Event handlers created during that render close over that snapshot. Calling a state setter requests another render; it does not rewrite the JavaScript variables that already exist inside the current render.

That explains code such as:

```js
setCount(count + 1);
console.log(count);
```

The log still sees the current render's `count`. If you need to apply several updates based on previous state, use the functional form:

```js
setCount(c => c + 1);
setCount(c => c + 1);
```

Now each update describes a transformation from the previous state value. The important lesson is to reason in terms of render snapshots and queued state transitions, not mutable variables.

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **state as a snapshot**. Ask what React owns and what belongs to the browser, server, network, or another external system.

A useful test is to predict the behavior before running the code. If your prediction is wrong, find which part of the rendering model you misunderstood.

## Architecture reflex

When you encounter this concept in a real React application, ask:

1. What causes this work?
2. What data is the source of truth?
3. Which component owns that state?
4. Is the rendered output pure?
5. What identity must React preserve?
6. Is an external system involved?
7. What happens when the component unmounts, suspends, or renders again?

These questions expose architecture problems earlier than adding another hook or abstraction.

## Practice

Build a tiny example that demonstrates the normal behavior, then deliberately create the most common incorrect design. Compare the two. Trace the sequence from trigger → render → reconciliation → commit and write down where state, props, effects, or external resources enter the sequence.

## Connection

React sits on top of JavaScript, the DOM, and increasingly server/client execution boundaries. JavaScript closures explain many React state and effect behaviors. TypeScript can describe component contracts but cannot replace React's runtime model. CSS and the DOM determine the final host presentation. Later application architecture should preserve these boundaries rather than hide them.
