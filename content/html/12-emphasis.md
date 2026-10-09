---
title: Emphasis — strong, b, em, i, u, s, mark, small
order: 12
book: html
---

# Emphasis — `strong`, `b`, `em`, `i`, `u`, `s`, `mark`, `small`

Several HTML elements add "emphasis" or "importance" to text. They mostly look
similar in a browser — some bold, some italic, some underlined. But each one
means something different.

The pattern: **every element here has both a visual default and a semantic
meaning**. Pick based on meaning, and use CSS if you just want a look.

## Bold family: `<strong>` vs `<b>`

Both render bold by default. They're not the same.

```html
<strong>Important warning</strong>
<b>Keyword</b>
```

- `<strong>` — the content is of **strong importance**. If a screen reader
  read your page aloud, it might emphasize this word.
- `<b>` — draw attention to text **without implying importance**. Used for
  keywords in a summary, product names in a review, etc.

Rule: **use `<strong>` when it matters; use `<b>` when it's just visually
distinct.**

Example:

```html
<p><strong>Warning:</strong> do not delete files.</p>
<p>The new <b>MacBook Pro</b> is available today.</p>
```

## Italic family: `<em>` vs `<i>`

Both render italic by default. Again, different meanings.

- `<em>` — the content is **emphasized**, changing the meaning of the sentence.
- `<i>` — text that is set apart from the surrounding text for some reason:
  technical terms, foreign words, thoughts, ship names, etc.

```html
<p>I <em>never</em> said that.</p>
<p>The <i>E. coli</i> bacterium can cause illness.</p>
```

The first example changes meaning depending on which word is emphasized. The
second is just convention — scientific names are italicized.

Rule: **use `<em>` when emphasizing; use `<i>` for set-apart text.**

## `<u>` — underline

Underline traditionally meant "this is a link." That's why `<u>` is rarely a
good idea on the web — users will try to click it.

Its semantic meaning is "text with a non-textual annotation" — like a
misspelling in a document editor, or a proper name in Chinese.

```html
<p>The word <u>recieve</u> is misspelled.</p>
```

99% of the time you don't need `<u>`. If you want to underline something for
decoration, use CSS `text-decoration: underline`.

## `<s>` — strikethrough

Content that's no longer accurate or relevant — like the old price of a
product, or a line in a to-do list that's done.

```html
<p><s>$99.99</s> $49.99</p>
<p><s>Buy milk</s></p>
```

Browsers render it with a line through the middle.

Don't confuse it with `<del>` — that's for *deletions in a document edit*.
`<s>` is "no longer accurate." `<del>` is "this used to be here, we removed
it." They look similar but mean different things in context. (We'll cover
`<del>` in the edits/insertions lesson.)

## `<mark>` — highlighted

Text that's marked or highlighted because it's relevant in a specific context
— like search result highlighting.

```html
<p>Search results for <mark>HTML</mark>:</p>
<p>Learn <mark>HTML</mark> from scratch…</p>
```

Browsers render `<mark>` with a yellow background, like a highlighter.

Common uses:
- Search result highlights
- Referencing a specific quote
- Anything that would benefit from a "current relevance" mark

## `<small>` — fine print

Side comments, legal text, copyright, disclaimers.

```html
<p>Free shipping on orders over $50.</p>
<p><small>Offer valid through December 31. Restrictions apply.</small></p>
```

Renders smaller than surrounding text by default. Semantically it means "fine
print" or "aside" — content that's supplementary.

Note: `<small>` should not be used to make text smaller for aesthetic reasons.
That's CSS. Use it when the content is genuinely secondary.

## Other text-level elements

A quick tour of neighbors you'll meet:

| Element | Meaning |
|---|---|
| `<sub>` | Subscript — H<sub>2</sub>O |
| `<sup>` | Superscript — x<sup>2</sup> |
| `<abbr>` | Abbreviation with expansion in `title` |
| `<time>` | Machine-readable date/time |
| `<data>` | Machine-readable value |
| `<span>` | Generic inline container (no meaning) |

We'll cover several of these in later lessons.

## Combining them

These can nest:

```html
<p><strong><em>Really important and emphasized.</em></strong></p>
```

That's "bold and italic, and both important and emphasized." Valid. Just don't
overuse — if everything is emphasized, nothing is.

## Real-world example

```html
<p>
  <strong>Note:</strong> the new version of <i>HyperText Markup Language</i>
  (<abbr title="HyperText Markup Language">HTML</abbr>) supports
  <em>many</em> elements that the old version did not. Use
  <mark>semantic tags</mark> whenever possible.
</p>
```

Each tag is doing its own job:
- `<strong>` — this is a note, pay attention
- `<i>` — a formal term
- `<abbr>` — the abbreviation has an expansion
- `<em>` — emphasis on *many*
- `<mark>` — highlighting the key takeaway

## Common mistakes

- Using `<b>` when you meant `<strong>`. Both are valid, but `<strong>` carries
  meaning that screen readers and search engines use.
- Using `<i>` when you meant `<em>`. Same story.
- Using `<u>` on the web. Users will think it's a link.
- Using `<s>` when you meant `<del>` (or vice versa).
- Using `<small>` for visual effect rather than genuinely secondary content.
- Nesting `<strong><strong>foo</strong></strong>` — meaningless doubling.

## The takeaway

- `<strong>` = importance · `<b>` = visual attention
- `<em>` = stress emphasis · `<i>` = set-apart text
- `<u>` = annotation (rarely used)
- `<s>` = no longer accurate
- `<mark>` = highlighted / relevant
- `<small>` = fine print / aside
- Choose by **meaning**; use CSS for **looks**

If you remember one thing: pick the tag that matches the meaning. Browsers'
default visuals are just defaults — you can override them with CSS any time.