# Fonts, Text Shaping, and Image Decoding

> DevsLibrary · Browser Internals · Lesson 18

## Text is more than characters
The browser shapes text using font files, script-specific shaping, fallback rules, glyph metrics, and platform text-rendering systems. Missing fonts can change line wrapping and layout. Fonts may be fetched after initial rendering, causing a visible swap or layout shift.

## Font loading
Use `font-display` intentionally. Preload only critical fonts and use correct CORS settings for cross-origin font resources. Too many font weights and subsets increase transfer and decode costs. A robust fallback stack should remain readable when the custom font is unavailable.

## Image decoding
Image resources must be downloaded and decoded before pixels can be presented. Large images, inefficient formats, and oversized source dimensions can increase bandwidth, memory, and decode time. Responsive images and explicit dimensions can reduce unnecessary work and layout shifts.

## Canvas and image content
Canvas pixels do not automatically expose semantic content. Provide equivalent DOM text and controls for essential information. For images, choose appropriate formats, responsive sizes, and alternative text according to their purpose.

## Exercise
Profile a page that loads several font weights and oversized images. Reduce unnecessary resources and compare layout stability, transfer size, and rendering time.
