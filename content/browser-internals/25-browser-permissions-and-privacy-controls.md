# Browser Permissions, Privacy, and User Controls

> DevsLibrary · Browser Internals · Lesson 25

## Permission prompts
Geolocation, camera, microphone, notifications, and other sensitive capabilities may require secure contexts, user permission, or additional policy checks. A prompt does not guarantee access: users can deny it, the device may lack the capability, or policy may block it.

## Ask at the right time
Explain the feature's value before requesting permission. Avoid prompting on page load when the user has not asked for the feature. Provide a useful fallback when permission is denied or unavailable, and make it possible to continue core tasks where feasible.

## Privacy boundaries
Browsers apply restrictions to tracking, third-party storage, fingerprinting, and cross-site behavior. Exact policies vary and evolve. Do not design essential flows that depend on a fragile browser-specific workaround for tracking restrictions.

## Permissions Policy
A document can restrict certain features for itself and embedded frames using Permissions Policy. Configure only the capabilities needed by each embedded context and verify the effective policy in supported browsers.

## Exercise
Implement a location-based feature with a pre-permission explanation, denial state, unsupported-device state, and manual-location fallback.
