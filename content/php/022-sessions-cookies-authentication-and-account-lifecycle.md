# 022. Sessions, Cookies, Authentication, and Account Lifecycle

> Book: PHP · Level: beginner to advanced · Part 22 of 45

# Learning goals
- Understand session identifiers and cookie attributes.
- Design login and logout safely.
- Separate authentication from authorization.

A session commonly stores server-side state associated with a random session identifier held by the browser in a cookie. Use HTTPS, `Secure`, `HttpOnly`, and an appropriate `SameSite` policy. Configure session behavior before starting the session. Regenerate the session ID after authentication and privilege changes to reduce session fixation risk.

Passwords must be stored with `password_hash()` and checked with `password_verify()`, not encrypted reversibly or hashed with a fast general-purpose hash. Use `password_needs_rehash()` to upgrade parameters as policies evolve. Rate-limit login attempts and design secure reset flows with short-lived, single-use tokens. Do not reveal whether an email address exists unnecessarily.

Logout should invalidate server-side session state and expire the cookie. Authentication answers “who is this?”; authorization answers “may this actor do this action on this resource?” Check authorization on every relevant request.

## Practice
Design login, logout, password reset, and session-expiry flows. List abuse cases and how the system responds.
