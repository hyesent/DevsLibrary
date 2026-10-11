# Vite Plugins and Plugin Ordering

## What plugins do
Plugins extend the development server and build pipeline. They may transform files, resolve imports, provide virtual modules, handle assets, or integrate a UI framework. Prefer maintained official or widely used plugins when they solve a real need.

## Plugin lifecycle
Plugins can run at different phases of development and build. Order can matter when one plugin transforms a file that another plugin consumes. Use documented plugin hooks and ordering controls rather than relying on accidental behavior.

## Framework plugins
A React or Vue plugin may support features beyond syntax transformation, including fast refresh. A generic JavaScript transform is not a substitute for the framework's full integration.

## Virtual modules and transformations
Advanced plugins may expose virtual modules or rewrite source code. These features are powerful but can make debugging harder. Document the source of generated code and ensure transforms are deterministic where practical.

## Evaluate plugin risk
Check maintenance, compatibility with your Vite version, issue activity, dependency tree, permissions, and release history. A plugin executes as part of your development/build process and should be treated as code with access to that environment.

## Practice
Add one framework plugin to a starter project. Document what it enables, which hooks or transformations it uses at a high level, and how you would test an upgrade.
