# Implementation Plan: AdminProductForm React Client Component

## Phase 1: Component Scaffolding and Basic Product Info [checkpoint: 05e8159]

- [x] Task: Install necessary dependencies (react-hook-form, zod, @hookform/resolvers).
    - [ ] Write Tests: N/A (installation).
    - [x] Implement Feature: Execute npm install commands.
- [x] Task: Create `src/components/admin/AdminProductForm.tsx`.
    - [ ] Write Tests: N/A (file creation).
    - [x] Implement Feature: Create the file with a basic React client component structure.
- [x] Task: Define Zod schema for product info (name, description) and overall form.
    - [ ] Write Tests: For Zod schema validation.
    - [x] Implement Feature: Define the Zod schemas for product and form data.
- [x] Task: Implement basic form structure (Card, Input for name/description) using react-hook-form and Shadcn UI.
    - [ ] Write Tests: For rendering of basic form fields.
    - [x] Implement Feature: Add Card, Form, FormField, FormLabel, FormControl, FormMessage, Input components.
- [x] Task: Add `onSubmit` function with `console.log(values)`.
    - [ ] Write Tests: For `onSubmit` function call and `console.log` output.
    - [x] Implement Feature: Implement the `onSubmit` handler to log form values.
- [~] Task: Conductor - User Manual Verification 'Component Scaffolding and Basic Product Info'

## Phase 2: Dynamic Variants Table [checkpoint: 771483d]

- [x] Task: Define Zod schema for variant logic (sku, price, weight_value, enums for units/types).
    - [ ] Write Tests: For Zod variant schema validation.
    - [x] Implement Feature: Define Zod schemas for variant structure and enums.
- [x] Task: Integrate `useFieldArray` for dynamic variant rows.
    - [ ] Write Tests: For `useFieldArray` operations (append, remove).
    - [x] Implement Feature: Implement `useFieldArray` and render dynamic variant rows.
- [x] Task: Create UI for variant table (Table, Input, Select) using Shadcn UI.
    - [ ] Write Tests: For rendering of variant table with dynamic rows.
    - [x] Implement Feature: Add Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Input, Select components for variants.
- [x] Task: Implement "Add Variant Row" button functionality.
    - [ ] Write Tests: For "Add Variant Row" button click.
    - [x] Implement Feature: Add a button to append a new empty variant row.
- [~] Task: Conductor - User Manual Verification 'Dynamic Variants Table'

## Phase 3: Integrate `createProduct` Action [checkpoint: c0b673f]

- [x] Task: Create `src/actions/create-product.ts` with a dummy `createProduct` function.
    - [ ] Write Tests: For dummy `createProduct` function.
    - [x] Implement Feature: Create `create-product.ts` and export a placeholder async function.
- [x] Task: Import `createProduct` into `AdminProductForm.tsx`.
    - [ ] Write Tests: N/A (import statement).
    - [x] Implement Feature: Add the import statement.
- [x] Task: Call `await createProduct(values)` in `onSubmit`.
    - [ ] Write Tests: For `createProduct` call with form values.
    - [x] Implement Feature: Replace `console.log(values)` with `await createProduct(values)`.
- [x] Task: Reset form and show success message (`console.log('Saved')`).
    - [ ] Write Tests: For form reset and success logging.
    - [x] Implement Feature: Add `form.reset()` and `console.log('Saved')` after successful API call.
- [~] Task: Conductor - User Manual Verification 'Integrate `createProduct` Action'
