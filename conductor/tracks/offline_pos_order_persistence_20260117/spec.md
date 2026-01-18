# Track: Offline POS Order Persistence

## Overview
This track involves updating the Dexie schema in `lib/db.ts` to include an `orders` table and potentially other related tables to ensure that POS transactions persist locally even if the application crashes or the browser is closed. This will enable offline saving of completed POS transactions and facilitate a seamless checkout process within the offline POS system.

## Functional Requirements
1.  **Update `lib/db.ts` Schema:**
    *   Add a new table `orders` to the `.stores()` definition with the schema: `'id, created_at, status, total_amount'`.
    *   The `id` for new orders will be generated as a UUID client-side before saving.
    *   The `status` field will use predefined values for consistency (e.g., 'pending', 'completed', 'cancelled').
2.  **Additional Tables for Transaction Details:**
    *   Add an `order_items` table with schema: `'id, order_id, lot_id, quantity, price_at_sale'`. This table will store details of each product (lot) within an order.
    *   Add a `customers` table with schema: `'id, name, email, phone'` (or similar basic customer information). This table will store basic customer information for the transaction.

## Non-Functional Requirements
*   **Data Persistence:** Orders and their details must persist locally across application restarts or crashes.
*   **Data Integrity:** The schema design should ensure the consistency and validity of order data.
*   **Performance:** Local database operations for saving orders should be fast and non-blocking.
*   **Maintainability:** The schema updates should be clear, well-documented, and easy to understand.

## Acceptance Criteria
*   The `lib/db.ts` file is updated to include `orders`, `order_items`, and `customers` tables in the Dexie schema.
*   The `orders` table has `id`, `created_at`, `status`, and `total_amount` fields with appropriate indexing.
*   New orders use client-side generated UUIDs for their `id`.
*   The `status` field in the `orders` table supports predefined values.
*   The `order_items` table is defined with `id`, `order_id`, `lot_id`, `quantity`, and `price_at_sale`.
*   The `customers` table is defined with basic customer information fields.
*   Basic CRUD operations for these new tables can be performed locally.

## Out of Scope
*   Synchronization of local orders with a remote backend (e.g., Supabase).
*   Complex order management features (e.g., order editing, refunds).
*   Detailed customer relationship management beyond basic information.
*   Advanced reporting based on local order data.
*   Inventory deduction upon order creation (this would be part of a separate inventory management track).
