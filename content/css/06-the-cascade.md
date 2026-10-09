---
title: The Cascade
order: 6
book: css
---

# The Cascade

The cascade is the decision system CSS uses when several declarations could apply. It considers origin and importance, layers, specificity, and source order rather than blindly using the last declaration.

## The mental model

The word cascade is not a metaphor you can ignore: it is the core mechanism. When debugging, ask which declarations match, whether a declaration is important, which cascade layer it belongs to, which selector is more specific, and finally which rule comes later when the earlier comparisons tie.

## In practice

```css
.card { color: black; }
.card { color: navy; }
```

With equal relevance and specificity, the later declaration wins. But if the first rule has stronger specificity, simply moving the second rule lower may not be enough.

Modern CSS also gives you cascade layers, which let you establish intentional precedence between groups of styles.

## Common mistakes

- “Last one wins” as the whole cascade model
- Throwing `!important` at conflicts
- Making selectors stronger and stronger
- Forgetting that user and author styles have different origins

## Practice

Take a stylesheet with five conflicting color declarations. Resolve the final color manually, then verify your reasoning in DevTools.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
