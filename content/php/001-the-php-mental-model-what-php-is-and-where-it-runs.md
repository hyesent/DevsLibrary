# 001. The PHP Mental Model: What PHP Is and Where It Runs

> Book: PHP · Level: beginner to advanced · Part 1 of 45

# Learning goals
- Explain PHP's role in a web application and distinguish it from HTML, CSS, JavaScript, and a web server.
- Trace a request from browser to server-side PHP execution and back.
- Identify CLI PHP, web-server PHP, and the PHP runtime.

## The model
PHP is a general-purpose language especially common in server-rendered web applications. A browser normally receives the output of PHP—not the PHP source itself. A PHP runtime executes the source on the server, and the resulting response may contain HTML, JSON, a redirect, or another body.

A typical request path is: browser → DNS/TCP/TLS → web server or reverse proxy → PHP runtime (often PHP-FPM) → application code → database or other services → HTTP response. The exact deployment varies; the responsibilities remain distinct.

## A first script
```php
<?php
declare(strict_types=1);

echo "Hello, PHP!";
```
Save as `hello.php` and run `php hello.php`. The CLI executes it locally. A web server configured for PHP can execute a script for an HTTP request. Do not assume that placing a `.php` file on an arbitrary static host makes it execute.

## PHP and other layers
- HTML describes document structure.
- CSS controls presentation.
- Browser JavaScript adds client-side behavior.
- PHP can generate HTML, validate requests, enforce permissions, and coordinate persistence.
- A database stores durable application data.
These layers can cooperate without being interchangeable.

## Common mistakes
- Uploading PHP source to a server that does not execute PHP.
- Believing `echo` sends data directly to a user's screen; in web execution it writes to the response output stream.
- Mixing deployment configuration with language semantics.

## Practice
1. Run a CLI script that prints your PHP version.
2. Draw the request lifecycle for a page that reads a product from a database.
3. Explain why hiding a link in HTML is not authorization.

## Self-check
- Where should secrets live: browser JavaScript or server configuration?
- What component turns PHP source into output?
