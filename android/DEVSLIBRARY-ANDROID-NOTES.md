# DevsLibrary Android handoff

This package contains the Android folder only.

## Branding changes
- Replaced the overlapping legacy splash overlays with one responsive animated introduction.
- The animation assembles a pile of books, draws the cyan diagonal slash, reveals `DEVSLIBRARY` letter by letter, draws the smaller slash, and shows `From Hyesent.dev`.
- Updated the native static splash assets and Android launcher icons to use the same stacked-books mark.
- Updated the Android display label to `DevsLibrary`.
- Preserved the existing application ID (`com.hyetext.app`).

## Where the Android splash is stored
The delivered Android WebView bundle uses:
- `app/src/main/assets/public/index.html`
- `app/src/main/assets/public/assets/devslibrary-intro.css`

The original bundled JavaScript and application CSS are preserved.

**Important:** Running `npx cap sync android` from the full project can overwrite `app/src/main/assets/public/` with the project's `dist/` output. If you plan to rebuild/sync from the full source project later, carry the same splash design into the source `SplashIntro` component and rebuild before syncing.

## Validation
- Android XML files parsed successfully.
- PNG assets decoded successfully.
- The splash page's local asset references all resolve.
- The splash timer JavaScript passed `node --check`.
- An Android Gradle build could not be completed in the available environment because Gradle 8.2.1 was not cached and `services.gradle.org` was unreachable. Build and device rendering should be verified in Android Studio/on a device before release.


## Startup timing investigation (2026-10-09)
The intro markup and stylesheet are present in the bundled `public/index.html`
and `public/assets/devslibrary-intro.css`. The original intro animation delay
and removal timer started during HTML parsing, while the bundled app JavaScript
is about 4.1 MB. On slower Android devices, startup work can occupy the WebView
long enough for the 3.6-second intro timeline to finish before the first useful
paint. The CSS now holds animations until an `is-playing` class is applied, and
the HTML starts the animation/removal timer after the page `load` event and two
`requestAnimationFrame` callbacks. Reduced-motion devices show a static, fully
assembled brand for 1.8 seconds.

This is a code-level diagnosis, not a claim that the installed APK was inspected.
If the intro is still absent, confirm the APK was rebuilt from this Android folder
and that a later `npx cap sync android` did not overwrite the bundled `public/`
files with a `dist/` folder that lacks the intro.


## Native wordmark splash and 6-second introduction
- The Android native splash artwork (`app/src/main/res/drawable-nodpi/splash_wordmark.png`) is now wordmark-only: italic/slanted `DEVSLIBRARY` crossed by a cyan diagonal slash. It contains no books illustration or standalone logo icon.
- The WebView brand introduction remains the books/slash/letter reveal and is scheduled to begin its exit after 6 seconds of active playback; its DOM cleanup timer is 6.5 seconds after activation.
- Build and test on a device to confirm Android renders the wordmark artwork as intended. Android controls the native splash presentation and may mask/crop splash icon artwork depending on OS version.
