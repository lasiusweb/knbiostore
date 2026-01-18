# Track: POS Interface - Checkout Logic

## Overview
This track involves updating the `src/components/pos/POSInterface.tsx` Client Component to implement the checkout logic. When the "Checkout" button is clicked, the current cart will be saved as an order in the local Dexie database (`db.orders`), ensuring persistence. The order will be assigned a unique ID, a timestamp, a 'PENDING_SYNC' status, and will include all items from the current cart. After saving, a confirmation alert will be displayed, and the cart will be cleared. Local manual status updates by the POS user will also be allowed.

## Functional Requirements
1.  **Update `handleCheckout` Function:** Modify the `handleCheckout` function in `src/components/pos/POSInterface.tsx`.
2.  **Generate Order ID:** Generate a random UUID for the order ID using `crypto.randomUUID()`.
3.  **Create Order Object:** Construct an order object with the following properties:
    *   `id`: The generated UUID.
    *   `created_at`: A timestamp (`new Date()`).
    *   `status`: Initialized to `'PENDING_SYNC'`.
    *   `total_amount`: The calculated total from the current cart.
    *   `items`: The current cart array (containing `id`, `lot_number`, `quantity`, `price`).
4.  **Save Order to Local Database:**
    *   Use `await db.orders.add(orderObject)` to save the newly created order to the local Dexie database.
5.  **User Feedback:**
    *   Alert the user with the message 'Order Saved Locally' upon successful saving.
6.  **Clear Cart:** After saving the order, clear the current cart.
7.  **Order Status Management:**
    *   Status changes can be manually updated by the POS user locally (e.g., to 'COMPLETED' or 'CANCELLED'), in addition to changes during synchronization (which is out of scope for this track).

## Non-Functional Requirements
*   **Data Persistence:** Orders must be reliably saved and retrievable from the local IndexedDB.
*   **Performance:** The checkout process should be fast and responsive.
*   **User Experience:** Clear and immediate feedback for the user after checkout.
*   **Maintainability:** The checkout logic should be clear, modular, and easy to understand.

## Acceptance Criteria
*   Clicking the 'Checkout' button triggers the `handleCheckout` function.
*   A unique UUID is generated for each new order.
*   An order object is correctly constructed with `id`, `created_at`, `status` ('PENDING_SYNC'), `total_amount`, and `items`.
*   The order is successfully added to the local `db.orders` table.
*   An 'Order Saved Locally' alert is displayed to the user.
*   The cart is cleared after a successful checkout.
*   The `status` field can be manually updated by the POS user locally.

## Out of Scope
*   Synchronization of local orders with a remote backend.
*   Inventory deduction from `inventory_lots` upon checkout.
*   Payment processing.
*   Detailed order history view (beyond saving the order).
*   Error handling beyond a simple alert for saving.
*   Advanced conflict resolution for manual status updates vs. sync.
