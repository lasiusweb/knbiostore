# Track: Admin Expiry Monitor Component Implementation Plan

## Phase 1: Component Setup and Data Fetching [checkpoint: f284734]
- [x] Task: Create `ExpiryMonitor.tsx` Server Component file. [1a269ba]
    - [x] Create the file `src/components/admin/ExpiryMonitor.tsx`.
    - [x] Add basic React component structure.
- [x] Task: Implement Supabase data fetching for expiring inventory lots. [1a269ba]
    - [x] Import `createClient` from `@/lib/supabase/client`.
    - [x] Calculate the date 30 days from now.
    - [x] Query `inventory_lots` where `expiry_date` is between `NOW()` and `NOW() + 30 days` and `status` is 'available'.
    - [x] Join with `product_variants` and `products` to get SKU, product name, and packing type.
    - [x] Handle potential errors during data fetching.
- [x] Task: Conductor - User Manual Verification 'Component Setup and Data Fetching' (Protocol in workflow.md)

## Phase 2: UI Implementation - Table and 'Days Left' Logic
- [ ] Task: Set up Shadcn UI Table structure.
    - [ ] Define table columns for Product Name, SKU, Lot Number, Expiry Date, Available Qty.
- [ ] Task: Implement 'Days Left' calculation logic.
    - [ ] Calculate 'Days Left' as (Expiry Date - Today's Date).
    - [ ] Handle negative 'Days Left' by displaying "Expired".
- [ ] Task: Implement 'Days Left' color-coding logic using Shadcn Badge component.
    - [ ] Red Badge for < 7 days.
    - [ ] Yellow Badge for < 15 days.
    - [ ] Green Badge for >= 15 days.
- [ ] Task: Implement empty state display.
    - [ ] Display "No items expiring soon" message when no data is returned.
- [ ] Task: Conductor - User Manual Verification 'UI Implementation - Table and 'Days Left' Logic' (Protocol in workflow.md)

## Phase 3: Integration and Refinement
- [ ] Task: Integrate `ExpiryMonitor` into appropriate admin page (e.g., `src/app/admin/dashboard/page.tsx` or similar).
    - [ ] Import the `ExpiryMonitor` component.
    - [ ] Render the component in the admin page.
- [ ] Task: Review and Refine Styles and Layout.
    - [ ] Ensure the table and badges are visually appealing and responsive.
- [ ] Task: Final Code Review and Cleanup.
    - [ ] Ensure all code adheres to project guidelines.
    - [ ] Remove any temporary code or comments.
- [ ] Task: Conductor - User Manual Verification 'Integration and Refinement' (Protocol in workflow.md)
