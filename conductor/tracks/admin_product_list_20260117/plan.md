# Track: Admin Product List Component Implementation Plan

## Phase 1: Component Setup and Data Fetching
- [x] Task: Create `AdminProductList.tsx` Server Component file. 2804567
    - [ ] Create the file `src/components/admin/AdminProductList.tsx`.
    - [ ] Add basic React component structure.
- [ ] Task: Implement Supabase data fetching.
    - [ ] Import `createClient` from `@/lib/supabase/client`.
    - [ ] Fetch data from the `products` table using `.select('*, product_variants(*)')`.
    - [ ] Handle potential errors during data fetching.
- [ ] Task: Conductor - User Manual Verification 'Component Setup and Data Fetching' (Protocol in workflow.md)

## Phase 2: UI Implementation - Table and Loading State
- [ ] Task: Set up Shadcn UI Table structure.
    - [ ] Define table columns for Product Name, SKU, Price, Tags, and Description.
    - [ ] Map fetched product data to the table rows.
- [ ] Task: Implement Skeleton Loader for loading state.
    - [ ] Display a skeleton loader that mimics the table structure while data is being fetched.
- [ ] Task: Implement Empty State display.
    - [ ] Display "No products found. Click here to add a new product." message when no products are available.
- [ ] Task: Conductor - User Manual Verification 'UI Implementation - Table and Loading State' (Protocol in workflow.md)

## Phase 3: Display Product Details
- [ ] Task: Display Product Name and Description.
- [ ] Task: Display SKU from the first product variant.
- [ ] Task: Display Price from the first product variant in INR.
- [ ] Task: Display Tags as interactive badge/pill components.
- [ ] Task: Conductor - User Manual Verification 'Display Product Details' (Protocol in workflow.md)

## Phase 4: Integration and Refinement
- [ ] Task: Integrate `AdminProductList` into `src/app/admin/products/page.tsx`.
    - [ ] Import the `AdminProductList` component.
    - [ ] Render the component in the admin products page.
- [ ] Task: Review and Refine Styles.
    - [ ] Ensure the table and its contents are visually appealing and responsive.
- [ ] Task: Final Code Review and Cleanup.
    - [ ] Ensure all code adheres to project guidelines.
    - [ ] Remove any temporary code or comments.
- [ ] Task: Conductor - User Manual Verification 'Integration and Refinement' (Protocol in workflow.md)
