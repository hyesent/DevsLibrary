# Creating and Understanding a Vite Project

## Create a project
Use the official Vite guide and a supported Node.js version. A typical interactive setup is:

```bash
npm create vite@latest
cd my-app
npm install
npm run dev
```

Choose the framework and language template that match the project. The exact template list and Node.js requirements evolve, so check the current Vite documentation rather than relying on a command copied from an old tutorial.

## Typical structure
```text
my-app/
  public/
  src/
    main.ts
    style.css
  index.html
  package.json
  package-lock.json
  vite.config.ts
```

Templates differ. React projects may have `App.tsx`, Vue projects may have `.vue` files, and JavaScript templates may omit TypeScript. `index.html` is a first-class part of Vite's application entry, not merely an incidental static file.

## Package scripts
Inspect `package.json`. Common scripts include `dev`, `build`, and `preview`, but names are project conventions and can be changed. `vite preview` serves a built output locally for inspection; it is not intended to be a production hosting service.

## First change
Start the dev server, edit the app's visible heading, and observe the browser update. Then run the production build and inspect the output directory, commonly `dist/`.

## Reproducible setup
Commit the package manifest and the matching lockfile. Use one package manager consistently. Before upgrading Vite or plugins, check compatibility notes and test the production build.

## Practice
Create a minimal project, identify its entry HTML, JavaScript entry, scripts, public assets, and generated output. Record the Node.js and package-manager versions used.
