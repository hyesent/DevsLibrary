# Performance and Bundle Analysis

## Measure real user experience
Performance includes loading, responsiveness, and visual stability—not just the size of one JavaScript file. Use browser performance tools, network inspection, field metrics where available, and repeatable test conditions.

## Identify the bottleneck
A slow page might be caused by:
- Large JavaScript downloads or parsing.
- Images or fonts that load late.
- Excessive component rendering.
- Slow API or database requests.
- Layout shifts or long main-thread tasks.
- Too many third-party scripts.

Use evidence to choose an intervention.

## Bundle analysis
Inspect which packages dominate the output. Check whether an entire utility library is imported for one function, whether a feature can be lazy-loaded, and whether shared dependencies are duplicated. Be careful: compressed transfer size is not the same as parse and execution cost.

## Loading strategy
Use responsive images, reduce unused client code, lazy-load nonessential features, and avoid loading third-party scripts before they are needed. Do not lazy-load the content required for the main task simply to improve a superficial bundle metric.

## Performance budgets
A budget is a guardrail, not a universal number. Define budgets for the application's audience, devices, and network conditions. Track trends in CI where feasible, and investigate regressions rather than ignoring a failing budget.

## Practice
Profile the initial route and a heavy secondary route. Record a baseline, make one change, and compare under the same conditions.
