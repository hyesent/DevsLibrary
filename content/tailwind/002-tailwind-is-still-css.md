---
title: "Tailwind is still CSS"
order: 2
book: "tailwind"
---

# Tailwind is still CSS

Every Tailwind utility ultimately participates in ordinary CSS behavior. This is the most important protection against framework confusion.

Take `flex items-center justify-between`. The framework is not inventing a new layout algorithm. It produces CSS corresponding to Flexbox declarations. The browser then applies the Flexbox specification.

This matters when something appears not to work. If `justify-between` has no visible effect, the useful question is not "what Tailwind trick fixes it?" The useful question is whether the element is a flex container, whether the main axis is what you think it is, and whether there is extra space to distribute.

The same reasoning applies to responsive variants, hover states, positioning, typography, and arbitrary values. Tailwind changes how you author CSS; it does not remove CSS rules from the browser.

Keep a mental model of the box model, normal flow, Flexbox, Grid, positioning, inheritance, the cascade, specificity, media queries, pseudo-classes, and intrinsic sizing. Tailwind then becomes a compact language for concepts you already understand.

A powerful learning exercise is to take an unfamiliar utility and translate it back to the CSS property or mechanism it controls. Then ask what browser conditions are required for that property to have an observable effect. This turns framework knowledge into transferable CSS knowledge.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
