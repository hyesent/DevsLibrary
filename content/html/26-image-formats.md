---
title: Image Formats
order: 26
book: html
---

# Image Formats

Picking the right image format affects page size, load speed, and visual
quality. Each format has strengths. This lesson is a practical guide to what to
use when.

## The main formats

| Format | Best for | Transparency | Animation | Compression |
|---|---|---|---|---|
| JPEG | Photos | No | No | Lossy |
| PNG | UI, screenshots, logos | Yes | No | Lossless |
| GIF | Simple animations (legacy) | Yes | Yes | Lossless |
| WebP | Everything (modern) | Yes | Yes | Both |
| AVIF | Everything (newest) | Yes | Yes | Both |
| SVG | Icons, logos, illustrations | Yes | Yes | Vector |

## JPEG (.jpg, .jpeg)

The workhorse for photographs. Uses lossy compression — it throws away detail
to make files small.

**Use for:**
- Photos of people, places, things
- Complex images with smooth gradients
- Any image where file size matters more than perfect fidelity

**Don't use for:**
- Icons, logos, or anything with sharp edges (JPEG artifacts look awful on
  text)
- Images that need transparency
- Screenshots of UI

Quality setting: aim for 75–85%. Above that, file size balloons with barely
noticeable improvement. Below 60%, artifacts become visible.

Progressive JPEGs load with a blurry-to-sharp effect, useful for large hero
images.

## PNG (.png)

Lossless compression. Keeps every pixel exactly as authored.

**Use for:**
- Screenshots
- Icons and logos with flat colors
- Images that need transparency
- Anything with sharp edges or fine detail

**Don't use for:**
- Photographs (files get huge)

PNG-8 (256 colors) is smaller; PNG-24 (millions of colors) is fuller but
larger. Tools like TinyPNG or ImageOptim shrink PNGs significantly by re-
encoding.

## GIF (.gif)

The old animated format. Limited to 256 colors, no alpha blending, files are
typically huge.

**Use for:** basically nothing new. Convert GIFs to WebP or MP4.

Modern replacements:
- Animated → WebP or AVIF
- Short clips → MP4 video (much smaller)

## WebP (.webp)

Google's modern format. Supports lossy and lossless compression, transparency,
and animation. Universally supported in modern browsers (2020+).

**Use for:** essentially everything — photos, icons, animations.

Typically 25–35% smaller than JPEG at the same visual quality. If you only ship
one modern format, ship WebP.

## AVIF (.avif)

The newest format. Even better compression than WebP — sometimes 50% smaller
than JPEG. Supports HDR, wide color gamut, and transparency.

**Use for:** everything, when you can.

Browser support is now good (Chrome, Firefox, Safari all support it). Use it
with a WebP fallback via `<picture>` for maximum compatibility.

Downside: slower to encode and decode. Not ideal for very large numbers of
images, or for very low-powered devices.

## SVG (.svg)

Vector format. Describes shapes mathematically, not pixel-by-pixel.

**Use for:**
- Icons
- Logos
- Simple illustrations
- Anything that needs to scale perfectly at any size

**Don't use for:**
- Photographs
- Complex images with millions of colors

SVG files can be tiny (a few hundred bytes) and scale infinitely. They can be
styled and animated with CSS. For icons, they're the clear winner.

See the SVG book in this collection for full details.

## Choosing a format

Quick rules:

1. **Photo?** → WebP, with JPEG fallback
2. **Icon, logo, illustration?** → SVG
3. **Screenshot or UI mockup?** → PNG or WebP
4. **Needs transparency?** → WebP or PNG (not JPEG)
5. **Animated?** → WebP or AVIF or short MP4 (never GIF)
6. **Must support ancient browsers?** → JPEG or PNG

## Serving multiple formats

Modern browsers support modern formats. Use `<picture>` to offer WebP or AVIF
with fallbacks:

```html
<picture>
  <source srcset="cat.avif" type="image/avif">
  <source srcset="cat.webp" type="image/webp">
  <img src="cat.jpg" alt="A cat">
</picture>
```

The browser picks the first format it supports. Old browsers fall back to the
`<img>`.

## Compression tools

- **ImageOptim** (Mac) — drag-and-drop, lossless
- **Squoosh** (web) — Google's tool, per-image control
- **sharp** (Node) — programmatic
- **cwebp**, **avifenc** — command line
- **TinyPNG** (web) — good for PNG and JPEG

Aim for images under 200 KB where possible. Hero images can be larger; icons
and thumbnails should be tiny.

## Resolution and DPR

Screens come in different pixel densities:

- Standard (1x): 1 CSS pixel = 1 physical pixel
- Retina / high-DPI (2x, 3x): 1 CSS pixel = 2 or 3 physical pixels

For sharp rendering on retina displays, supply larger images and use `srcset`
to let the browser pick. (Covered in the next lesson.)

## Common mistakes

- Serving PNG for photographs — files can be 5–10x larger than JPEG.
- Serving JPEG for icons or text — compression artifacts ruin edges.
- Using GIF for anything new — huge and low-quality.
- Skipping WebP/AVIF entirely — you're missing 30–50% size savings.
- Shipping a 4000px wide image to a 400px container — wasteful.
- Not compressing images at all — a single uncompressed photo can blow your
  page budget.
- Using raster images for icons when SVG would be a fraction of the size and
  infinitely sharper.

## The takeaway

- **JPEG** — photos
- **PNG** — screenshots, icons with sharp edges, transparency
- **GIF** — legacy; use WebP/AVIF/MP4 instead
- **WebP** — modern default; use everywhere
- **AVIF** — newest, smallest; use with fallback
- **SVG** — icons, logos, illustrations
- Compress everything
- Use `<picture>` to offer modern formats with fallbacks

Pick the right format and your page gets faster with zero visual cost.