---
title: Relative, Absolute, and Root-Relative Paths
order: 21
book: html
---

# Relative, Absolute, and Root-Relative Paths

Paths look simple — `about.html`, `/blog/post-1`, `https://example.com`. But
they behave differently depending on where the current page is. Getting paths
wrong breaks images, links, and stylesheets.

## The three types

1. **Absolute** — full URL, includes protocol and domain
2. **Root-relative** — starts from the site root (leading `/`)
3. **Relative** — starts from the current page's location

Each has its place.

## Absolute paths

```html
<a href="https://example.com/blog/post-1">Post 1</a>
<img src="https://cdn.example.com/images/cat.jpg" alt="Cat">
```

Always the same destination, no matter where the page lives. Use for:
- External websites
- CDN-hosted assets
- Anything you want pinned to a specific URL

Downsides:
- Breaks if the domain changes
- Longer, more verbose

## Root-relative paths

Start with `/`. The path is resolved from the **site root**, not the current
page.

```html
<a href="/about">About</a>
<img src="/images/logo.png" alt="Logo">
<link rel="stylesheet" href="/styles/main.css">
```

`/about` always means "the `/about` path on the current domain."

Works at any depth — whether the current page is at `/blog/posts/2024/march/`
or `/`, `/about` resolves the same way. This is why root-relative paths are
great for site-wide navigation and assets.

Downsides:
- Doesn't work if your site is served from a subdirectory (e.g. GitHub Pages
  at `/myrepo/`) without configuration
- Doesn't work when opening HTML files locally via `file://` (the leading `/`
  points to the filesystem root)

## Relative paths

Start with a filename or `./` or `../`. Resolved from the current page's
directory.

```html
<a href="about.html">About</a>         <!-- same folder -->
<a href="./about.html">About</a>       <!-- same (explicit) -->
<a href="pages/contact.html">Contact</a>
<a href="../index.html">Home</a>
```

- `about.html` — same directory
- `./about.html` — same directory (explicit)
- `pages/contact.html` — subdirectory
- `../index.html` — one directory up
- `../../index.html` — two directories up

### Example

Suppose your site looks like this:

```
site/
├── index.html
├── about.html
├── blog/
│   ├── index.html
│   └── posts/
│       └── hello.html
└── images/
    └── logo.png
```

**From `site/index.html`:**
- `<a href="about.html">` → `site/about.html`
- `<a href="blog/">` → `site/blog/index.html`
- `<a href="blog/posts/hello.html">` → `site/blog/posts/hello.html`
- `<img src="images/logo.png">` → `site/images/logo.png`

**From `site/blog/posts/hello.html`:**
- `<a href="about.html">` → `site/blog/posts/about.html` (doesn't exist!)
- `<a href="../../about.html">` → `site/about.html`
- `<a href="../../images/logo.png">` → `site/images/logo.png`

**From `site/blog/index.html`:**
- `<a href="../about.html">` → `site/about.html`
- `<a href="posts/hello.html">` → `site/blog/posts/hello.html`
- `<a href="../images/logo.png">` → `site/images/logo.png`

The current file's location determines what a relative path resolves to.

## The `./` and `../` prefixes

- `./` — current directory (optional but explicit)
- `../` — parent directory
- `../../` — grandparent

You can chain: `../../folder/file.html`.

Without any prefix, a path like `about.html` is implicitly relative to the
current directory (same as `./about.html`).

## When to use which

| Situation | Use |
|---|---|
| External site (Google, MDN) | Absolute |
| Internal site navigation | Root-relative |
| Local asset (image, CSS) on a simple static site | Relative or root-relative |
| CDN-hosted asset | Absolute |
| Same-page fragment link | Fragment (`#id`) |
| Folder-relative dev/local file | Relative |

For a textbook site like this one: root-relative paths (`/styles/main.css`) are
cleanest — they work regardless of which lesson page is open.

## Common path bugs

### The subdirectory trap

Your site lives at `example.com/mysite/`, and you use root-relative paths:

```html
<link rel="stylesheet" href="/styles/main.css">
```

The browser requests `example.com/styles/main.css` — not
`example.com/mysite/styles/main.css`. Broken.

Fix: either move the site to the domain root, or use relative paths, or
configure your build tool with the correct base path (Vite uses `base:
'./'`).

### The local file:// trap

Open `file:///Users/you/site/index.html` and use:

```html
<img src="/images/logo.png">
```

The browser requests `file:///images/logo.png` — the filesystem root, which
doesn't exist. Root-relative paths don't work for `file://` URLs.

Fix: use relative paths when testing locally without a server, or run a local
server.

### Case sensitivity

On Linux servers, paths are **case-sensitive**:

```
/images/Logo.png   ≠   /images/logo.png
```

On macOS (by default) they aren't, so a broken link might work on your machine
and 404 in production. Test carefully, and always match case exactly.

### Trailing slashes

`/blog` and `/blog/` can mean different things depending on server
configuration:

- `/blog` — might serve `blog.html`, or redirect to `/blog/`
- `/blog/` — usually serves `blog/index.html`

Stick to one convention and be consistent.

## Best practice

For a static site or modern build (Vite, Next.js, etc.):

- Use **root-relative paths** for internal navigation and shared assets
- Use **absolute paths** for external resources
- Keep folder structure shallow and predictable
- Match case exactly — never rely on case-insensitivity

For deep pages, root-relative paths avoid the `../../` chain.

## Common mistakes

- Using root-relative paths (`/foo`) in a site that's served from a
  subdirectory.
- Forgetting that the browser resolves paths relative to the current page, not
  the site root (unless you use `/`).
- Mixing relative and root-relative inconsistently, causing some assets to load
  and others to 404.
- Case mismatches that work on Mac but break on Linux servers.
- Missing `../` in a relative path, sending the browser to the wrong directory.
- Testing only on `localhost` and never on the deployed URL.

## The takeaway

- **Absolute**: full URL, includes domain — for external
- **Root-relative**: starts with `/` — for internal navigation and assets
- **Relative**: from the current page — for small, self-contained projects
- The current page's location determines how relative paths resolve
- Root-relative breaks in subdirectory deployments and `file://` testing
- Case matters on real servers

When in doubt, use root-relative paths for internal content. They're the
least surprising option.