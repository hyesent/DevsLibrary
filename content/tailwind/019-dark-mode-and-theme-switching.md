---
title: "Dark mode and theme switching"
order: 19
book: "tailwind"
---

# Dark mode and theme switching

Dark mode is a theme system. It is not simply "replace white with black."

Tailwind's `dark:` variant can respond to the user's system color preference by default, and it can be customized to respond to a class or data attribute. A manual theme toggle therefore becomes an application state that changes a marker on an ancestor, while CSS determines the presentation.

A robust architecture separates the concerns:

```text
theme preference
      ↓
theme state
      ↓
DOM marker such as class/data attribute
      ↓
dark: variants
      ↓
theme-specific presentation
```

Semantic colors make this practical. Surface, text, border, and action roles can map to different values in each theme.

A three-way theme can support light, dark, and system preference. The JavaScript should decide which mode is active and persist the user's preference if appropriate. It should not rewrite every component's colors.

Initial rendering matters. If the server renders light mode and the client immediately switches to dark mode, users may see a flash or hydration mismatch depending on the application architecture.

Theme switching is therefore partly a CSS problem and partly an application rendering problem. The clean boundary is to keep theme state global and presentation declarative.

## Architecture checkpoint

Explain the mechanism in this lesson without relying on the class names. Identify the underlying CSS behavior, the data or state involved, and the boundary between application logic, Tailwind generation, and browser behavior.

## Practice

Build a small example that isolates the concept. Then deliberately change one important condition—such as available width, content length, state, theme, parent layout, or generated source—and predict what should happen before running it. Explain the result.

## Connection

Keep this lesson connected to the larger system: CSS provides the browser behavior, Tailwind provides a generated utility vocabulary, theme variables provide reusable design decisions, components provide semantic boundaries, and application state determines which presentation should be active.
