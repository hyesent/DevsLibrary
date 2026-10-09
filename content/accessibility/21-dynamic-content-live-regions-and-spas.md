# Dynamic Content, Live Regions, and Single-Page Apps

> DevsLibrary · Web Accessibility · Lesson 21

## Visual updates need accessible communication
In a dynamic interface, content can change without a page reload. A screen-reader user may not know that search results loaded, a cart count changed, or an error appeared unless the update is communicated appropriately.

Use live regions sparingly. `role="status"` is suitable for many non-urgent status messages; `role="alert"` is assertive and should be reserved for important, time-sensitive information. A live region generally needs to exist in the DOM before its content changes for reliable announcement across assistive technologies.

## Focus in client-side routing
When a single-page application changes route, update the document title and place focus at a meaningful point when needed. Do not move focus on every small render. Preserve focus for in-place changes and avoid unexpected resets caused by component remounts.

## Loading and results
Expose loading state where it helps, such as `aria-busy="true"` on a region while its content is updating. Announce a concise result count when appropriate. Do not make every item in a large result list a live announcement.

## Exercise
Implement an async search interface. Test initial loading, successful results, zero results, network error, and repeated searches. Verify that users receive enough status information without excessive announcements.
