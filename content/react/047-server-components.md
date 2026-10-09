---
title: "Server Components"
order: 47
book: "react"
---

## The idea

Server Components introduce a different execution boundary. A Server Component renders in a server environment before the client bundle is produced or while a server handles a request. It is not sent to the browser as the original component implementation. React's documentation describes Server Components as components that render ahead of time in an environment separate from the client application or SSR server. citeturn0search2

This creates a fundamentally different architecture from ordinary client rendering. A Server Component can access server-side data directly in supported frameworks, while a Client Component is used where browser interactivity is required. The boundary determines what code can run where.

Do not confuse Server Components with Server Actions or the `"use server"` directive. React's documentation explicitly notes that there is no directive marking a Server Component; `"use server"` is associated with Server Functions/Actions. citeturn0search0turn0search2

The mental model is execution placement: **where does this component execute, what data can it access there, and what crosses the boundary?**

## What to understand

Do not stop at the API surface. Identify the inputs, state, identity, render calculation, and commit behavior involved in **server components**. Ask what React owns and what belongs to the browser, server, network, or another external system.

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
