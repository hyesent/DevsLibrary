---
title: "Mutable and Immutable Objects"
order: 7
book: "python"
---

# Mutable and Immutable Objects

## Core model

Mutable objects can change their contents after creation; lists, dictionaries, and sets are mutable. Immutable objects such as integers, strings, and tuples cannot have their own value changed in place. A tuple may still contain a mutable list, so immutability of the outer container does not make every reachable object immutable.

## How it behaves in real code

Mutability affects aliasing, hashing, caching, and API design. A mutable object generally cannot be a dictionary key because its hash/equality identity would become unsafe if its key-relevant state changed. A tuple containing a list is not hashable even though the tuple itself is immutable.

## Reasoning exercise

When sharing an object between functions, decide whether the recipient may mutate it. If not, document that contract, pass an immutable representation, or make a deliberate copy. Copying nested structures may require more than a shallow `list.copy()`.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
