# Track: Admin Inventory Lot Form Component Implementation Plan

## Phase 1: Component Setup and Data Fetching [checkpoint: 6c1886f]
- [x] Task: Create `InventoryLotForm.tsx` Client Component file.
    - [x] Create the file `src/components/admin/InventoryLotForm.tsx`.
    - [x] Add basic React client component structure with `"use client";` directive.
- [x] Task: Implement Supabase data fetching for product variants.
    - [x] Import `createClient` from `@/lib/supabase/client`.
    - [x] On component load, fetch `product_variants` and their related `products.name` using `select('*, products(name)')`.
    - [x] Handle loading and error states for data fetching.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Setup and Basic Structure' (Protocol in workflow.md)

## Phase 2: Form Structure and Variant Selection
- [ ] Task: Set up `react-hook-form` and `zod` for form management and validation schema.
    - [ ] Define the Zod schema for form inputs: `variant_id`, `lot_number`, `manufacture_date`, `expiry_date`, `initial_quantity`, `warehouse_location`.
    - [ ] Initialize `useForm` from `react-hook-form`.
- [ ] Task: Implement Shadcn `Select` for variant_id.
    - [ ] Populate the `Select` dropdown with fetched product variants.
    - [ ] Format the label for each option as "Product Name - SKU".
    - [ ] Integrate with `react-hook-form`.
- [ ] Task: Implement Input Text for `lot_number` and `warehouse_location`.
    - [ ] Integrate with `react-hook-form`.
- [ ] Task: Implement Input Number for `initial_quantity`.
    - [ ] Integrate with `react-hook-form`.
- [ ] Task: Conductor - User Manual Verification 'Form Structure and Variant Selection' (Protocol in workflow.md)

## Phase 3: Date Pickers and Validation
- [ ] Task: Implement Shadcn UI `Calendar` components for `manufacture_date` and `expiry_date`.
    - [ ] Integrate calendar components with a popover.
    - [ ] Integrate with `react-hook-form`.
- [ ] Task: Implement `lot_number` uniqueness validation.
    - [ ] Add client-side validation logic for uniqueness check.
    - [ ] Ensure database error is handled as a fallback.
- [ ] Task: Implement `expiry_date` after `manufacture_date` validation.
    - [ ] Add validation rule to Zod schema.
- [ ] Task: Conductor - User Manual Verification 'Date Pickers and Validation' (Protocol in workflow.md)

## Phase 4: Form Submission and Refinement
- [ ] Task: Implement form submission logic.
    - [ ] Handle form data submission.
    - [ ] Integrate with Supabase to save the new inventory lot.
- [ ] Task: Display temporary success message on successful submission.
    - [ ] Use a toast notification or similar temporary feedback mechanism.
- [ ] Task: Review and Refine Styles and UX.
    - [ ] Ensure the form is visually appealing and user-friendly.
    - [ ] Optimize for responsiveness.
- [ ] Task: Final Code Review and Cleanup.
    - [ ] Ensure all code adheres to project guidelines.
    - [ ] Remove any temporary code or comments.
- [ ] Task: Conductor - User Manual Verification 'Form Submission and Refinement' (Protocol in workflow.md)
