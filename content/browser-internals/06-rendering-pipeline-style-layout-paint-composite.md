# The Rendering Pipeline: Style, Layout, Paint, Composite

> DevsLibrary · Browser Internals · Lesson 06

## The high-level pipeline
A simplified rendering pipeline is:
- **Style calculation:** determine computed styles.
- **Layout:** calculate sizes and positions.
- **Paint:** record drawing operations for text, borders, images, shadows, and backgrounds.
- **Rasterization:** convert drawing instructions into pixels, often using tiles.
- **Compositing:** combine layers into the final frame.

This is a mental model, not a promise that every change triggers every stage. Engines optimize work and use different internal representations.

## Layout and paint invalidation
Changing width or font size often affects layout. Changing a background color may require paint but not layout. Transforming an independently composited layer may be handled mainly by compositing. Actual effects depend on the property, element, and engine.

## Avoid forced synchronous work
A script that writes styles and immediately reads layout-dependent geometry can force the browser to flush pending changes. Repeating write-read-write-read sequences can cause layout thrashing. Batch reads, then writes, or use animation-frame scheduling for visual updates.

## Animation
Prefer properties that can be composited efficiently when they fit the design, commonly transforms and opacity. This does not mean every transform is free or every other property is always slow. Profile on representative devices.

## Exercise
Record a performance trace while animating width, then transform. Compare layout, paint, and compositing activity. Do not assume the result is universal across devices.
