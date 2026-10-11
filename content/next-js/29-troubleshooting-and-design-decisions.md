# Troubleshooting and Design Decisions

Classify failures before changing code: install/build, routing, server rendering, client rendering, network/API, data layer, or deployment.

A hook error often means interactive code is in a Server Component. A parameter type mismatch may come from following documentation for another Next.js version. A mutation followed by stale UI may indicate incorrect revalidation or caching. A private response shown to another user is a security incident: inspect authorization, cache keys, and isolation immediately. If development works but production fails, reproduce with a production build and target runtime.

For important choices, write an architecture decision record containing context, decision, alternatives, consequences, and revisit conditions. Examples include router choice, direct server database access versus HTTP API, cache policy, and runtime.

Final checklist: routes and error states are intentional; server/client boundaries are understood; secrets never enter client bundles; authorization is checked at each protected operation; input is validated server-side; cache freshness and isolation are tested; metadata and accessibility are reviewed; production build and deployment smoke tests pass; logs avoid sensitive information.

Use https://nextjs.org/docs for the exact installed release. Treat older tutorials as version-specific.
