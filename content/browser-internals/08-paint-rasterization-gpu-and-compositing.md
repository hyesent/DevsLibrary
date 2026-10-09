# Painting, Rasterization, GPU, and Compositing

> DevsLibrary · Browser Internals · Lesson 08

## Painting is not the same as layout
After geometry is known, the browser determines how visual items should be drawn. Rasterization converts display instructions into pixels, often in tiles to avoid repainting the entire page. Compositing combines surfaces or layers into the final image.

## GPU acceleration
Browsers may use the GPU for compositing and other operations, but not every CSS effect is GPU-accelerated and acceleration is not automatically faster. Layer creation consumes memory. Excessive use of `will-change` or forced transforms can increase memory pressure and hurt performance.

## Damage and invalidation
When a visual change occurs, the engine tracks which regions need repainting. A small update may still affect a larger region due to effects such as filters, shadows, clipping, and overlap. Devtools paint flashing and layer inspectors can help reveal expensive patterns.

## Pixel ratio and scaling
Device pixel ratio affects the mapping between CSS pixels and device pixels. High-density displays may require more raster work and memory. Zoom, display scaling, and text rendering differ by platform.

## Exercise
Use a browser's rendering tools to inspect layers and paint activity on a page with shadows, transforms, and sticky elements. Remove unnecessary layer hints and compare memory and visual smoothness.
