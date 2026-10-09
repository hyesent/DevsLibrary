---
title: template, slot, dialog, details, summary
order: 50
book: html
---

# `<template>`, `<slot>`, `<dialog>`, `<details>`, `<summary>`

Five modern elements that fill gaps in classic HTML: content templates, web
component slots, native modals, and built-in collapsible sections.

## `<template>` — an inert HTML fragment

Content inside `<template>` is parsed but not rendered. It's a blueprint you
can clone and insert with JavaScript.

```html
<template id="card-template">
  <div class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </div>
</template>
```

Nothing in the template appears on the page. To use it:

```js
const template = document.getElementById('card-template');
const clone = template.content.cloneNode(true);
clone.querySelector('.card-title').textContent = 'Hello';
document.body.appendChild(clone);
```

Key points:
- `template.content` is a DocumentFragment — inert, not part of the live DOM
- `cloneNode(true)` deep-copies the fragment
- You can fill in slots before inserting

### Why not just use `<div hidden>`?

Hidden divs are parsed as regular DOM — images load, scripts run. Templates
are inert. Big difference for performance and correctness.

### Common uses

- Repeating UI (cards, list items, modal shells)
- Rendering templates from JS
- Storing markup for later insertion

## `<slot>` — web component content projection

Used inside **web components** (custom elements) to define where incoming
content should be placed:

```html
<!-- component definition -->
<template id="my-card">
  <div class="card">
    <slot name="title"></slot>
    <slot name="body"></slot>
  </div>
</template>

<script>
class MyCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('my-card');
    shadow.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('my-card', MyCard);
</script>

<!-- usage -->
<my-card>
  <h3 slot="title">Hello</h3>
  <p slot="body">Body text.</p>
</my-card>
```

The `<slot>` elements are placeholders. Content from the parent fills them.

### Default slot

A `<slot>` with no `name` receives all unnamed children:

```html
<slot></slot>
```

### Fallback content

Content inside `<slot>` renders when nothing is slotted in:

```html
<slot name="title">Default title</slot>
```

### `<slot>` outside web components

Slots only matter inside shadow DOM. In regular HTML, `<slot>` has no effect.

## `<dialog>` — native modal dialog

A built-in modal or non-modal dialog:

```html
<dialog id="my-dialog">
  <h2>Confirm</h2>
  <p>Are you sure you want to delete this?</p>
  <button id="cancel">Cancel</button>
  <button id="confirm">Delete</button>
</dialog>

<button id="open">Open dialog</button>
```

Open it with JavaScript:

```js
const dialog = document.getElementById('my-dialog');
document.getElementById('open').addEventListener('click', () => {
  dialog.showModal();   // modal — has backdrop, focus trap, blocks page
});
```

Methods:
- `show()` — non-modal (doesn't block the page)
- `showModal()` — modal (backdrop, focus trap, closes on Esc)
- `close()` — closes

### Why use `<dialog>` instead of a custom modal?

- **Focus trap** built-in — Tab cycles within the dialog
- **Escape key** closes it
- **Backdrop** via `::backdrop` CSS pseudo-element
- **Inert background** — clicks outside are blocked
- **Accessible** — screen readers announce it correctly

A custom modal has to build all of that from scratch.

### Styling

```css
dialog {
  border: none;
  border-radius: 12px;
  padding: 24px;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

### Returning values

```js
dialog.close('confirmed');
dialog.returnValue;   // "confirmed"
```

### Fallback for old browsers

`<dialog>` isn't supported in IE, but is in all modern browsers. For very old
browsers, a polyfill or JS-based modal is needed.

## `<details>` and `<summary>` — native disclosure

A collapsible section — no JavaScript needed.

```html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content that shows when expanded.</p>
</details>
```

- `<summary>` is the always-visible label (the click target)
- Everything else inside `<details>` is shown/hidden
- `<summary>` must be the first child

### The `open` attribute

```html
<details open>
  <summary>Expanded by default</summary>
  <p>Visible on load.</p>
</details>
```

Toggle it via JS:

```js
details.open = true;
```

### Why it's great

- Works without JavaScript
- Accessible by default — screen readers announce "expanded/collapsed"
- Keyboard accessible
- Styleable (mostly — the marker triangle can be fiddly)

### Common uses

- FAQ sections
- Spoiler content
- Settings panels
- Progressively disclosed details

### Customizing the marker

The default disclosure triangle is a browser default. Replace it:

```css
summary {
  list-style: none;
}
summary::-webkit-details-marker {
  display: none;
}
summary::before {
  content: '▶ ';
}
details[open] summary::before {
  content: '▼ ';
}
```

### Styling the open state

```css
details[open] summary {
  border-bottom: 1px solid #ccc;
}
```

### Animating open/close

`<details>` doesn't animate height by default. JS solutions use `beforeopen`
events or measure heights. Modern CSS has `::details-content` (limited
support) for smooth animation.

### One `<summary>` only

Exactly one `<summary>` per `<details>`. Multiple are ignored.

## Combining them

An FAQ section built with `<details>`:

```html
<article>
  <h2>FAQ</h2>

  <details>
    <summary>Do I need JavaScript?</summary>
    <p>No, this section works with HTML and CSS only.</p>
  </details>

  <details>
    <summary>Is it accessible?</summary>
    <p>Yes — screen readers announce expanded/collapsed states.</p>
  </details>
</article>
```

A modal built with `<dialog>`:

```html
<dialog id="settings">
  <form method="dialog">
    <h2>Settings</h2>
    <label>
      Theme
      <select name="theme">
        <option>Dark</option>
        <option>Light</option>
      </select>
    </label>
    <button>Close</button>
  </form>
</dialog>
```

A form inside `<dialog>` with `method="dialog"` closes the dialog on submit
automatically.

## Common mistakes

- Using `<template>` and expecting the content to appear. It's inert.
- Cloning with `template.cloneNode()` instead of `template.content.cloneNode()`.
- Using `<slot>` outside web components (no effect).
- Not calling `showModal()` — `<dialog>` needs JS to open.
- Styling `<dialog>` without `::backdrop`.
- Multiple `<summary>` elements in a `<details>`.
- Expecting `<details>` to animate height.
- Putting content before `<summary>` — the summary must be first.

## The takeaway

- `<template>` — inert fragment, cloned and inserted by JS
- `<slot>` — content projection for web components
- `<dialog>` — native modal with focus trap, backdrop, Esc-to-close
- `<details>` + `<summary>` — native collapsible, no JS needed
- These elements replace custom JavaScript implementations
- Prefer native — they're more accessible and less code

Modern HTML gives you native versions of what used to require libraries. Reach
for them first.