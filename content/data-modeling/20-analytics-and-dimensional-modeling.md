# 20. Analytics and Dimensional Modeling

Operational systems and analytical systems often optimize for different questions. An operational model records current entities and transactions while protecting consistency. An analytical model makes it easier to aggregate facts across time, products, customers, or other dimensions.

Dimensional modeling commonly uses **fact tables** and **dimension tables**. A fact table records measurable events at a declared grain. A dimension table provides descriptive context used to group and filter those facts.

## Declare the grain first

The grain states what one row represents. “One row per order” differs from “one row per order line” and “one row per payment event.” If the grain is unclear, measures can be double-counted when tables are joined. Write the grain in plain language before selecting columns.

For example, an order-line fact might contain order date key, product key, customer key, quantity, net amount, and discount amount. A product dimension contains descriptive product attributes. If an order has three lines, summing an order-level total repeated on all three lines multiplies the total by three. The grain exposes this error.

## Dimensions and slowly changing attributes

A product category or customer segment can change over time. Analytical questions may need the current classification or the classification at the time of the event. A slowly changing dimension strategy defines how historical attributes are retained. A Type 1 approach overwrites a value; a Type 2 approach creates a new version with effective dates and a surrogate dimension key. The correct choice depends on reporting semantics.

## Additive and non-additive measures

Revenue is often additive across compatible dimensions. Ratios, percentages, and balances may not be. Average order value should usually be calculated from summed revenue divided by summed order count, not by averaging precomputed averages without appropriate weighting. A bank account balance at a point in time cannot be summed across dates as if each row were a separate sale.

## Operational-to-analytical pipelines

Data warehouses receive data through batch or streaming pipelines. These introduce freshness, duplicate handling, schema evolution, lineage, and reconciliation requirements. Track source timestamps, ingestion timestamps, and transformation versions when they help explain late or changed records.

## Practice

Design a small sales mart. Define the grain of the sales fact, select dimensions, and classify measures as additive, semi-additive, or non-additive. Explain how a product category change should affect historical reporting.

**Key idea:** analytical correctness begins with an explicit grain and clear semantics for measures and history.
