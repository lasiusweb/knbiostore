# Track: Admin Product List Component

## Overview
This track involves the creation of a Server Component at `src/components/admin/AdminProductList.tsx`. The component will display a list of all products with their basic information and provide quick access to product variant details.

## Functional Requirements
1.  **Data Fetching:** The component will import `createClient` from `@/lib/supabase/client` and fetch data from the `products` table.
2.  **Product Variants:** A crucial aspect is to use a Left Join to fetch related `product_variants`. The Supabase syntax for this will be `.select('*, product_variants(*)')`.
3.  **Table Display:** Products will be displayed in a Shadcn Table.
    *   **Columns:**
        *   Product Name
        *   SKU (List the first variant's SKU for simplicity)
        *   Price (List the first variant's price in INR)
        *   Tags (Display each tag as an interactive badge/pill component)
        *   Description
4.  **Loading State:** When fetching product data, a skeleton loader that mimics the table structure will be displayed.
5.  **Empty State:** If there are no products to display, a message "No products found. Click here to add a new product." will be shown.

## Non-Functional Requirements
*   **Performance:** Efficient data fetching and rendering to ensure a smooth user experience.
*   **Maintainability:** Code should be clean, well-structured, and easy to understand.

## Acceptance Criteria
*   The `AdminProductList` component successfully fetches and displays product data from Supabase, including associated product variants.
*   The table includes columns for Product Name, SKU, Price (in INR), Tags (as interactive badges), and Description.
*   A skeleton loader is shown while product data is being fetched.
*   An informative message with a call to action is displayed when no products are available.

## Out of Scope
*   Searching and filtering of products.
*   Direct editing of product information from the list.
*   Bulk actions on selected products.
*   Pagination for the product list.
