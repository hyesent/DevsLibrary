---
title: Global Attributes — id, class, style, title, hidden, lang, dir
order: 48
book: html
---

# Global Attributes

Some attributes work on any element, not just specific ones. These are called
**global attributes**. Seven of them matter most.

## `id` — unique identifier

```html
<h2 id="pricing">Pricing</h2>
<p id="intro-paragraph">...</p>
```

- Must be **unique** in the document
- Case-sensitive
- Can be used by CSS (`#pricing`), JavaScript (`getElementById`), and fragment
  links (`href="#pricing"`)
- Used as fragment target for anchor links

Valid `id` values: any string without spaces. Start with a letter for
compatibility.

```html
<!-- valid -->
<div id="main-content"></div>
<div id="user-123"></div>

<!-- avoid -->
<div id="123user"></div>   <!-- starts with digit -->
<div id="main content"></div>   <!-- space -->
```

Duplicate ids break things silently — `getElementById` returns the first, and
fragment links jump to the first.

## `class` — reusable identifier

```html
<p class="note">...</p>
<p class="note important">...</p>
```

- Multiple elements can share the same class
- One element can have multiple classes (space-separated)
- Used for styling and JS hooks
- Case-sensitive

Naming conventions:
- **BEM**: `block__element--modifier` (`card__title--large`)
- **Utility**: `text-center p-4 bg-gray-100` (Tailwind style)
- **Semantic**: `article-header featured-post`

Pick a convention for a project and stick with it.

## `style` — inline CSS

```html
<p style="color: red; font-size: 18px;">Hello</p>
```

Applies CSS to a single element. **Avoid it** in most cases:

- Doesn't scale
- Hard to override (highest specificity except `!important`)
- Breaks separation of concerns
- Can't be cached

Legitimate uses:
- Quick prototypes
- Email HTML (where external CSS is unreliable)
- Dynamic values from JavaScript

Otherwise, use external or `<style>` CSS with classes.

## `title` — advisory info

```html
<abbr title="HyperText Markup Language">HTML</abbr>
<a href="/docs" title="Read the docs">Docs</a>
```

Shows a tooltip on hover. Also used by screen readers as additional context.

Rules:
- **Not** a replacement for `alt`, `<label>`, or visible text
- Doesn't appear on touch devices
- Not always read by screen readers

Good uses:
- `<abbr>` expansions
- Extra context on unfamiliar links

Bad uses:
- Repeating visible text
- Essential info only available on hover
- Trying to make an unlabeled control accessible

## `hidden` — hide from everyone

```html
<p hidden>This won't render.</p>
```

Hides the element from:
- Visual display
- Screen readers
- Accessibility tree

Equivalent to `display: none`.

Toggle via JavaScript:

```js
element.hidden = true;   // hide
element.hidden = false;  // show
```

If you want to hide visually but keep for screen readers, use a
`.visually-hidden` CSS class instead:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
```

## `lang` — language

Sets the language of the element's content:

```html
<html lang="en">
<p lang="fr">Bonjour le monde</p>
<span lang="es">Hola</span>
```

Used by:
- Screen readers (pronunciation)
- Spell checkers
- Translation tools
- Search engines

Always set on `<html>`. Set on individual elements when the language changes.

## `dir` — text direction

`ltr` (left-to-right) or `rtl` (right-to-left). Or `auto` to detect.

```html
<html lang="ar" dir="rtl">
<p dir="ltr">English text inside RTL context</p>
```

Languages that use RTL:
- Arabic
- Hebrew
- Persian
- Urdu

For most English sites, `dir` is unnecessary (defaults to `ltr`). It matters
for sites supporting RTL languages.

`dir="auto"` lets the browser choose based on the first strong character:

```html
<input type="text" dir="auto">
```

Good for user-generated content where the language is unknown.

## Other global attributes worth knowing

### `tabindex`

Controls keyboard focus order:

- `tabindex="0"` — focusable in natural DOM order
- `tabindex="-1"` — focusable via JavaScript, not Tab
- `tabindex="1+"` — **avoid**; breaks natural order

```html
<main id="main" tabindex="-1"></main>
```

Common for fragment-link targets — lets you focus an element that isn't
naturally focusable.

### `contenteditable`

Makes an element editable:

```html
<div contenteditable="true">Edit this text.</div>
```

Values: `true`, `false`, `"plaintext-only"` (edit without formatting).

Rarely used. Rich text editors build on it, but direct use is limited.

### `data-*`

Custom data attributes:

```html
<div data-user-id="123" data-role="admin"></div>
```

Accessible via JS as `element.dataset.userId` and `element.dataset.role`.
Covered in the next lesson.

### `draggable`

Makes an element draggable:

```html
<div draggable="true">Drag me</div>
```

Values: `true`, `false`, `auto`.

### `spellcheck`

Toggles browser spell check:

```html
<textarea spellcheck="false"></textarea>
```

Values: `true`, `false`. Inherits from parent if not set.

### `translate`

Toggles browser translation:

```html
<p translate="no">This should not be translated.</p>
```

Values: `yes`, `no`. Useful for brand names, code.

### `accesskey`

Keyboard shortcut (avoid — inconsistent across platforms):

```html
<button accesskey="s">Save</button>
```

Very rarely used, and interferes with OS shortcuts.

### `autofocus`

Focuses an element on page load:

```html
<input autofocus>
```

Only one element per page. Usually a bad idea — steals focus from users who
were doing something else.

### `role`

ARIA role to override the element's default role:

```html
<div role="button">Click me</div>
```

Prefer actual `<button>` over `<div role="button">`. Only use `role` when no
better element exists.

### `aria-*`

Any of the ARIA attributes:

```html
<button aria-label="Close">×</button>
<div aria-hidden="true">...</div>
<span aria-describedby="hint"></span>
<p id="hint">Error: invalid input.</p>
```

Covered extensively in accessibility lessons.

## A complete example

```html
<article id="post-1" class="post featured" lang="en" dir="ltr">
  <header>
    <h2 id="post-title">Semantic HTML</h2>
    <time datetime="2024-03-15" title="March 15, 2024">Mar 15</time>
  </header>

  <p>The <abbr title="World Wide Web Consortium">W3C</abbr> sets the standards.</p>
  <p lang="fr">Le HTML est un langage de balisage.</p>

  <button
    aria-label="Like this post"
    data-post-id="1"
    tabindex="0">
    ♥
  </button>
</article>
```

Every global attribute in context.

## Common mistakes

- Duplicate `id`s (breaks label links, fragment jumps, `getElementById`).
- Using `style=""` for things that belong in stylesheets.
- Using `title` as the only source of essential info.
- Forgetting `lang` on `<html>`.
- Using `hidden` when `.visually-hidden` is what you want.
- `tabindex` values greater than 0.
- Putting `accesskey` on modern sites — unreliable and unexpected.
- `autofocus` on a page where the user might be doing something else.

## The takeaway

- `id` — unique identifier, used by CSS/JS/fragments
- `class` — reusable identifier, multiple per element
- `style` — avoid in most cases
- `title` — tooltip and additional context, not a label
- `hidden` — hides from everyone
- `lang` — language, always set on `<html>`
- `dir` — text direction, matters for RTL languages
- Plus `tabindex`, `contenteditable`, `data-*`, `spellcheck`, `role`, `aria-*`

Global attributes are the toolkit you reach for on any element. Learn the
seven essentials and you'll use them constantly.