---
title: "Iterables, Iterators, and the Iterator Protocol"
order: 29
book: "python"
---

# Iterables, Iterators, and the Iterator Protocol

## Core model

An iterable can provide an iterator; an iterator produces one item at a time through `__next__()` and signals exhaustion with `StopIteration`. A list is reusable as an iterable because each `iter(list)` can create a new iterator, while a generator object is usually a one-pass iterator.

## How it behaves in real code

This distinction affects APIs: passing a generator to two consumers does not give both consumers a fresh copy of the data. It also affects memory, because lazy iteration can process large inputs without materializing them all, but a one-pass stream cannot be indexed or rewound automatically.

## Reasoning exercise

Document whether a function expects a reusable collection or a one-shot iterable. If it iterates twice, either materialize deliberately or redesign it to work in one pass.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
