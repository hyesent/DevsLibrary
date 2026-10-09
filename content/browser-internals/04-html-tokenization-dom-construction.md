# HTML Parsing and DOM Construction

> DevsLibrary · Browser Internals · Lesson 04

## From bytes to nodes
The browser decodes the response into characters, tokenizes HTML, and builds a Document Object Model (DOM). HTML parsing has defined error-recovery rules, so malformed markup may still produce a tree—but relying on recovery can create surprising structure.

The parser handles tags, attributes, text, comments, and character references. Some elements have special parsing behavior. Script execution can pause parsing depending on script type and attributes.

## DOM is a live object model
The DOM represents document structure as nodes and objects. JavaScript can query, create, remove, and modify nodes. DOM changes may trigger style recalculation, layout, paint, or accessibility-tree updates depending on what changed.

## Script loading attributes
A classic script without `async` or `defer` can block parsing while it is fetched and executed. `defer` scripts download during parsing and execute in document order after parsing. `async` scripts execute when ready and do not preserve order. Module scripts are deferred by default, with additional module-loading semantics.

Choose attributes based on dependencies and execution order, not by habit.

## Exercise
Create a page with classic, `defer`, `async`, and module scripts that log execution times. Observe order under different network conditions, and explain why `async` order is not deterministic.
