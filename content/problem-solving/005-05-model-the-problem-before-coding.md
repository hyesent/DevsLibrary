---
title: "Model the Problem Before Coding"
order: 5
book: "problem-solving"
---

A model is a deliberately simplified representation of reality that preserves the details needed to solve a particular problem. A good model ignores irrelevant detail without erasing important behavior.

Suppose a delivery application needs to find the cheapest route. A map can be modeled as a graph: intersections are vertices, roads are edges, and costs represent travel time, distance, or money. The real world contains traffic lights, weather, road closures, and driver behavior. The first model may ignore most of these, but it must preserve the costs relevant to the question. If the task is fastest arrival, treating every road as equal weight destroys the essential information.

Choose representations that make important operations easy and errors visible. A set models uniqueness. A queue models first-in-first-out processing. A state machine models legal transitions. A tree models hierarchy. A graph models relationships that may contain cycles. Choosing a list simply because it is familiar can obscure the real structure.

A model has boundaries. It should state what it excludes and where it may stop being accurate. A calendar that stores every event as a UTC instant works well for timestamps but cannot alone represent “9:00 AM local time every Monday” without a time zone and recurrence rule.

Ask:
1. What are the entities or states?
2. Which relationships matter?
3. Which operations must be efficient or safe?
4. Which distinctions must be preserved?
5. Which details can be ignored?
6. How will the model be checked against reality?

A useful model often emerges from examples. Draw a tiny instance and simulate the operation. If the drawing cannot represent a requirement, the representation is incomplete.

**Practice:** Model a book-reading application with books, users, bookmarks, and reading progress. Decide which relationships are one-to-many or many-to-many, and identify which fields describe a book versus a user's relationship to that book.

**Connection:** Modeling is the bridge between a natural-language requirement and algorithms, database schemas, API contracts, and architecture.
