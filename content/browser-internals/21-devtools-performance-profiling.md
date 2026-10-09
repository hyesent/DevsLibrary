# Performance Profiling with Developer Tools

> DevsLibrary · Browser Internals · Lesson 21

## Start with a question
Before profiling, define the symptom: slow initial load, delayed click response, scrolling jank, memory growth, or layout shifts. Capture a representative scenario with a realistic device and network profile.

## Timeline interpretation
Performance panels can show scripting, style recalculation, layout, paint, rasterization, network events, and long tasks. A long task can delay user input even if its code does not appear visually complex. Correlate a trace with the user-visible symptom before editing code.

## CPU and network throttling
Throttling helps approximate constrained conditions but is not a perfect simulation of a real low-end device. Repeat tests and compare medians or distributions rather than relying on one run.

## Flame charts
A flame chart represents nested call stacks over time. Wide blocks consume time; deep stacks show call relationships. Use source maps to relate bundled code to original source when available.

## Exercise
Profile a slow interaction, identify the longest relevant task, and determine whether the cause is JavaScript, style/layout, paint, or network. Make one targeted change and record the trace difference.
