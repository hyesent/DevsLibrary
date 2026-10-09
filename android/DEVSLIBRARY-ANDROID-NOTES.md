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
