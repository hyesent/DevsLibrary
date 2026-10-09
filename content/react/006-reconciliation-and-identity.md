---
title: "Reconciliation and Identity"
order: 6
book: "react"
---

## The idea

React needs a way to decide what work should change when the next render description differs from the previous one. Reconciliation compares the structures and identities involved in the tree and determines what can be preserved, replaced, or updated.

Identity is especially important because state is associated with a component's position and identity in the rendered tree. A component can preserve its state when React considers it the same component in the same position, while changing its type or key can cause state to be reset.

This is why keys are not merely warnings about list rendering. A key participates in identity. Changing a key can intentionally reset a subtree; accidentally changing keys can destroy user input or other local state.

Think of reconciliation as the question: **what existing work can safely be reused for this new description?** That question is more useful than memorizing a simplistic “virtual DOM diff” story.

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **reconciliation and identity**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
