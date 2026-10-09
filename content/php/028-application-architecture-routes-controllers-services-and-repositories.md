# 028. Application Architecture: Routes, Controllers, Services, and Repositories

> Book: PHP · Level: beginner to advanced · Part 28 of 45

# Learning goals
- Separate transport, business rules, and persistence.
- Design code boundaries that can be tested.
- Avoid both monolith-shaped scripts and unnecessary abstraction.

A small application can begin with a front controller and explicit routing. As it grows, distinguish:
- **Route/HTTP layer:** matches the request and chooses a handler.
- **Controller/handler:** parses request input and shapes the response.
- **Application service:** coordinates a use case.
- **Domain model:** owns business rules and invariants.
- **Repository:** encapsulates persistence operations.
- **Infrastructure adapters:** database, email, file storage, and external APIs.

Not every project needs every layer. Add boundaries when they clarify responsibility, enable testing, or isolate a changing dependency. Avoid a “service” class that simply forwards every method, and avoid repositories that leak raw database details into every caller.

Keep authorization close enough to the use case that it cannot be skipped accidentally. Use dependency injection to make collaborators explicit. Avoid hidden service locators and global state.

## Practice
Refactor a single PHP page that validates input, writes SQL, and sends email into testable responsibilities. Explain the trade-offs of the new structure.
