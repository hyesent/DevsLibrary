---
title: Setting Up Your Environment
order: 3
book: html
---

# Setting Up Your Environment

You can write HTML in a plain text editor and open the result in any browser.
That's the whole toolchain. But a few small choices make the work much nicer,
especially once you're writing hundreds of lines.

## What you actually need

Just three things:

1. **A text editor** — for writing the HTML
2. **A browser** — for viewing it
3. **A way to open the file** — usually a live server, so you don't have to keep
   refreshing manually

That's it. No compilers, no build tools, no frameworks.

## Picking a text editor

Any of these will do the job well:

- **VS Code** — free, hugely popular, great HTML support
- **Sublime Text** — fast, minimal
- **Neovim** — if you live in the terminal
- **WebStorm** — heavier, paid, lots of built-in tooling

For this book, **VS Code** is the safest default. It's free, works everywhere,
and has all the extensions you'll want.

## Setting up VS Code for HTML

Once installed:

1. Open VS Code
2. Create a new folder for your work (e.g. `html-practice`)
3. Open that folder in VS Code (`File → Open Folder`)
4. Create a new file called `index.html`

The `.html` extension is what tells VS Code (and the browser) this is an HTML
file. Don't skip it.

## Useful VS Code extensions

None of these are required, but they help:

- **Live Server** — spins up a local server with auto-reload on save. This is
  the single most useful extension for HTML work.
- **Prettier** — formats your code on save so it stays consistent
- **HTML CSS Support** — autocomplete for classes and IDs

Install Live Server, then right-click your `index.html` and choose
**"Open with Live Server."** A browser tab opens. Save the file → the tab
auto-refreshes. That's the workflow.

## Your folder structure

For practice, keep it simple:

```
html-practice/
├── index.html
├── about.html
└── images/
    └── cat.jpg
```

Flat and obvious. No build step, no `src/`, no `dist/`. Just files.

For bigger projects, you'd organize with folders — we'll get into that later.
For now, keep it flat.

## Writing your first file

Open `index.html` and type this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello, world.</h1>
  </body>
</html>
```

Save it. If you're using Live Server, the browser updates automatically. If not,
just open the file in your browser by double-clicking it.

You should see **Hello, world.** in large text. That's your first HTML page.

## Running without Live Server

If you'd rather not install extensions, the file works just as well when opened
directly:

1. Navigate to the folder
2. Double-click `index.html`
3. It opens in your default browser

The only downside is you have to refresh manually every time you change
something. Live Server solves that.

## Developer tools

Every browser ships with developer tools built in. Open them with:

- **Chrome / Edge:** `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
- **Firefox:** `F12` or `Cmd+Option+I`
- **Safari:** Enable in Preferences → Advanced → "Show Develop menu", then
  `Cmd+Option+I`

Go to the **Elements** tab. You'll see the DOM tree — the browser's live view of
your HTML. This is where you'll spend a lot of time debugging.

## Common mistakes

- Saving the file without the `.html` extension. The browser won't treat it as
  HTML.
- Naming the file `index.html.txt` on Windows because file extensions are
  hidden by default. Turn them on in Explorer settings.
- Editing HTML in a word processor like Microsoft Word. Word inserts invisible
  characters that break the file. Use a plain text editor.
- Skipping Live Server and refreshing manually, then wondering why development
  feels slow.
- Writing HTML without ever opening DevTools. You're missing the most useful
  tool you have.

## The takeaway

- You only need: editor + browser (+ Live Server if you want)
- **VS Code + Live Server** is the smoothest setup for HTML work
- Keep folders flat while learning
- Always open DevTools and look at the Elements panel
- The `.html` extension is not optional

Once this is set up, you'll spend the rest of the book just writing tags. That's
the easy part.