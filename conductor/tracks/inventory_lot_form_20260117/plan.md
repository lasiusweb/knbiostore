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

## Phase 2: Form Structure and Variant Selection [checkpoint: 2f59a1d]
- [x] Task: Set up `react-hook-form` and `zod` for form management and validation schema.
    - [x] Define the Zod schema for form inputs: `variant_id`, `lot_number`, `manufacture_date`, `expiry_date`, `initial_quantity`, `warehouse_location`.
    - [x] Initialize `useForm` from `react-hook-form`.
- [x] Task: Implement Shadcn `Select` for variant_id.
    - [x] Populate the `Select` dropdown with fetched product variants.
    - [x] Format the label for each option as "Product Name - SKU".
    - [x] Integrate with `react-hook-form`.
- [x] Task: Implement Input Text for `lot_number` and `warehouse_location`.
    - [x] Integrate with `react-hook-form`.
- [x] Task: Implement Input Number for `initial_quantity`.
    - [x] Integrate with `react-hook-form`.
- [x] Task: Conductor - User Manual Verification 'Form Structure and Variant Selection' (Protocol in workflow.md)

## Phase 3: Date Pickers and Validation [checkpoint: 698518c]
- [x] Task: Implement Shadcn UI `Calendar` components for `manufacture_date` and `expiry_date`.
    - [x] Integrate calendar components with a popover.
    - [x] Integrate with `react-hook-form`.
- [x] Task: Implement `lot_number` uniqueness validation.
    - [x] Add client-side validation logic for uniqueness check.
    - [x] Ensure database error is handled as a fallback.
- [x] Task: Implement `expiry_date` after `manufacture_date` validation.
    - [x] Add validation rule to Zod schema.
- [x] Task: Conductor - User Manual Verification 'Date Pickers and Validation' (Protocol in workflow.md)

## Phase 4: Form Submission and Refinement [checkpoint: 2e15fc0]
- [x] Task: Implement form submission logic.
    - [x] Handle form data submission.
    - [x] Integrate with Supabase to save the new inventory lot.
- [x] Task: Display temporary success message on successful submission.
    - [x] Use a toast notification or similar temporary feedback mechanism.
- [x] Task: Review and Refine Styles and UX.
    - [x] Ensure the form is visually appealing and user-friendly.
    - [x] Optimize for responsiveness.
- [x] Task: Final Code Review and Cleanup.
    - [x] Ensure all code adheres to project guidelines.
    - [x] Remove any temporary code or comments.
- [x] Task: Conductor - User Manual Verification 'Form Submission and Refinement' (Protocol in workflow.md)
