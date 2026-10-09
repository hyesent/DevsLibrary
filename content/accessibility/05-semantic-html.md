# Semantic HTML as the Accessibility Foundation

> DevsLibrary · Web Accessibility · Lesson 05

## Use the platform before inventing a widget
Native HTML elements communicate meaning and behavior to browsers and assistive technologies. A `<button>` is focusable and activatable with keyboard input by default. An `<a href>` represents navigation. A `<label>` can name a form control. Headings, lists, landmarks, and table headers create useful structure.

A `<div>` with a click handler does not automatically become a button. Adding `role="button"` alone does not supply focusability, keyboard activation, disabled behavior, or all platform conventions. Custom widgets require all of that work.

## Choose elements by purpose
- Use headings to represent the hierarchy of the content, not merely to get a visual size.
- Use buttons for actions and links for navigation.
- Use lists for groups that are meaningfully lists.
- Use `<nav>` for a major navigation region, with a label if multiple navigation regions need distinguishing.
- Use `<main>` for the main content region.
- Use `<fieldset>` and `<legend>` for related form controls when appropriate.
- Use table semantics for genuinely tabular data, not for layout.

## Headings and landmarks
Headings provide a navigable outline for many screen-reader users. Keep levels logically nested where practical; a skipped level is not always an automatic failure, but a confusing hierarchy is. Landmark regions let users jump between page areas. Do not create excessive or unlabeled landmark regions.

## Example
```html
<header>
  <a href="/">Acme home</a>
  <nav aria-label="Primary">
    <ul><li><a href="/products">Products</a></li></ul>
  </nav>
</header>
<main>
  <h1>Products</h1>
  <p>Browse available products.</p>
  <button type="button">Compare selected products</button>
</main>
```

## Exercise
Inspect a page with browser developer tools. Find interactive elements built from generic containers. Replace one with the correct native element and list which built-in behaviors you no longer need to implement manually.
