# The Development Server and Hot Module Replacement

## Fast feedback
Vite's development server serves source modules and transforms them as the browser requests them. This can reduce startup work compared with bundling the entire application before serving it. Exact behavior depends on the framework plugin and project configuration.

## Hot Module Replacement
HMR updates affected modules during development without requiring a full page reload in many cases. A framework plugin may preserve component state when it can safely do so. If a change affects module structure or state cannot be preserved, a full reload may be necessary.

HMR is a development convenience, not a production feature. Do not build application correctness around the assumption that modules will always be replaced without reloading.

## When HMR fails
Common causes include:
- A syntax or type error prevents the new module from compiling.
- A plugin does not support the affected file type.
- A circular dependency or side effect complicates updates.
- A stale browser tab or service worker is serving old content.
- The dev server is watching a path outside its normal watch scope.

Read the terminal output first, then the browser console. Restarting can be a useful diagnostic step, but repeatedly restarting without understanding the error hides useful evidence.

## Network and host configuration
Bind the dev server to a network interface only when necessary. Exposing a development server to a LAN or public network can reveal source code and development endpoints. Use the tool's documented host and port settings and understand firewall exposure.

## Practice
Make one CSS change and one component change. Observe HMR behavior, then introduce and fix a syntax error. Write down how the terminal and browser report each case.
