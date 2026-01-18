# Track: POS Interface Component

## Overview
This track involves creating a Client Component `components/pos/POSInterface.tsx` to serve as the main interface for an offline Point of Sale (POS) system. It will display available inventory lots, allow quick addition of lots to a client-side shopping cart, and ensure data freshness through a synchronization hook. The interface will be mobile-friendly with a card-based grid layout.

## Functional Requirements
1.  **Component Creation:** Create a new Client Component file `components/pos/POSInterface.tsx`.
2.  **Data Synchronization:** Call `useOfflineSync` to ensure local data is fresh. The `isSyncing` state from this hook should be visually represented by a small, non-blocking spinner or text indicator within the header or a dedicated status area.
3.  **Inventory Display:**
    *   Use `useLiveQuery` (from `dexie-react-hooks`) to watch the `inventory_lots` table in the local IndexedDB.
    *   Display a list of lots in a Grid layout (Cards).
    *   For each lot card, display:
        *   Lot Number
        *   Expiry Date
        *   Quantity
        *   Product Name
        *   SKU
        *   Price
4.  **"Add to Cart" Functionality:**
    *   Add a button 'Add to Cart' to each lot card.
    *   Immediately after a user clicks 'Add to Cart', the item is added to a temporary client-side cart, and a small confirmation (e.g., a toast notification) is displayed.

## Non-Functional Requirements
*   **User Experience:** Intuitive and efficient interface for POS operations.
*   **Responsiveness:** Mobile-friendly design using Tailwind CSS for a card-based grid layout with shadows.
*   **Performance:** Fast loading and responsive interactions, especially given offline capabilities.
*   **Maintainability:** Code should be modular, well-structured, and easy to extend.

## Acceptance Criteria
*   The `POSInterface` component renders correctly and displays a grid of inventory lot cards.
*   Each lot card accurately shows Lot Number, Expiry Date, Quantity, Product Name, SKU, and Price.
*   The `isSyncing` state from `useOfflineSync` is indicated by a small, non-blocking visual element.
*   Clicking 'Add to Cart' successfully adds the item to a client-side cart and shows a temporary confirmation message.
*   The component is styled using Tailwind CSS, providing a mobile-friendly card-based grid layout with shadows.

## Out of Scope
*   Filtering or search capabilities for inventory lots.
*   Real-time inventory updates as transactions occur (beyond what `useLiveQuery` provides for local changes).
*   Full shopping cart management (only basic 'add to cart' is implemented).
*   Checkout process or payment integration.
*   Order fulfillment or inventory deduction logic.
