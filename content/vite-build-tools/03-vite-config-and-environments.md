# Vite Configuration and Environments

## Configuration file
Vite can be configured with `vite.config.js`, `vite.config.ts`, or another supported variant. A simple configuration might look like this:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  // Add only the settings the project needs.
});
```

Framework plugins, aliases, development-server options, build settings, and environment-specific behavior can be added deliberately. Avoid copying a large configuration when a few defaults are sufficient.

## Configuration is code
A config file is executed by the build tool in its supported environment. Do not assume browser APIs such as `window` exist there. Keep secrets out of config values that are serialized into client output.

## Modes and environment files
Vite supports modes and `.env` files. The mode influences which environment files are loaded; it is not automatically the same thing as `NODE_ENV` in every command. Check the current documentation when defining custom modes.

Client-exposed variables commonly use the `VITE_` prefix. These values are embedded for client use and must be treated as public. Never place database passwords, signing keys, or private API credentials in a `VITE_` variable.

## Validate required settings
Fail early when a required value is missing. Provide an `.env.example` containing safe placeholders, keep real local secrets out of version control, and configure preview and production values through the deployment environment.

## Practice
Create separate development and production settings for a public API base URL. Identify which variables are public and prove that no secret is included in the generated client files.
