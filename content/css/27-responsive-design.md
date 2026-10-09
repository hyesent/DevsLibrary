---
title: Responsive Design
order: 27
book: css
---

# Responsive Design

Responsive design means the layout adapts to different viewport and device conditions instead of assuming one fixed canvas.

## The mental model

A resilient responsive page starts with flexible foundations: fluid widths, wrapping, intrinsic sizing, and content-driven layout. Media queries then add changes where the design actually needs a different arrangement. Responsive design is not “make desktop smaller.”

## In practice

```css
.container {
  width: min(92%, 72rem);
  margin-inline: auto;
}

@media (max-width: 48rem) {
  .layout { grid-template-columns: 1fr; }
}
```

The container is fluid by default. The media query changes architecture only when the two-column arrangement stops being appropriate.

## Common mistakes

- Designing only for two exact widths
- Adding dozens of breakpoints
- Using JavaScript to detect simple layout conditions
- Choosing breakpoints from device names instead of content needs

## Practice

Take a desktop two-column layout and make it responsive. Resize the viewport until the content becomes cramped; choose a breakpoint based on that failure point.

## The takeaway

The goal of this lesson is not to memorize a property. It is to understand the **constraint or relationship** the property expresses. When you can explain what the browser is being asked to do, CSS becomes much easier to build, debug, and extend.
