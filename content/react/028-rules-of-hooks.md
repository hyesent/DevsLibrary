---
title: "Rules of Hooks"
order: 28
book: "react"
---

## The idea

**Rules of Hooks** should be understood as part of React's rendering model rather than as an isolated API.

Begin with four questions: what data does the component receive, what state does it own, what does rendering calculate, and what external system—if any—must be synchronized? Then ask how identity affects preservation and how updates move through the tree.

React's current model emphasizes pure components and hooks, explicit state architecture, rendering/commit separation, and carefully defined boundaries between React and external systems. Those ideas are more durable than memorizing individual APIs.

The goal of this lesson is to make the mechanism predictable. Once you can predict when React will render, what information a render can see, what identity is preserved, and what reaches the host environment, the APIs become tools rather than magic.

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **rules of hooks**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
