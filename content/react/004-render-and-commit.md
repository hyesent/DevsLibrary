---
title: "Render and Commit"
order: 4
book: "react"
---

## The idea

React's visible update can be understood as three stages: something triggers rendering, React calls components to calculate the next UI, and React commits the necessary host changes. React's own documentation explicitly describes this as trigger → render → commit. citeturn0search1

Rendering is therefore not the same thing as changing the DOM. A render is a calculation. React can render a component and discover that the resulting host output does not require a DOM change. This distinction is essential for understanding performance: “the component rendered” does not automatically mean “the browser DOM was rewritten.”

The architecture reflex is to identify the trigger first. Was it initial mounting, a state update, a parent render, a context change, or another React mechanism? Then inspect the calculation. Finally ask what actually committed. This keeps render cost and DOM mutation cost separate in your reasoning.

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **render and commit**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
