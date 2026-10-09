# Language, Readability, and Cognitive Accessibility

> DevsLibrary · Web Accessibility · Lesson 19

## Make the task understandable
Cognitive accessibility benefits from clear purpose, predictable navigation, concise instructions, meaningful headings, consistent terms, and forgiving error recovery. Avoid unexplained abbreviations, dense paragraphs, needless time pressure, and instructions that require users to remember information from a distant step.

Plain language does not mean removing necessary technical detail. Define specialist terms, structure complex material, and offer examples. Use progressive disclosure thoughtfully: reveal detail when it helps, but do not hide essential conditions or costs.

## Programmatic language
Set the page's primary language with the `lang` attribute, such as `<html lang="en">`. Mark passages in another language when practical so assistive technology can pronounce them correctly. Identify unusual words or abbreviations when their meaning is not clear from context.

## Predictability and control
Avoid surprising context changes when a user focuses or selects a control. If a selection triggers navigation or submits data, explain that behavior. Allow users to review, correct, and confirm consequential actions where appropriate.

## Exercise
Rewrite a dense set of instructions into short steps. Add a visible progress indicator for a multi-step task and test whether a user can determine the current step, what is required, and how to go back.
