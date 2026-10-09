# History, Navigation, and Browser State

> DevsLibrary · Browser Internals · Lesson 27

## The session history model
Browsers maintain a session history of navigations and same-document state changes. Links, form submissions, redirects, `history.pushState()`, and `history.replaceState()` affect history in different ways. Back and Forward should remain meaningful in a single-page application.

## Client-side routing
A router must update the visible content, URL, document title, focus where appropriate, and any route-specific state. It must also handle direct deep links, refresh, unknown routes, and server fallback configuration.

## State restoration
Browsers may restore scroll position and form state when navigating back. Avoid unnecessarily overwriting restored state. For complex apps, define which state belongs in the URL, which belongs in memory, and which should persist across sessions.

## Navigation timing
Navigation Timing APIs expose timestamps for key navigation phases. Resource Timing provides details for individual resources, subject to privacy and cross-origin timing restrictions. Interpret timestamps carefully and compare like-for-like measurements.

## Exercise
Build a two-route single-page app. Verify direct navigation, refresh, Back, Forward, title changes, focus, and scroll restoration.
