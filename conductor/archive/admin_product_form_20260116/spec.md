# Track Specification: AdminProductForm React Client Component

## Overview
This track specifies the creation and implementation of a React Client Component named `AdminProductForm.tsx`. This component will serve as a form for administrators to add new products, including their basic information and dynamic variant details. It will utilize `react-hook-form` with `zod` for validation and `Shadcn UI` components for the user interface.

## Features

### 1. Product Info Section
*   **Name:** Input field for the product name.
*   **Description:** Input field for the product description.

### 2. Dynamic Variants Table
*   A table allowing administrators to dynamically add multiple variant rows for a product.
*   Each variant row will include the following fields:
    *   **SKU (Text):** Stock Keeping Unit.
    *   **Price (Number):** Price of the variant.
    *   **Weight Value (Number):** Numerical value for the variant's weight.
    *   **Weight Unit (Select):** Dropdown with options: 'grams', 'kilograms', 'milliliter', 'liter'.
    *   **Packing Type (Select):** Dropdown with options: 'box', 'bottle', 'bucket', 'pouch', 'tin', 'drum', 'woven sack bag', 'plastic container'.
    *   **Form Type (Select):** Dropdown with options: 'powder', 'liquid', 'granules'.
*   **"Add Variant Row" Button:** A button to add new, empty rows to the variants table.

### 3. Form Submission
*   Upon submission, the form data will be processed. Initially, the data will be logged to the console.
*   The `createProduct` action from `@/actions/create-product` will be called with the validated form data.
*   On successful submission, the form will be reset, and a success message will be displayed (or logged to console).

## Technical Considerations

### Component Location
*   `src/components/admin/AdminProductForm.tsx`

### Libraries/Frameworks
*   **React:** For UI development (Client Component).
*   **Next.js:** The project's framework.
*   **react-hook-form:** For efficient form management and validation.
*   **Zod:** For schema-based form validation.
*   **Shadcn UI:** For UI components (Card, Input, Select, Button, Table).
*   **Tailwind CSS:** For styling (as per project's tech stack).

### Data Structure (Example on submit)
```typescript
{
  name: string;
  description: string;
  variants: Array<{
    sku: string;
    price: number;
    weight_value: number;
    weight_unit: 'grams' | 'kilograms' | 'milliliter' | 'liter';
    packing_type: 'box' | 'bottle' | 'bucket' | 'pouch' | 'tin' | 'drum' | 'woven sack bag' | 'plastic container';
    form_type: 'powder' | 'liquid' | 'granules';
  }>;
}
```

## Acceptance Criteria
*   The `AdminProductForm.tsx` component is created and renders correctly.
*   Product Name and Description inputs are present and functional.
*   The dynamic variants table allows adding and managing multiple rows.
*   Each variant row contains all specified input and select fields with correct options.
*   Form validation using Zod prevents submission of invalid data.
*   Submitting the form calls the `createProduct` action with the correct data structure.
*   Upon successful submission, the form resets, and a success message is shown.
*   The component adheres to Shadcn UI styling and project's code style guidelines.
