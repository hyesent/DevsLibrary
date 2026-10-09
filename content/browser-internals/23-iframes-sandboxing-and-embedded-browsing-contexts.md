# Iframes, Sandboxing, and Embedded Browsing Contexts

> DevsLibrary · Browser Internals · Lesson 23

## Browsing contexts
An iframe creates a nested browsing context with its own document and execution environment. It may have a separate origin, independent navigation, and different storage or permissions behavior. Embedding a page does not make its content part of the parent's DOM.

## Same-origin access
Parent and child documents can access each other's DOM only under the applicable same-origin rules and other restrictions. Cross-origin communication commonly uses `postMessage`, with strict origin validation and message validation.

## Sandboxing
The iframe `sandbox` attribute can restrict scripts, forms, popups, navigation, and origin behavior. Add only the capabilities required. Combining `allow-scripts` and `allow-same-origin` for same-origin content can undermine the intended isolation in some scenarios; understand the threat model before selecting tokens.

## Permissions and privacy
Use iframe titles that identify embedded content. Limit permissions with appropriate attributes and policies. Third-party embeds can introduce tracking, focus issues, performance costs, and accessibility defects.

## Exercise
Embed a sample document with a restrictive sandbox. Add a validated `postMessage` handshake and test that unexpected origins and malformed messages are rejected.
