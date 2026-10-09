# Navigation, Landmarks, and Page Structure

> DevsLibrary · Web Accessibility · Lesson 15

## Help users orient themselves
Consistent page titles, headings, navigation, breadcrumbs, and landmarks help users understand where they are and move efficiently. The document title should identify the page, not repeat a generic site name alone.

Use landmarks meaningfully: header, navigation, main, complementary content, and footer. Multiple regions of the same type may need distinct accessible labels. Avoid nesting landmarks without a reason or creating a separate landmark for every small section.

## Breadcrumbs and current location
Breadcrumbs should be represented as navigation and use links for prior locations. Indicate the current page clearly, often with text and `aria-current="page"` where appropriate. Do not rely on color alone.

## Consistency
Repeated controls should work and be labeled consistently across the product. Consistency does not require identical layout on every screen, but the same interaction should not unexpectedly change its keyboard model or terminology.

## Exercise
Create a page skeleton with a title, skip link, primary navigation, main region, complementary sidebar, and footer. Test the structure in a screen reader's landmark and heading navigation.
