# How Browsers Work

> DevsLibrary · Browser Internals · Lesson 01

## The browser as a system
A browser is a collection of cooperating subsystems rather than a single renderer. Common responsibilities include user interface, navigation, networking, parsing, rendering, storage, JavaScript execution, accessibility integration, security boundaries, and process management. The exact architecture differs by browser and operating system.

A useful mental model is:
1. The user requests a URL or activates a link.
2. The browser resolves navigation and security policy.
3. Networking retrieves a response, potentially through caches or service workers.
4. The response is decoded and parsed.
5. HTML becomes a DOM; CSS becomes style rules and layout inputs.
6. Scripts may run and modify the document.
7. Style, layout, paint, and compositing produce pixels.
8. The browser responds to events, resource changes, and user input.

These stages overlap. The browser may discover and fetch resources while parsing, execute scripts at different times, and update only parts of the rendered output.

## Browser engine versus JavaScript engine
A browser engine coordinates document parsing, style calculation, layout, painting, and related web-platform behavior. A JavaScript engine parses and executes JavaScript and manages runtime memory. Modern engines are tightly integrated, but these are distinct responsibilities. The network stack, storage, GPU process, and UI process may be separate components.

## Why developers should care
A slow page may be limited by server response time, resource discovery, JavaScript execution, style recalculation, layout, image decoding, or main-thread contention. Knowing the pipeline helps you measure the actual bottleneck instead of optimizing randomly.

## Exercise
Open browser developer tools on a page. Identify the network panel, performance timeline, DOM inspector, console, and storage inspector. For one interaction, predict which subsystems are involved, then record what the tools show.
