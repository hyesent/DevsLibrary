# 030. Templates, Layouts, Components, and Safe Server Rendering

> Book: PHP · Level: beginner to advanced · Part 30 of 45

# Learning goals
- Separate view rendering from business logic.
- Reuse layouts and components without unsafe output.
- Keep presentation decisions out of persistence code.

Server-rendered PHP can use plain include files or a template engine. Establish clear variables passed to each template and avoid templates that mutate business state. Escape dynamic output by default, then provide narrowly scoped safe-rendering mechanisms for trusted HTML where necessary.

Includes execute PHP in the current scope, so included files may see surrounding variables; that can create hidden coupling. Prefer a template engine or a disciplined render function with a clear data contract for larger applications. Keep layout, page-specific view, and reusable component responsibilities distinct.

A template should not be the only place where authorization happens. Do not render a secret or protected field and merely hide it with CSS. Avoid echoing raw user-generated HTML unless it has been safely sanitized for the allowed markup policy.

## Practice
Build a reusable layout with navigation and a page-specific view. Test escaping with hostile input and verify that authorization happens before data is exposed.
