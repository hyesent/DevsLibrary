---
title: "React Compiler"
order: 32
book: "react"
---

## The idea

The React Compiler is a build-time optimization system designed to automatically memoize components and values when appropriate. The current React reference describes it as a build-time optimization tool that automatically memoizes React components and values. citeturn0search7

This changes how performance advice should be framed. Memoization is not an identity ritual where every function must receive `useCallback` and every calculation must receive `useMemo`. The first responsibility is to design correct state boundaries and component relationships. Optimization should then be informed by measurement and the capabilities of the compiler/toolchain.

The important distinction is between semantic correctness and optimization. A component must behave correctly without relying on memoization. Memoization changes when work can be skipped; it should not be required to make the program logically correct.

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **react compiler**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
