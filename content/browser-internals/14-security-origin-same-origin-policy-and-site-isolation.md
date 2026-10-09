# Origins, Same-Origin Policy, and Site Isolation

> DevsLibrary · Browser Internals · Lesson 14

## Origin and site
An origin is generally the tuple of scheme, host, and port. Two URLs with different origins are not same-origin even if they look related. A site is a broader concept used by browser security mechanisms and may be defined differently in particular contexts.

## Same-origin policy
The same-origin policy restricts how one origin can read data from another. It is a key browser security boundary, but it is not a complete defense against every cross-site attack. CORS allows servers to opt into specific cross-origin read access; it does not make arbitrary requests safe.

## Process isolation
Modern browsers may isolate sites or origins in separate renderer processes to reduce the impact of compromised content. The implementation and isolation granularity vary. Process boundaries are one layer of defense, not a replacement for server-side authorization or safe coding.

## Related defenses
Content Security Policy can constrain resource loading and script execution. Permissions Policy can restrict selected browser features. Secure cookies, correct CORS configuration, sandboxed iframes, and robust authentication are complementary controls.

## Exercise
Compare two URLs with different schemes, hosts, and ports. Determine which are same-origin. Then explain why hiding a link in the UI does not protect the underlying server resource.
