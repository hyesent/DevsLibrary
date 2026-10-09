---
title: Form Basics — form, action, method, enctype
order: 35
book: html
---

# Form Basics — `form`, `action`, `method`, `enctype`

Forms are how the web collects input. Every search box, login page, checkout
flow, and comment form starts with the `<form>` element and a handful of
attributes that control where and how data is sent.

## Basic structure

```html
<form action="/submit" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text">

  <button type="submit">Send</button>
</form>
```

Three elements:
- `<form>` — the container
- `<input>`, `<label>`, etc. — the fields
- `<button type="submit">` — the thing that submits

## The `<form>` element

Wraps everything. Only input elements **inside** a `<form>` get submitted with
it.

```html
<form action="/search" method="get">
  <input name="q" type="search">
  <button type="submit">Search</button>
</form>
```

Click "Search" → browser navigates to `/search?q=...`.

## `action` — where the data goes

```html
<form action="/submit">
```

The URL the form submits to. Same path rules as `<a href>`.

Omit `action` to submit to the current URL (self-submission, common for search
forms on the same page):

```html
<form method="get">
  <input name="q">
</form>
```

## `method` — how the data goes

Two values:

### `method="get"`

Data is appended to the URL as a query string:

```
/search?q=hello&page=1
```

Use for:
- Search forms
- Filters
- Anything that's idempotent — refreshing gives the same result

Pros: bookmarkable URLs, shareable, cached.
Cons: visible in browser history and server logs.

### `method="post"`

Data is sent in the request body, not the URL.

```
POST /submit
Content-Type: application/x-www-form-urlencoded

name=Alice&email=alice%40example.com
```

Use for:
- Login
- Signup
- Any form that changes state
- Anything sensitive (passwords, personal data)

Pros: not visible in URL, no length limit.
Cons: not bookmarkable, refreshing may resubmit.

**Default rule:** if the form changes data on the server (create, update,
delete), use `post`. If it just reads or filters, use `get`.

## `enctype` — how the body is encoded

Controls how the form data is formatted in the request body. Only matters for
`method="post"`.

### `application/x-www-form-urlencoded` (default)

Standard URL encoding:

```
name=Alice&email=alice%40example.com
```

Fine for text fields.

### `multipart/form-data`

Required for **file uploads**:

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar">
  <button type="submit">Upload</button>
</form>
```

Without `multipart/form-data`, file uploads send only the filename, not the
file contents.

### `text/plain`

Sends data as plain text. Rarely useful — mostly for debugging.

## `name` — the key in the data

Every input needs a `name`. That's the key in the submitted data:

```html
<input type="text" name="username">
```

Submitting this sends `username=...` to the server. Without `name`, the input
isn't submitted at all.

This trips up beginners constantly. Every field you want to receive needs a
`name`.

## `target` — where the response opens

```html
<form action="/search" method="get" target="_blank">
```

Same values as `<a target>`:
- `_self` — same tab (default)
- `_blank` — new tab
- `_parent`, `_top` — for frames

Rarely needed. Occasionally used for print-friendly result pages.

## `autocomplete`

Enables or disables browser autofill:

```html
<form autocomplete="on">
<form autocomplete="off">
```

Modern browsers sometimes ignore `off` for login fields. For full control, set
it on individual inputs, or use specific values like `autocomplete="new-
password"` or `autocomplete="one-time-code"`.

## `novalidate`

Disables HTML5 built-in validation for the whole form:

```html
<form novalidate>
```

Useful when you're doing custom validation in JavaScript and don't want the
browser's default popups interfering.

## `accept-charset`

Specifies character encoding for the submission. Default is the document's
charset (usually UTF-8). Rarely needs changing:

```html
<form accept-charset="UTF-8">
```

## A complete example

```html
<form action="/contact" method="post" autocomplete="on">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5"></textarea>

  <button type="submit">Send</button>
</form>
```

Submitting POSTs to `/contact` with the form data in the request body.

## What happens on submit

1. User clicks "Send" (or presses Enter in a field).
2. Browser runs HTML5 validation. If any field is invalid, submission is
   blocked and a message appears.
3. If valid, browser gathers all inputs with `name` attributes inside the form.
4. Encodes them per `enctype`.
5. Sends to `action` with `method`.
6. Navigates the page to the response.

If you want to intercept this in JavaScript, listen for the `submit` event and
call `preventDefault()`:

```js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // do your own thing
});
```

## Forms without a server

You can still build a form for a static site and POST it to a service:

- **Formspree** — formspree.io
- **Netlify Forms** — netlify.com/forms
- **Getform** — getform.io
- **Basin**, **Formcarry**, etc.

Or use the `mailto:` action (poorly supported, not recommended).

## Accessibility notes

- Every input needs a `<label>` (covered in detail later)
- Group related inputs with `<fieldset>` and `<legend>`
- Use `required` to mark mandatory fields (screen readers announce it)
- Errors need to be programmatically linked, not just colored
- Don't rely on placeholder text as labels — placeholders disappear on input

## Common mistakes

- Forgetting `name` on inputs. The field is submitted with no key and gets
  ignored.
- Using `method="post"` with `enctype` unset for file uploads — the file won't
  be included.
- Using `method="get"` for login forms. Credentials end up in the URL.
- Nested forms. Invalid — the browser ignores the inner one.
- Multiple submit buttons without `name`/`value`, so you can't tell which was
  clicked server-side.
- Not handling the form submission at all in a single-page app — the page
  reloads.
- Missing `<label>` on inputs, breaking screen reader use.

## The takeaway

- `<form>` wraps inputs; only inputs inside the form are submitted
- `action` — where data goes
- `method="get"` — query string; use for search/filters
- `method="post"` — request body; use for anything that changes data
- `enctype="multipart/form-data"` — required for file uploads
- Every input needs a `name`
- Use `required`, `autocomplete`, `novalidate` when appropriate
- Always pair inputs with `<label>`

Forms are the front door of most web apps. Get the basics right and everything
else — validation, styling, accessibility — has a solid foundation.