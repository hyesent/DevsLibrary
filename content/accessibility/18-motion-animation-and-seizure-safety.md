# Motion, Animation, and Seizure Safety

> DevsLibrary · Web Accessibility · Lesson 18

## Motion can help or harm
Animation can explain state changes, but unnecessary movement can distract, trigger vestibular symptoms, or make content difficult to follow. Avoid parallax, continuous motion, zooming, and animated transitions when they do not add meaningful value.

Respect the `prefers-reduced-motion` media query. Reduced-motion styling should remove or simplify nonessential movement while preserving the information and functionality the animation conveyed.

```css
.card { transition: transform 180ms ease; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Treat broad overrides carefully: some animations convey essential status or are part of user-controlled functionality. Test the actual experience rather than copying a snippet blindly.

## Flashing and moving content
Avoid content that flashes rapidly or uses high-contrast flashes. WCAG has specific thresholds and exceptions for seizure safety; do not attempt to judge safety by intuition alone. Give users control over moving or auto-updating content when required, and avoid making important instructions depend on an animation that cannot be paused.

## Exercise
Enable reduced motion at the operating-system level and inspect a page. Verify that no information disappears, motion is reduced, and controls remain usable.
