---
title: "Learning from Failed Attempts"
order: 23
book: "problem-solving"
---

Failure is useful only when it changes the model you use next time. Repeating an unsuccessful approach without extracting information is not persistence; it is wasted effort.

After a failed attempt, ask:
- Which assumption was false?
- What evidence did I ignore?
- Was the model incomplete?
- Did the chosen representation hide an important distinction?
- Was the algorithm wrong, or was its contract misunderstood?
- Did the test fail to represent the real environment?
- What smallest change would distinguish competing explanations?

Keep a short debugging or learning note: symptom, hypothesis, experiment, result, root cause, and prevention. Over time, recurring patterns become recognizable. For example, many “random” UI bugs may share a state synchronization problem, and many database bugs may arise from unclear transaction boundaries.

Do not turn one incident into an overgeneralized rule. A cache caused one outage does not imply caching is bad; it may indicate missing invalidation, ownership, or observability. Extract the condition that made the technique unsafe.

Use spaced revisiting and retrieval practice. After learning a concept, explain it without notes, solve a new problem, and return later to compare your explanation. Reading can create familiarity without the ability to transfer knowledge to a new situation.

A useful skill is knowing when to stop exploring. Set a time box, define what success looks like, and decide when to ask for another perspective. Asking for help is most effective when accompanied by a minimal reproduction, what you expected, what happened, and what you already tested.

**Practice:** Review a bug you previously fixed. Write the original assumption, the evidence that disproved it, the missing test, and one broader lesson that is justified without overgeneralizing.

**Connection:** Reflective practice turns individual debugging into durable engineering judgment.
