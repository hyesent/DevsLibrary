# Images, Icons, and Text Alternatives

> DevsLibrary · Web Accessibility · Lesson 07

## Decide the image's purpose
A text alternative should convey the relevant information or function, not mechanically describe every pixel. The right alternative depends on context.

- **Informative image:** concise alt text communicates the important information.
- **Functional image:** describe the action or destination, often through the link or button's accessible name.
- **Decorative image:** use `alt=""` so it is ignored by assistive technology.
- **Complex image:** provide a short alt plus nearby long description, data table, or equivalent explanation.
- **Text embedded in an image:** provide the same meaningful text in actual text where possible.

## Context changes the answer
A photo of a dog may need “A brown dog beside a red bicycle” in a story, but if it is one of several decorative product thumbnails, that description may add noise. Do not begin with “image of” unless the fact that it is an image matters.

## SVG and icon fonts
Inline SVG used decoratively can be hidden from the accessibility tree with `aria-hidden="true"` when appropriate. If an SVG conveys information, provide a meaningful accessible name or an equivalent text alternative. Avoid exposing raw path data or unhelpful internal SVG title strings. Icon fonts can fail when fonts do not load; ensure the control still has a name.

## Image maps and charts
A chart needs its key takeaway and data to be available in text, not just an alt attribute such as “chart.” A data table may be the most useful alternative for detailed values. Keep alternative content synchronized when the visual changes.

## Exercise
Write alternatives for five images: a logo link, a decorative divider, a product image, a chart, and a button icon. Explain why each one differs.
