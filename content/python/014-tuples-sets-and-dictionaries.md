---
title: "Tuples, Sets, and Dictionaries"
order: 14
book: "python"
---

# Tuples, Sets, and Dictionaries

## Core model

Tuples represent fixed-position groupings, sets represent unique membership, and dictionaries map hashable keys to values. These structures express different data relationships. A dictionary is not merely a faster list; it makes lookup by a meaningful key part of the model.

## How it behaves in real code

Dictionary and set lookup is average-case fast because of hashing, but keys must obey equality/hash contracts. Mutating an object in a way that changes its hash while it is stored as a key breaks the assumptions of the collection. Sets remove duplicates according to equality, not by preserving all occurrences.

## Reasoning exercise

Use a tuple for a small fixed record only when positions remain clear; a dataclass or named structure may be better when fields need names. Use a set for uniqueness/membership and a dictionary for keyed association.

## Check your understanding

1. Explain the mechanism in your own words without repeating the heading.
2. Give one case where the obvious shortcut would be incorrect.
3. Identify the boundary, state, or failure mode that matters most.
4. Change one assumption in an example and predict the result before running it.
