# MVC, MVP, and MVVM

## These are presentation architecture patterns
Model–View–Controller (MVC), Model–View–Presenter (MVP), and Model–View–ViewModel (MVVM) organize UI responsibilities. They are not the same category as the classic object-creation and object-structure patterns.

## MVC
- **Model:** application data and rules, depending on the chosen MVC variant.
- **View:** renders information.
- **Controller:** interprets input and coordinates a response.

MVC has several historical and framework-specific interpretations. Do not assume every framework's “controller” has exactly the same responsibilities.

## MVP
- **View:** often a relatively passive rendering interface.
- **Presenter:** coordinates UI behavior and updates the view through a contract.
- **Model/domain services:** provide data and business rules.

MVP can make UI logic testable without a browser, but the view contract can grow unwieldy if it mirrors every tiny visual detail.

## MVVM
- **Model:** data and domain concepts.
- **View:** visual representation.
- **ViewModel:** exposes view-oriented state and commands. Data binding may connect it to the view.

Frameworks differ in how much of MVVM they implement. A React component with hooks is not automatically “pure MVVM”; describe the actual state and dependency boundaries.

## Choosing
Use the architecture that matches your UI framework, testing approach, team vocabulary, and state complexity. Do not create a separate layer merely to satisfy the letters in an acronym.

## Summary
MVC, MVP, and MVVM are ways to divide presentation responsibilities. Keep domain rules from becoming trapped in UI-only code, and avoid duplicating state without a clear reason.
