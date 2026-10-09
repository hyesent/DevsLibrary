# Browser Internals Glossary

> DevsLibrary · Browser Internals · Lesson 35

## Core terms
- **Accessibility tree:** A platform-facing representation of interface semantics.
- **Compositor:** A subsystem that combines visual layers into frames.
- **CSSOM:** The object model representing CSS rules and style information.
- **DOM:** The object model representing document structure.
- **Event loop:** The scheduling model for tasks, microtasks, and related work in a JavaScript environment.
- **Garbage collection:** Automatic reclamation of unreachable memory.
- **JIT compilation:** Runtime compilation of code using execution feedback and optimization.
- **Layout:** Calculation of element geometry and position.
- **Main thread:** The thread commonly responsible for DOM work, JavaScript, and much rendering coordination in a document.
- **Origin:** Usually the tuple of scheme, host, and port.
- **Paint:** Recording visual drawing operations.
- **Rasterization:** Converting drawing instructions into pixels.
- **Service worker:** A script with lifecycle and request-interception capabilities, subject to platform rules.
- **Site isolation:** Browser architecture that separates content into processes or security boundaries.
- **Style recalculation:** Resolving styles for elements after relevant changes.

## Further reading
- HTML Living Standard: https://html.spec.whatwg.org/
- CSS specifications: https://www.w3.org/Style/CSS/
- ECMAScript specification: https://tc39.es/ecma262/
- Fetch Standard: https://fetch.spec.whatwg.org/
- MDN Web Docs: https://developer.mozilla.org/
- Chrome for Developers: https://developer.chrome.com/docs/
- web.dev: https://web.dev/learn/
- WebKit documentation: https://webkit.org/
- Firefox source and platform documentation: https://firefox-source-docs.mozilla.org/

## Final exercise
Pick three terms and explain how each affects a real bug or performance issue you have encountered. Include a test or observation that supports your explanation.
