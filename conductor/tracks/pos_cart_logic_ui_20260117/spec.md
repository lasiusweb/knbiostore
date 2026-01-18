# Track: POS Interface - Cart Logic and UI

## Overview
This track involves updating the `src/components/pos/POSInterface.tsx` Client Component to include core cart logic and UI for a Point of Sale (POS) system. It will manage a client-side cart, calculate the total price, and present a floating cart button that reveals a sidebar cart view.

## Functional Requirements
1.  **Cart State Management:**
    *   Add a state variable `cart` as an array of objects, where each object has `id`, `lot_number`, `quantity`, and `price` (product's base price).
    *   Add a boolean state `showCart` to toggle the visibility of the cart view.
2.  **`addToCart` Functionality:**
    *   Implement an `addToCart(lot)` function.
    *   This function will check if the `lot` is already in the `cart`.
    *   If yes, it will increment the `quantity` of the existing entry.
    *   If no, it will add a new entry to the `cart` with a default `quantity` of 1 and the product's base `price`.
3.  **`removeFromCart` Functionality:**
    *   Implement a `removeFromCart(id)` function to remove an item from the `cart`.
4.  **`calculateTotal` Functionality:**
    *   Implement a `calculateTotal()` function that returns the sum of `(price * quantity)` for all items in the `cart`.
5.  **UI Updates:**
    *   **Product Grid:** The existing Product Grid will be maintained.
    *   **Floating Cart Button:** Add a floating "Cart" button (or fixed sidebar) that displays the total number of items in the `cart`.
    *   **Cart View:** When the floating "Cart" button is clicked, a sidebar will slide in from the side, partially obscuring the product grid. This sidebar will display:
        *   A list of selected items (showing details like Lot Number, Quantity, Price, etc.).
        *   The calculated total price.
        *   A 'Checkout' button.

## Non-Functional Requirements
*   **User Experience:** Seamless and intuitive interaction for adding items to the cart and reviewing selections.
*   **Responsiveness:** The floating cart button and sidebar view should adapt well to various mobile screen sizes.
*   **Performance:** Efficient cart operations and UI rendering to avoid lag during a POS transaction.
*   **Maintainability:** Cart logic and UI components should be clearly separated and easy to understand.

## Acceptance Criteria
*   The `POSInterface` component correctly manages the `cart` and `showCart` states.
*   The `addToCart` function correctly adds new items or increments quantities of existing items with a default quantity of 1.
*   The `removeFromCart` function correctly removes items from the cart.
*   The `calculateTotal` function accurately computes the sum of `(price * quantity)` for all cart items.
*   A floating "Cart" button displays the current number of items in the cart.
*   Clicking the "Cart" button reveals a sidebar cart view.
*   The sidebar cart view displays a list of selected items, the total price, and a 'Checkout' button.
*   The UI elements are styled using Tailwind CSS and are mobile-friendly.

## Out of Scope
*   Advanced pricing logic (e.g., applying discounts/promotions during `addToCart`).
*   Persistence of the cart across sessions (cart is client-side and temporary).
*   Detailed checkout process or payment integration.
*   Inventory deduction upon adding items to the cart.
*   User authentication or order placement.
