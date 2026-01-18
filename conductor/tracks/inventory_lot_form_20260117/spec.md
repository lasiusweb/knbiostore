# Track: Admin Inventory Lot Form Component

## Overview
This track involves the creation of a Client Component at `src/components/admin/InventoryLotForm.tsx`. This form will allow admin users to facilitate the entry of new inventory lots for existing product variants.

## Functional Requirements
1.  **Data Fetching:** On component load, `createClient` from `@/lib/supabase/client` will be used to fetch all `product_variants` and their related `products.name`. The query will be `select('*, products(name)')`.
2.  **Variant Selection:** A Shadcn `Select` dropdown will be populated with the fetched product variants. The label for each option will be formatted as "Product Name - SKU".
3.  **Form Fields:** The form will include the following input fields:
    *   `variant_id` (Shadcn Select dropdown)
    *   `lot_number` (Input Text)
    *   `manufacture_date` (Shadcn UI Calendar component integrated with a popover)
    *   `expiry_date` (Shadcn UI Calendar component integrated with a popover)
    *   `initial_quantity` (Input Number)
    *   `warehouse_location` (Input Text)
4.  **Validation:**
    *   **Lot Number Uniqueness:** Moderately critical: an attempt will be made to check for uniqueness client-side, but a database error on save is acceptable as a fallback.
    *   **Expiry Date:** `expiry_date` must be after `manufacture_date`.
    *   **Frameworks:** `react-hook-form` and `zod` will be used for form management and validation.
5.  **Successful Submission:** Upon successful form submission, a temporary success message (e.g., a toast notification) will be displayed to the user.

## Non-Functional Requirements
*   **User Experience:** The form should be intuitive and easy to use.
*   **Performance:** Efficient data fetching and form submission.
*   **Maintainability:** Code should be clean, well-structured, and easy to understand.

## Acceptance Criteria
*   The `InventoryLotForm` component renders correctly and fetches product variants and their names on load.
*   The variant selection dropdown is correctly populated and formatted.
*   All form fields are present and accept appropriate input types.
*   `lot_number` uniqueness is validated (client-side attempt with database fallback).
*   `expiry_date` is validated to be after `manufacture_date`.
*   Form submission displays a temporary success message.
*   `react-hook-form` and `zod` are correctly implemented for form handling and validation.

## Out of Scope
*   Modification of existing inventory lot details.
*   Displaying a comprehensive overview of inventory levels.
*   Integration with external warehouse management systems.
*   Deletion of inventory lots.
*   Searching or filtering of product variants within the dropdown.
