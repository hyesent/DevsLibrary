---
title: "What React Actually Is"
order: 1
book: "react"
---

## The idea

React is a rendering system for describing UI from data. A component is not primarily a template and React is not primarily a DOM manipulation library. Your component describes what the UI should be for the current inputs, and React decides when to call components and how to commit the resulting changes to the host environment.

The core model is:

**inputs + state → render description → reconciliation → commit**

That model explains why React asks you to keep rendering pure. React needs to be free to call rendering code when it determines that work is necessary, compare the result with previous work, pause or resume certain work in supported concurrent scenarios, and commit only the required host changes.

Modern React also spans more than browser-only client rendering. React 19 includes APIs and architecture for Actions, `use`, Server Components, improved hydration behavior, and other server/client capabilities. The current official documentation lists React 19.3 as the latest version, so this book treats those newer boundaries as first-class rather than teaching an older React mental model. citeturn0search0turn0search5

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **what react actually is**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
