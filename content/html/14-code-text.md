---
title: Code and Technical Text — code, pre, kbd, samp, var
order: 14
book: html
---

# Code and Technical Text — `code`, `pre`, `kbd`, `samp`, `var`

When writing about programming, commands, or technical material, five elements
let you mark up the text correctly. Each means something slightly different.
Together they make your technical content readable to humans and to machines.

## `<code>` — a fragment of code

Marks a snippet of code — a function name, a variable, a file path, an inline
expression.

```html
<p>Use <code>console.log()</code> to print to the console.</p>
<p>The file is stored at <code>/var/www/html/index.html</code>.</p>
```

Browsers render it in a monospace font by default. It's **inline** — flows with
the surrounding text.

### Inside `<code>`

The content is treated as literal — no HTML elements are interpreted inside
(it still gets parsed as HTML, but the code sample is treated as text). Special
characters need to be escaped:

| To display | Write |
|---|---|
| `<` | `&lt;` |
| `>` | `&gt;` |
| `&` | `&amp;` |

Example:

```html
<p>The tag for a paragraph is <code>&lt;p&gt;</code>.</p>
```

## `<pre>` — preformatted text

Preserves whitespace and line breaks exactly as written. Browsers render it in
monospace and don't collapse spaces or newlines.

```html
<pre>
  function greet(name) {
    return "Hello, " + name;
  }
</pre>
```

The indentation and line breaks are preserved. This is essential for
multi-line code.

### Preformatted ASCII art

```html
<pre>
   /\_/\
  ( o.o )
   > ^ <
</pre>
```

Without `<pre>`, this would collapse into a single line.

## `<pre>` + `<code>` — the standard combo

For multi-line code samples, use both:

```html
<pre><code>function add(a, b) {
  return a + b;
}</code></pre>
```

- `<pre>` preserves whitespace and forces block layout
- `<code>` marks the content as code

Browsers don't require both, but the convention is to use them together. Many
syntax highlighters and copy buttons look for `<pre><code>` structure.

Note: `<code>` goes **inside** `<pre>`, not the other way around.

## `<kbd>` — keyboard input

Marks what the user should type on a keyboard.

```html
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
<p>Open the command palette with <kbd>Cmd</kbd> + <kbd>K</kbd>.</p>
```

Browsers render it in monospace, usually slightly styled to look keyboard-ish.

### Nested `<kbd>`

You can nest `<kbd>` inside `<kbd>` to represent a single keypress that itself
involves multiple keys:

```html
<p>Save the file with <kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd>.</p>
```

The outer `<kbd>` means "this whole thing is one keystroke." The inner ones are
the individual keys. It's optional but semantically nice.

## `<samp>` — sample output

Marks output from a program — what the computer prints.

```html
<p>Running the script produces:</p>
<samp>Hello, world!</samp>
```

For multi-line output, combine with `<pre>`:

```html
<pre><samp>$ npm install
added 234 packages in 12s
$ npm run dev

  VITE v5.4.6  ready in 312 ms

  ➜  Local:   http://localhost:5173/</samp></pre>
```

Browsers render `<samp>` in monospace.

## `<var>` — a variable

Marks a variable name in mathematical or programming context.

```html
<p>The equation is <var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> =
<var>c</var><sup>2</sup>.</p>
<p>Set the <var>timeout</var> variable to 5000.</p>
```

Browsers render it in italic by default. It's distinct from `<code>` because
it's not about showing code — it's about referencing a variable name as a
mathematical entity.

## The five together

A single snippet demonstrating all five:

```html
<p>
  In the shell, type <kbd>echo $NAME</kbd> where <var>NAME</var> is any
  identifier. The program will print <samp>Hello, NAME</samp>. To do this in
  code, call <code>console.log()</code>.
</p>

<pre><code>const name = "Alice";
console.log(`Hello, ${name}`);</code></pre>
```

Each element is doing its own job.

## Escaping special characters

Inside `<code>` and `<pre>`, special characters must still be escaped because
the browser parses them as HTML:

```html
<!-- To display: <div> -->
<code>&lt;div&gt;</code>

<!-- To display: a & b -->
<code>a &amp; b</code>

<!-- To display: <script> -->
<code>&lt;script&gt;</code>
```

If you forget, the browser will try to interpret the content as HTML tags and
the code sample will break.

## Syntax highlighting

HTML has no built-in way to add color to code. That's a job for CSS (or a
JavaScript library that generates the CSS). Common approaches:

- **Prism.js** — client-side highlighter
- **highlight.js** — another client-side option
- **Shiki** — build-time highlighter, best output
- **Manual** — span-wrapped tokens with custom classes

For a textbook site, build-time highlighting (Shiki) gives the cleanest result
with zero runtime cost.

## Common mistakes

- Using `<code>` for prose that mentions code, without the tags — like writing
  "use console.log()" instead of `<code>console.log()</code>`.
- Forgetting to escape `<` and `>` inside code samples. The browser will
  interpret them as tags.
- Using `<pre>` alone for code without `<code>`. Works, but misses the semantic
  marker.
- Using `<code>` alone for multi-line code. Whitespace collapses into one long
  line.
- Using `<var>` for anything other than variable names. It's not a styling
  tag — its meaning is specifically "a variable."
- Mixing `<kbd>` and `<samp>`. `<kbd>` is *input* (user types), `<samp>` is
  *output* (program prints).

## The takeaway

- `<code>` — a code fragment, inline
- `<pre>` — preserves whitespace, for multi-line content
- `<pre><code>` — the standard combo for code blocks
- `<kbd>` — keyboard input
- `<samp>` — program output
- `<var>` — variable name
- Escape `<` as `&lt;` and `&` as `&amp;` inside code
- Add syntax highlighting with CSS or a highlighting library

Each element exists for a reason. Using them correctly makes your technical
content clearer, more accessible, and easier to style.