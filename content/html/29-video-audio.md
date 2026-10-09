---
title: <video> and <audio>
order: 29
book: html
---

# `<video>` and `<audio>`

HTML5 replaced the old plugin-based media (Flash, QuickTime) with native
elements: `<video>` and `<audio>`. They work without plugins, support captions,
and integrate with CSS and JavaScript.

## Basic `<video>`

```html
<video src="demo.mp4" controls></video>
```

Without `controls`, there's no way for the user to play, pause, or adjust
volume. Always include it — or build your own UI.

## Basic `<audio>`

```html
<audio src="episode.mp3" controls></audio>
```

Same idea. The `controls` attribute gives the browser's default player UI.

## The `src` vs `<source>` approach

Two ways to point at media:

### Direct `src`

```html
<video src="demo.mp4" controls></video>
```

Simple, works for one format.

### Multiple `<source>` elements

```html
<video controls>
  <source src="demo.webm" type="video/webm">
  <source src="demo.mp4" type="video/mp4">
  Your browser doesn't support HTML5 video.
</video>
```

The browser tries each source in order and uses the first one it can play.
The text inside (without any tag) is a fallback message shown by very old
browsers.

This is the recommended approach — it lets you offer modern formats (WebM,
AV1) with a compatible fallback (MP4/H.264).

## Video attributes

| Attribute | Effect |
|---|---|
| `controls` | Show the browser's player controls |
| `autoplay` | Start playing automatically |
| `muted` | Start muted |
| `loop` | Repeat when finished |
| `playsinline` | Play inline on iOS (not fullscreen) |
| `poster` | Image shown before playback |
| `preload` | Hint for preloading behavior |
| `width`, `height` | Intrinsic size |

### `autoplay`

Most browsers block autoplay with sound. To make autoplay work, you almost
always need `muted`:

```html
<video src="bg.mp4" autoplay muted loop playsinline></video>
```

That's the pattern for background videos.

### `playsinline`

On iOS Safari, videos would normally open fullscreen when they play. Add
`playsinline` to keep them in-page:

```html
<video src="demo.mp4" playsinline controls></video>
```

### `poster`

Show an image while the video loads:

```html
<video src="demo.mp4" poster="thumbnail.jpg" controls></video>
```

### `preload`

- `none` — don't preload; user decides
- `metadata` — load only metadata (duration, dimensions)
- `auto` — let the browser decide (may or may not preload)

```html
<video src="demo.mp4" preload="metadata" controls></video>
```

Good for a page with many videos: `preload="metadata"` saves bandwidth.

## Subtitles and captions — `<track>`

`<track>` adds subtitles, captions, descriptions, or chapters:

```html
<video src="demo.mp4" controls>
  <track
    kind="subtitles"
    src="demo-en.vtt"
    srclang="en"
    label="English"
    default>
  <track
    kind="subtitles"
    src="demo-es.vtt"
    srclang="es"
    label="Español">
</video>
```

`kind` values:

- `subtitles` — translation of dialogue
- `captions` — dialogue + non-speech sounds (for deaf users)
- `descriptions` — audio description of visual content
- `chapters` — chapter navigation
- `metadata` — scripts, data

Track files are **WebVTT** (`.vtt`), not SRT, for HTML5.

## Audio attributes

Same as video except video-specific ones:

- `controls`
- `autoplay`
- `loop`
- `muted` (rarely useful for audio)
- `preload`
- `<source>`
- `<track>` (also works for audio)

## Fallback content

Anything between `<video>` tags that isn't a `<source>`, `<track>`, or
`<p>`-like element is shown if the browser can't play the video:

```html
<video controls>
  <source src="demo.webm" type="video/webm">
  <source src="demo.mp4" type="video/mp4">
  <p>Your browser doesn't support HTML5 video.
     <a href="demo.mp4">Download the video</a>.</p>
</video>
```

Old browsers get a useful message and download link.

## A complete example

```html
<figure>
  <video
    controls
    width="800"
    height="450"
    poster="preview.jpg"
    preload="metadata"
    playsinline>
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
    <track
      kind="captions"
      src="video-en.vtt"
      srclang="en"
      label="English"
      default>
    Your browser doesn't support HTML5 video.
  </video>
  <figcaption>Demo: Installing the tool.</figcaption>
</figure>
```

## Accessibility notes

- Always provide captions via `<track kind="captions">` for spoken content.
- Provide an audio description track for videos where visual information is
  essential.
- Don't autoplay with sound — it's jarring and can interfere with screen
  readers.
- Provide a way to pause/stop. `controls` covers this.

## Styling

The browser's default `<video>` UI is hard to customize. Options:

1. Use `controls` and accept the default look
2. Hide controls (`controls` off) and build your own UI in JavaScript
3. Use a library (Video.js, Plyr, etc.) for full control

For quick projects, `controls` is fine.

## Common mistakes

- Forgetting `controls` and then wondering why nothing happens.
- Autoplaying with sound — browsers block it, and users hate it.
- Not adding `playsinline` and getting fullscreen-on-load on iOS.
- Skipping `<track>` for spoken content — videos without captions are
  inaccessible.
- Using `autoplay` for anything other than muted background video.
- Not setting `preload` on pages with many videos — all of them download at
  once.
- Omitting fallback content for old browsers (rare today but good practice).

## The takeaway

- `<video>` and `<audio>` are native HTML5 elements
- Use `<source>` elements for multiple formats + fallback
- `controls`, `autoplay` (with `muted`), `loop`, `playsinline`, `poster`,
  `preload` for video
- `<track>` for subtitles and captions (WebVTT)
- Provide captions for spoken content — it's not optional
- Don't autoplay with sound
- Add fallback content for unsupported browsers

Native media elements are simple, accessible, and widely supported. Use them
instead of reinventing video playback.