---
title: "Source Code to Running Program"
order: 2
book: "javascript"
---

## The idea

A JavaScript file does not travel directly from characters to visible behavior. An engine has to understand the source, establish its syntactic structure, create the internal representations needed for execution, and then execute operations according to ECMAScript semantics. Modern engines may interpret some code, compile hot paths, optimize them, and later deoptimize when assumptions become invalid.

The important architectural idea is that “compiled versus interpreted” is not a useful binary description of modern JavaScript engines. Engines use multiple execution strategies. They can parse source, create bytecode or other intermediate forms, profile behavior, optimize frequently executed code, and recover when runtime assumptions change.

This matters because language semantics and engine optimization are different concerns. Your program must obey the language rules regardless of whether a particular engine optimized it. Performance work should therefore begin with measurement, not guesses about whether JavaScript is “interpreted.”

A useful debugging model is: source syntax determines what operations are possible; runtime state determines what those operations observe; the engine chooses how efficiently to implement those operations.

## What to understand

You should be able to explain **Source Code to Running Program** without relying on memorized wording. Start from the mechanism, not the API name. Identify what JavaScript stores, what it evaluates, what it schedules, or what boundary it crosses.

When two pieces of code look similar but behave differently, compare their bindings, values, invocation context, prototype relationships, or host environment. JavaScript often feels inconsistent only when two different mechanisms are being treated as one.

## Example

A useful exercise is to create a tiny program involving source code to running program, then predict the result before executing it. Change exactly one variable at a time: the value, scope, invocation form, timing, object identity, or host API. Record what changed and why.

For example, when investigating a function or object feature, ask: “What exists before this line? What is created by this line? What reference points to it? What remains reachable after this line?” That turns debugging into a model-building exercise instead of trial and error.

## Architecture reflex

When you encounter **Source Code to Running Program** in a real codebase, ask:

1. What JavaScript mechanism is actually responsible?
2. What state does it read or mutate?
3. What is the lifetime of that state?
4. Is this language behavior or a host-environment API?
5. What assumptions does the surrounding architecture make?
6. What failure or edge case would violate those assumptions?

If you can answer those questions, you understand the feature rather than merely recognizing its syntax.

## Practice

Build three tiny experiments around source code to running program:

- a minimal case showing the normal behavior;
- an edge case that exposes a common misconception;
- a real application-shaped case where the concept affects architecture.

For each experiment, write your prediction first. Then run it and explain any difference. The goal is to train the ability to predict JavaScript behavior from its underlying model.

## Connection

This concept connects to later JavaScript architecture and to the technologies built on JavaScript. TypeScript adds compile-time information but does not replace JavaScript runtime semantics. React relies heavily on functions, closures, identity, scheduling, and object state. Node.js uses the same language while supplying a different host environment. Understanding the underlying mechanism here makes those later systems much easier to reason about.
