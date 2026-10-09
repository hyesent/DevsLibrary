# Layout: Flow, Flexbox, Grid, and Positioning

> DevsLibrary · Browser Internals · Lesson 07

## Layout computes geometry
The layout system determines where boxes appear and how large they are. Normal flow, block formatting, inline formatting, flexbox, grid, floats, and positioned elements follow different algorithms. The browser must resolve intrinsic sizes, constraints, min/max dimensions, and available space.

## Intrinsic sizing
Images, text, replaced elements, and content can contribute intrinsic dimensions. Long unbreakable text or oversized media can force overflow if constraints are poorly chosen. Responsive layout should allow content to grow and shrink without hiding information.

## Containing blocks and stacking
Positioned elements use a containing block to determine offsets. Stacking contexts determine how layers are painted relative to one another; a large `z-index` cannot escape its stacking context. Properties such as transforms, opacity, and isolation can create new stacking contexts.

## Layout stability
Reserve space for images and embeds when dimensions are known. Avoid injecting banners above existing content without accounting for the shift. Cumulative layout shift (CLS) measures unexpected visual movement; stable geometry improves usability and performance.

## Exercise
Use devtools to inspect a grid item that overflows. Identify the intrinsic size or minimum-size rule responsible, then fix the constraint without clipping the content.
