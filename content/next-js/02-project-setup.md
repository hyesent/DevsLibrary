# Creating a Project and Understanding Structure

Create a starter with the current installer and review its prompts rather than copying old instructions blindly:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

Check the current system requirements and Node.js support before installing. The installer may ask about TypeScript, linting, Tailwind, a `src/` directory, App Router, and import aliases. These are choices, not all mandatory features.

A typical structure is `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `public/`, `package.json`, and `next.config.ts`. A `src/` directory may wrap source folders. `public/` contains intentionally public assets served from the site root. `app/` defines routes and route-level UI.

Use the package manager and lockfile already used by the project. Run both development and production builds; development hot reload is not proof the production build works. Commit manifests and lockfiles, and review release notes when upgrading framework versions.

**Practice:** Identify the root layout, home page, asset directory, scripts, and framework config in a new project.
