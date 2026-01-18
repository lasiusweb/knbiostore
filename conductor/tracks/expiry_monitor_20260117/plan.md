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

## Phase 2: UI Implementation - Table and 'Days Left' Logic [checkpoint: 7a3703d]
- [x] Task: Set up Shadcn UI Table structure. [98bb48e]
    - [x] Define table columns for Product Name, SKU, Lot Number, Expiry Date, Available Qty.
- [x] Task: Implement 'Days Left' calculation logic. [98bb48e]
    - [x] Calculate 'Days Left' as (Expiry Date - Today's Date).
    - [x] Handle negative 'Days Left' by displaying "Expired".
- [x] Task: Implement 'Days Left' color-coding logic using Shadcn Badge component. [98bb48e]
    - [x] Red Badge for < 7 days.
    - [x] Yellow Badge for < 15 days.
    - [x] Green Badge for >= 15 days.
- [x] Task: Implement empty state display. [98bb48e]
    - [x] Display "No items expiring soon" message when no data is returned.
- [x] Task: Conductor - User Manual Verification 'UI Implementation - Table and 'Days Left' Logic' (Protocol in workflow.md)

## Phase 3: Integration and Refinement [checkpoint: cc60f9e]
- [x] Task: Integrate `ExpiryMonitor` into appropriate admin page (e.g., `src/app/admin/dashboard/page.tsx` or similar). [b558343]
    - [x] Import the `ExpiryMonitor` component.
    - [x] Render the component in the admin page.
- [x] Task: Review and Refine Styles and Layout. [b558343]
    - [x] Ensure the table and badges are visually appealing and responsive.
- [x] Task: Final Code Review and Cleanup. [b558343]
    - [x] Ensure all code adheres to project guidelines.
    - [x] Remove any temporary code or comments.
- [x] Task: Conductor - User Manual Verification 'Integration and Refinement' (Protocol in workflow.md)
