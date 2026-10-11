# CSS, Global Styles, CSS Modules, and Tailwind

Next.js supports regular CSS, CSS Modules, Sass with setup, utility-first frameworks, and compatible CSS-in-JS approaches. Choose based on team familiarity and project needs. Use global CSS for resets and genuinely global tokens; use CSS Modules for component-local styles when appropriate.

Define colors, spacing, typography, and radii as design tokens instead of scattering magic values. Test responsive layouts, keyboard focus, zoom, and long translated strings. Do not hide important functionality on mobile just to make the layout fit.

Server-rendered HTML and the first client render should agree. Random values, timestamps, locale formatting, and browser-only state can cause hydration mismatches if computed differently. Keep initial output deterministic and move browser-only behavior to an appropriate client effect.

**Practice:** Build a responsive book grid using the existing project styling system and test at narrow, tablet, and desktop widths.
