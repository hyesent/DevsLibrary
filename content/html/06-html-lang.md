---
title: The <html> Element and lang
order: 6
book: html
---

# The `<html>` Element and `lang`

The `<html>` element is the root of every page — literally the outer wrapper
that contains everything else. It also carries one important attribute that
most beginners skip, then wish they hadn't: `lang`.

## The root element

Every HTML file has exactly one `<html>` element. It wraps `<head>` and
`<body>`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Page</title>
  </head>
  <body>
    <p>Content.</p>
  </body>
</html>
```

Nothing goes outside of it. Everything in your document — every tag, every
piece of content — is inside `<html>`.

## Why it exists

The `<html>` element marks the boundary of your document. It's how the browser
knows where the document starts and ends, and it's the anchor point for
everything else.

If you forget it, the browser inserts it for you. But always write it
explicitly.

## The lang attribute

`lang` tells the browser, search engines, and assistive technology what
**language** your content is in.

```html
<html lang="en">
```

Some values you might use:

| Language | Code |
|----------|------|
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| German | `de` |
| Portuguese | `pt` |
| Japanese | `ja` |
| Arabic | `ar` |
| Chinese (Simplified) | `zh-Hans` |

You can also add a region if needed:

- `en-US` — English, United States
- `en-GB` — English, United Kingdom
- `pt-BR` — Portuguese, Brazil
- `es-MX` — Spanish, Mexico

The full list is standardized under **BCP 47** (you'll see it referenced as the
"language tag" standard).

## Why lang matters

You might be tempted to skip it. Don't. It affects a lot:

### Screen readers

Screen readers use `lang` to pick the right pronunciation. `<html lang="en">`
tells the reader to pronounce text using English phonetics. If you set it to
`fr` by mistake, English text sounds like French-accented gibberish.

### Spell checkers

Browsers use `lang` to determine which dictionary to use for spell check.
Wrong language → wrong suggestions.

### Search engines

Google and others use `lang` to decide whether your page is relevant for a
given query. If you're writing in Spanish but the page says `lang="en"`,
Spanish-speaking users might never see your content.

### Translation tools

Chrome and other browsers offer to translate pages based on their `lang`
attribute. Wrong value → wrong translation offer (or none).

### CSS

CSS has a `:lang()` selector that matches elements by language:

```css
:lang(fr) { font-style: italic; }
```

Handy for sites with mixed-language content.

## The xml:lang attribute

You'll occasionally see this in older code:

```html
<html xml:lang="en" lang="en">
```

`xml:lang` was required in XHTML. In HTML5, `lang` alone is enough. If you see
both together, it's legacy code — you don't need to copy it.

## Changing language mid-page

If part of your page is in a different language, use `lang` on that specific
element:

```html
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
```

Screen readers will switch pronunciation for that word. This is the correct way
to handle foreign phrases.

## When the language changes

Set `lang` on `<html>` for the primary language of the page. Then set `lang` on
any element that uses a different language. That's the full rule.

## Common mistakes

- Skipping `lang` entirely. You lose pronunciation, spell check, translation,
  and SEO benefits.
- Using `en-US` for a page written in British English. Use `en-GB`.
- Setting `lang` to the language of your *audience* instead of your *content*.
  It's about the content, not the reader.
- Forgetting `lang` on embedded foreign phrases, which makes screen readers
  mispronounce them.
- Confusing country codes with language codes. The `uk` code is Ukrainian, not
  "United Kingdom."

## The takeaway

- Every page has exactly one `<html>` element — the root
- It wraps `<head>` and `<body>`, nothing else
- `lang` tells the browser (and everything downstream) what language the
  content is in
- Always set `lang` on `<html>`, even for English pages
- Set `lang` on individual elements when language changes mid-page
- Use `en`, `es`, `fr`, `de`, etc. — you can add regions like `en-US` when
  needed

One attribute. Every user benefits. Set it every time.