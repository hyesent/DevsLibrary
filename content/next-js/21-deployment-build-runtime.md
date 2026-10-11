# Builds, Deployment, and Runtime Choices

Run the production build in CI so type errors, invalid route configuration, and build-time failures are found before release. Managed Next.js hosting may provide framework-aware caching and image optimization. Self-hosting gives control but requires responsibility for processes, reverse proxies, assets, scaling, cache behavior, and rolling deploys. Static export suits some sites but is not equivalent to every full-stack app.

Node.js and Edge runtimes have different API surfaces and package constraints. Verify database drivers, filesystem use, cryptography, and native dependencies in the chosen runtime. Configure secrets through deployment settings; do not assume local `.env` files are uploaded.

Plan health checks, logs, monitoring, backups, rollback, and migration order. Test sign-in, mutations, uploads, dynamic routes, and access control in the target environment—not only the homepage.

**Practice:** Write a release checklist for build, configuration, migrations, smoke tests, monitoring, and rollback.
