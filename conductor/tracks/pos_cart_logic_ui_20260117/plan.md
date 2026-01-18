# Track: POS Interface - Cart Logic and UI Implementation Plan

## Phase 1: Cart State and Core Functions
- [ ] Task: Update `src/components/pos/POSInterface.tsx` to include cart state.
    - [ ] Add `cart` state (array of `{ id, lot_number, quantity, price }` objects).
    - [ ] Add `showCart` boolean state.
- [ ] Task: Implement `addToCart` function.
    - [ ] Check if lot exists in cart, increment quantity if it does.
    - [ ] Add new entry with default quantity 1 and base price if not in cart.
- [ ] Task: Implement `removeFromCart` function.
- [ ] Task: Implement `calculateTotal` function.
- [ ] Task: Conductor - User Manual Verification 'Cart State and Core Functions' (Protocol in workflow.md)

## Phase 2: UI for Cart Button and Sidebar
- [ ] Task: Implement floating "Cart" button.
    - [ ] Display total number of items in cart on the button.
    - [ ] Implement click handler to toggle `showCart` state.
    - [ ] Apply Tailwind CSS for mobile-friendly styling.
- [ ] Task: Implement cart sidebar view.
    - [ ] Create a sidebar component that slides in/out based on `showCart` state.
    - [ ] Display a list of selected items (Lot Number, Quantity, Price, etc.).
    - [ ] Display the calculated total price.
    - [ ] Add a 'Checkout' button.
    - [ ] Apply Tailwind CSS for mobile-friendly styling with shadows.
- [ ] Task: Conductor - User Manual Verification 'UI for Cart Button and Sidebar' (Protocol in workflow.md)

## Phase 3: Refinement and Cleanup
- [ ] Task: Review and Refine Styles and User Experience.
    - [ ] Ensure the cart button and sidebar are visually appealing and responsive.
- [ ] Task: Final Code Review and Cleanup.
    - [ ] Ensure all code adheres to project guidelines.
    - [ ] Remove any temporary code or comments.
- [ ] Task: Conductor - User Manual Verification 'Refinement and Cleanup' (Protocol in workflow.md)
