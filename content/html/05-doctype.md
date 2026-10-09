---
title: <!DOCTYPE> and Why It Matters
order: 5
book: html
---

# `<!DOCTYPE>` and Why It Matters

`<!DOCTYPE html>` looks like a throwaway line. It's not. Remove it and modern
CSS will start behaving strangely. Here's why.

## What it is

`<!DOCTYPE html>` is a **doctype declaration**. It's the first thing in every
HTML file. It's not a tag — it doesn't have a closing pair, it doesn't wrap
anything. It's a single instruction to the browser.

```
<!DOCTYPE html>
```

That's the entire modern doctype. Short, plain, easy to remember.

## What it does

It tells the browser: **"Render this page in standards mode."**

Browsers have two rendering modes:

- **Standards mode** — render according to the current HTML and CSS
  specifications
- **Quirks mode** — render the way browsers did in the late 1990s, to keep old
  websites from breaking

Quirks mode exists because when browsers first started following standards,
millions of existing sites had been written against the old, inconsistent
behavior. Breaking them would have been catastrophic. So browsers introduced a
switch: presence of a proper doctype → standards mode; absence or malformed →
quirks mode.

## Why quirks mode is bad

In quirks mode, the browser:

- Uses the **old box model** — width includes padding and border by default
- Treats certain CSS properties differently
- Handles some layout calculations differently
- Renders some fonts differently

The box model difference is the big one. If you write:

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
```

**Standards mode:** the total width is 250px (200 + 20 + 20 + 5 + 5).

**Quirks mode:** the total width is 200px — the padding and border are squeezed
inside.

That one difference makes every layout look wrong. And the fix is one line at
the top of the file.

## The history

The old doctypes were long and ugly. HTML 4.01 had several, and you had to
choose carefully:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
```

If you mistyped even one character, the browser fell back to quirks mode. It
was fragile.

HTML5 threw all that out and gave us:

```html
<!DOCTYPE html>
```

Case-insensitive. No DTD reference. No version number. Just `html`. If you have
that line, you're in standards mode. That's the entire rule.

## Is it required?

Technically, browsers will render a page without a doctype. But they'll do it in
quirks mode. Modern CSS assumes standards mode. So in practice:

**Always include `<!DOCTYPE html>` as the first line of every HTML file.**

No exceptions.

## Where it goes

Before `<html>`. Before anything else. Literally the first bytes of the file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

Whitespace and comments before the doctype can trigger quirks mode in some
browsers. So no comments above it either. Doctype, first line, done.

## Historical footnote

If you ever read old HTML code online and see something like:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

That's XHTML or HTML 4. You don't need to write it. Ever. It's from a time
before HTML5 existed, when the standard was stricter and more complex. Modern
HTML is simpler.

## Common mistakes

- Leaving it out and then wondering why CSS behaves differently than every
  tutorial you've read.
- Writing the doctype in the wrong case (`<!doctype html>`). This works — HTML
  is case-insensitive here — but the convention is uppercase for the keyword.
- Putting a comment or blank line *above* the doctype. This can trigger quirks
  mode in some browsers.
- Writing the old HTML 4 or XHTML doctype when starting a new file. Modern
  HTML5 projects use `<!DOCTYPE html>`.

## The takeaway

- `<!DOCTYPE html>` is a declaration, not a tag
- It switches the browser into **standards mode**
- Without it, browsers use **quirks mode** — old, inconsistent behavior
- Modern doctype is one line, case-insensitive, no version number
- Always the very first line of the file

One line. Enormous consequence. Write it every time.