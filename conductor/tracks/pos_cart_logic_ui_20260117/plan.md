# Track: POS Interface - Cart Logic and UI Implementation Plan

## Phase 1: Cart State and Core Functions
- [x] Task: Update `src/components/pos/POSInterface.tsx` to include cart state.
    - [x] Add `cart` state (array of `{ id, lot_number, quantity, price }` objects).
    - [x] Add `showCart` boolean state.
- [x] Task: Implement `addToCart` function.
    - [x] Check if lot exists in cart, increment quantity if it does.
    - [x] Add new entry with default quantity 1 and base price if not in cart.
- [x] Task: Implement `removeFromCart` function.
- [x] Task: Implement `calculateTotal` function.
- [x] Task: Conductor - User Manual Verification 'Cart State and Core Functions' (Protocol in workflow.md)

## Phase 2: UI for Cart Button and Sidebar [checkpoint: 68fc9fe]
- [x] Task: Implement floating "Cart" button.
    - [x] Display total number of items in cart on the button.
    - [x] Implement click handler to toggle `showCart` state.
    - [x] Apply Tailwind CSS for mobile-friendly styling.
- [x] Task: Implement cart sidebar view.
    - [x] Create a sidebar component that slides in/out based on `showCart` state.
    - [x] Display a list of selected items (Lot Number, Quantity, Price, etc.).
    - [x] Display the calculated total price.
    - [x] Add a 'Checkout' button.
    - [x] Apply Tailwind CSS for mobile-friendly styling with shadows.
- [x] Task: Conductor - User Manual Verification 'UI for Cart Button and Sidebar' (Protocol in workflow.md)

## Phase 3: Refinement and Cleanup
- [x] Task: Review and Refine Styles and User Experience. [725fbea]
    - [x] Ensure the cart button and sidebar are visually appealing and responsive.
- [x] Task: Final Code Review and Cleanup. [725fbea]
    - [x] Ensure all code adheres to project guidelines.
    - [x] Remove any temporary code or comments.
- [x] Task: Conductor - User Manual Verification 'Refinement and Cleanup' (Protocol in workflow.md)
