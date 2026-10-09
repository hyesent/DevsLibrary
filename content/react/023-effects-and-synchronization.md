---
title: "Effects and Synchronization"
order: 23
book: "react"
---

## The idea

An Effect is React's mechanism for synchronizing a component with something outside React after rendering has committed. The official documentation emphasizes that Effects are for external systems such as browser APIs, network connections, widgets, or other non-React systems—not as a general mechanism for calculating derived data. citeturn0search3

For example, connecting to a chat server because a component is displayed is an Effect. Updating a value because two pieces of React state can be combined is usually not an Effect; that value can be calculated during render.

The key architecture question is: **what external system must be kept synchronized with this React state?**

Then define ownership. Which render caused the synchronization? What should happen when dependencies change? What resource must be cleaned up? If you cannot name an external system or resource, an Effect may be masking a state-design problem.

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **effects and synchronization**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
