# Focus Order, Visible Focus, and Skip Links

> DevsLibrary · Web Accessibility · Lesson 11

## Why focus design matters
A user may navigate by moving focus through controls rather than scanning visually. A confusing focus order can make a form or navigation sequence incoherent even if every control is technically reachable.

Do not reorder the visual interface with CSS in a way that creates a contradictory keyboard sequence. Keep DOM order aligned with reading and interaction order whenever possible.

## Skip links
A skip link lets keyboard users bypass repeated navigation and reach the main content. It should be one of the first focusable elements and become visible when focused.

```html
<a class="skip-link" href="#main">Skip to main content</a>
<header>...</header>
<main id="main" tabindex="-1">
  <h1>Account overview</h1>
</main>
```

The CSS can position the link off-screen until focus, but it must remain visible on focus and not be hidden by other layers. Verify the target receives focus appropriately in the supported browser setup.

## Focus appearance
A focus indicator should be visually distinct from surrounding colors and remain visible on every relevant background. Do not rely on a subtle color shift alone. Consider contrast, thickness, shape, and the fact that a focus ring can be clipped by overflow.

## Exercise
Add a skip link to a multi-page layout. Test it at normal zoom, high zoom, and with a sticky header. Confirm that activating it moves the user to a meaningful place and that focus is visible.
