---
title: data-*, contenteditable, draggable, tabindex, accesskey
order: 49
book: html
---

# `data-*`, `contenteditable`, `draggable`, `tabindex`, `accesskey`

Five attributes that go beyond standard markup — custom data, editable content,
drag behavior, focus control, and keyboard shortcuts.

## `data-*` — custom data attributes

Store any custom data on an element:

```html
<button data-action="delete" data-id="42">Delete</button>
<li data-category="js" data-views="120">JavaScript lesson</li>
```

Rules:
- Must start with `data-`
- The rest can be any name without uppercase or special characters
- Value is a string

Access from JavaScript:

```js
const btn = document.querySelector('button');
btn.dataset.action;   // "delete"
btn.dataset.id;       // "42"
```

Note: hyphenated names become camelCase. `data-post-id` becomes
`element.dataset.postId`.

### When to use `data-*`

- Passing data from HTML to JavaScript
- Tracking state on an element
- Configuring a component
- Custom attributes without inventing new HTML

```html
<div class="tabs" data-active-tab="0">
  <button data-tab="0">Tab 1</button>
  <button data-tab="1">Tab 2</button>
</div>
```

### When not to

- Instead of proper attributes (`id`, `class`, etc.)
- Duplicating information that's already in the DOM
- As a communication channel between unrelated components

### CSS can read them

```css
[data-status="error"] { color: red; }
[data-status="success"] { color: green; }
```

That gives you state-based styling without extra classes.

## `contenteditable` — editable content

Makes any element editable by the user:

```html
<div contenteditable="true">
  Edit this text directly.
</div>
```

Values:
- `"true"` — fully editable
- `"false"` — not editable
- `"plaintext-only"` — edit without formatting (Chrome, Safari)

The browser supports editing, selection, cursor movement, and basic rich text
(bold, italic via keyboard shortcuts). Its behavior is inconsistent across
browsers.

### Common uses

- Inline editors (Notion-style blocks)
- Simple note-taking
- Content management previews

### Reading content from JS

```js
const editor = document.querySelector('[contenteditable]');
editor.innerText;   // plain text
editor.innerHTML;   // with HTML tags
```

### Caveats

- Paste handling is inconsistent — sanitizing input is on you
- The browser inserts HTML, not just text
- Every browser handles `execCommand` (deprecated) differently
- The built-in formatting controls are inconsistent

Real rich-text editors (ProseMirror, Slate, TipTap, Lexical) build on
`contenteditable` but add significant logic on top.

### Accessibility

- Announce the element's purpose: `aria-label="Comment"`
- Provide a way to save and cancel
- Handle Escape key to blur

```html
<div
  contenteditable="true"
  role="textbox"
  aria-multiline="true"
  aria-label="Comment"
>
  ...
</div>
```

## `draggable` — HTML drag-and-drop

Makes an element draggable:

```html
<div draggable="true">Drag me</div>
```

Values:
- `"true"` — draggable
- `"false"` — not draggable
- `"auto"` — browser decides (default for links and images: draggable)

### How it works

The HTML5 drag-and-drop API involves several events:

```js
const el = document.querySelector('[draggable]');

el.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', el.id);
});

target.addEventListener('dragover', (e) => {
  e.preventDefault();   // allow drop
});

target.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
});
```

Full drag-and-drop is more involved than it looks. Libraries like SortableJS
or dnd-kit hide the complexity.

### Accessibility

HTML5 drag-and-drop is **not keyboard accessible** by default. Consider:

- Providing keyboard alternatives (arrow keys + Enter)
- Using a library that supports keyboard
- Not relying on drag for essential actions

## `tabindex` — keyboard focus

Controls whether an element is focusable via Tab and in what order.

### `tabindex="0"`

Makes a non-focusable element focusable in natural DOM order:

```html
<div tabindex="0">Focusable div</div>
```

Useful for custom widgets that should be reachable via keyboard.

### `tabindex="-1"`

Makes an element focusable via JavaScript but not via Tab:

```html
<main id="main" tabindex="-1">...</main>
```

Common uses:
- Focus targets for skip links
- Moving focus programmatically
- Modal dialogs (focus trap start)

### `tabindex="1"` and above (avoid)

Custom positive values jump the element to that position in the tab order.
Almost always a bug:

- Breaks natural order
- Hard to maintain
- Confuses users

Don't use positive values. Period.

### Tab order rules

- Natural tab order is DOM order
- Only interactive elements (links, buttons, form fields) are focusable by
  default
- `tabindex="0"` makes non-interactive elements focusable
- `tabindex="-1"` removes from tab order but keeps programmatic focus

## `accesskey` — keyboard shortcut

Assigns a keyboard shortcut:

```html
<button accesskey="s">Save</button>
```

But: the actual key combination varies wildly:
- Chrome/Linux: Alt + key
- Chrome/Windows: Alt + key
- Firefox: Alt + Shift + key
- Safari: Ctrl + Alt + key
- Conflicts with OS and browser shortcuts

Practical advice: **don't use `accesskey`.** Modern apps rarely do. If you
need keyboard shortcuts, implement them in JavaScript with a help dialog.

## Combining example

A draggable, editable, keyboard-accessible note:

```html
<div
  contenteditable="true"
  role="textbox"
  aria-label="Note"
  data-note-id="123"
  tabindex="0">
  Click to edit this note.
</div>
```

`data-note-id` for JS lookup, `contenteditable` for editing, `role` and
`aria-label` for accessibility, `tabindex` for keyboard reachability.

## Common mistakes

- Using `data-*` for things that belong in `class`, `id`, or `<input value>`.
- `contenteditable` without any save mechanism.
- Relying on HTML5 drag-and-drop for critical interactions — inaccessible.
- Positive `tabindex` values.
- Forgetting `role` and `aria-label` on `contenteditable` regions.
- Using `accesskey` — it's inconsistent and clashes with OS shortcuts.
- Making `<div>` focusable with `tabindex="0"` when a `<button>` would do.

## The takeaway

- `data-*` — attach custom data to elements, read via `dataset`
- `contenteditable` — editable content, requires care for a11y
- `draggable` — HTML5 drag-and-drop, not keyboard accessible by default
- `tabindex="0"` — make focusable in DOM order
- `tabindex="-1"` — focusable via JavaScript only
- Positive `tabindex` — never
- `accesskey` — skip it; use JS shortcuts

These attributes extend HTML's capabilities but come with accessibility
caveats. Use them deliberately.