---
title: Event Delegation
order: 88
book: javascript
---

# Event Delegation

Handling many dynamic elements efficiently. This lesson is part of a complete JavaScript curriculum, so the goal is to understand the mechanism, not just memorize a syntax pattern.

## The mental model

JavaScript becomes much easier when you ask three questions: **what value exists, what operation is being performed, and what runtime mechanism makes that operation happen?** Keep those questions in mind as you read.

This topic also sits inside a larger system. A JavaScript program has language rules, a runtime, and—when running in a browser—host APIs. Separating those layers prevents a lot of confusion later.

## In practice

```javascript
element.addEventListener("click", event => {
  console.log(event.type);
});
```

Events invert control: the browser decides when an event occurs and calls your handler at the appropriate time.

## What is actually happening

1. JavaScript evaluates the expressions involved and produces values.
2. The runtime applies the relevant language or host rules.
3. The resulting state becomes available to the next operation.
4. If the operation crosses an asynchronous or browser boundary, control may return to the runtime before the final result is available.

The exact details depend on this lesson's subject, but this sequence is the habit you should develop: **trace the mechanism instead of guessing from the syntax.**

## Common mistakes

- Memorizing syntax without understanding what value it produces.
- Confusing a JavaScript language feature with a browser-provided API.
- Assuming two pieces of syntax that look similar have identical runtime behavior.
- Ignoring edge cases such as missing data, coercion, mutation, or asynchronous timing.
- Fixing a symptom without first identifying the state or boundary that caused it.

## Practice

Create a tiny example that demonstrates the concept without using a framework. Change one input at a time and predict the result before running the code. Then inspect the actual result and explain why your prediction was correct or wrong.

**Stretch:** deliberately create one edge case. Explain what changed in the runtime model and how you would make the behavior explicit for another developer.

## Connection to the bigger system

This concept will matter again when JavaScript is used with modules, asynchronous code, the DOM, Node.js, TypeScript, or React. Understanding it now means those later technologies can build on a mental model you already own.

## The takeaway

Do not leave this lesson knowing only a line of code. Leave knowing **what the line means, what state it changes or produces, and which part of the JavaScript runtime is responsible for the behavior.**
