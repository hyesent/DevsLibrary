# CSS, Assets, and Static Files

## Importable assets
Vite understands common static asset imports and can transform or emit them according to its build configuration. Imported assets become part of the module graph, which allows the build to fingerprint files and update references.

```ts
import logoUrl from './assets/logo.svg';
import './styles.css';

const image = document.querySelector<HTMLImageElement>('#brand');
if (image) image.src = logoUrl;
```

This example assumes the referenced files and DOM element exist. Framework projects should usually use their normal component syntax instead of manually manipulating the DOM.

## The public directory
Files in `public/` are typically copied as-is and referenced by a root-relative path. Use this for files whose names or URLs should remain stable. Use imported assets when you want the build tool to manage the output URL and dependency.

## CSS processing
Plain CSS works directly. Depending on the project, Vite can support CSS Modules, PostCSS, Sass, and framework-specific styling. Install and configure preprocessors only when needed. Keep global styles deliberate because global selectors can unexpectedly affect unrelated components.

## Asset URLs and base paths
A deployment under a subpath may need a configured base path. Hardcoded root-relative URLs can break when the app is served from `/my-app/` rather than `/`. Test the actual deployment path and use the documented base handling.

## Practice
Add a logo, a font, and a CSS file. Build the app and inspect how asset references differ between development and production.
