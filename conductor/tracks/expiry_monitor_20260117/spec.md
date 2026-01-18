# Track: Admin Expiry Monitor Component

## Overview
This track involves the creation of a Server Component at `src/components/admin/ExpiryMonitor.tsx`. This component will provide administrators with an at-a-glance view of inventory items expiring soon, enabling proactive management of expiring inventory to minimize waste.

## Functional Requirements
1.  **Data Fetching:**
    *   The component will import `createClient` from `@/lib/supabase/client`.
    *   It will calculate the date 30 days from now.
    *   It will query `inventory_lots` where `expiry_date` is between `NOW()` and `NOW() + 30 days` and `status` is 'available'.
    *   It will join with `product_variants` and `products` to get SKU, product name, and packing type.
2.  **Table Display:** Products will be rendered in a Shadcn Table.
    *   **Columns:**
        *   Product Name
        *   SKU
        *   Lot Number
        *   Expiry Date
        *   Available Qty
        *   Calculated Column: 'Days Left'.
3.  **'Days Left' Calculation & Display:**
    *   'Days Left' will be calculated as (Expiry Date - Today's Date).
    *   If 'Days Left' is negative, "Expired" will be displayed instead of a negative number.
4.  **Color Logic for 'Days Left' Badges:**
    *   If 'Days Left' < 7: Render a Red Badge.
    *   If 'Days Left' < 15: Render a Yellow Badge.
    *   Else (Days Left >= 15): Render a Green Badge.
5.  **Empty States:** The component will handle empty states (e.g., 'No items expiring soon').

## Non-Functional Requirements
*   **Performance:** Efficient data fetching and table rendering, especially for potentially large datasets of expiring items.
*   **Maintainability:** Code should be clean, well-structured, and easy to understand.
*   **User Experience:** Clear and intuitive display of expiry information.

## Acceptance Criteria
*   The `ExpiryMonitor` component successfully fetches relevant `inventory_lots` data, including joined product and variant information.
*   The Shadcn Table displays all required columns: Product Name, SKU, Lot Number, Expiry Date, Available Qty.
*   The 'Days Left' column accurately calculates the days remaining until expiry.
*   Expired items display "Expired" in the 'Days Left' column.
*   'Days Left' badges are color-coded correctly: Red (< 7 days), Yellow (< 15 days), Green (>= 15 days).
*   The component gracefully handles and displays an appropriate message when no items are expiring soon.

## Out of Scope
*   Configurable expiry thresholds (fixed at 30 days).
*   Filtering or sorting options within the component.
*   Actions (e.g., edit, delete) directly from the monitor table.
*   Pagination for the expiry list.
