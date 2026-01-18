# Track: Offline Sync Hook (useOfflineSync)

## Overview
This track involves creating a Client Component hook `hooks/useOfflineSync.ts` to implement a mechanism for downloading critical data from Supabase and saving it into the local IndexedDB. This hook will facilitate one-time synchronization on component load, provide synchronization status (e.g., loading spinner), handle potential errors, and allow for manual re-synchronization.

## Functional Requirements
1.  **Hook Creation:** Create a new TypeScript file `hooks/useOfflineSync.ts`.
2.  **Initial Synchronization:**
    *   Use `useEffect` to run the synchronization logic once when the component using the hook loads.
    *   Import `createClient` from `@/lib/supabase/client` and `db` from `@/lib/db`.
3.  **Data Fetching from Supabase:**
    *   Query the `products` table from Supabase.
    *   Query the `inventory_lots` table from Supabase, specifically where `status` is 'available'.
4.  **Local Data Storage:**
    *   Use `db.products.bulkPut(supabaseProducts)` to save fetched products locally.
    *   Use `db.inventory_lots.bulkPut(supabaseLots)` to save fetched inventory lots locally.
5.  **Synchronization Status:**
    *   Add a boolean state `isSyncing` to indicate whether data is currently being downloaded and saved.
    *   This state should be exposed by the hook for use in displaying a loading spinner.
6.  **Error Handling:**
    *   Display a generic error message (e.g., "Synchronization failed.") as a temporary notification if any errors occur during data fetching or local storage.
7.  **Manual Re-synchronization:**
    *   The hook will return a function (e.g., `refetchData`) that can be called to manually trigger a re-synchronization of data.

## Non-Functional Requirements
*   **Performance:** Efficient data transfer and storage to minimize user waiting times.
*   **Reliability:** Robust error handling to prevent data corruption or application crashes.
*   **Maintainability:** The hook should be modular, easy to understand, and testable.
*   **User Experience:** Clear feedback on synchronization status and errors.

## Acceptance Criteria
*   The `useOfflineSync` hook is created at `hooks/useOfflineSync.ts`.
*   On initial component load, the hook fetches `products` and 'available' `inventory_lots` from Supabase.
*   The fetched data is successfully stored/updated in the local IndexedDB (`db.products` and `db.inventory_lots`).
*   The `isSyncing` state correctly reflects the synchronization process (true during sync, false otherwise).
*   A generic temporary notification is displayed upon synchronization failure.
*   The hook exposes a function to manually trigger data re-synchronization.

## Out of Scope
*   Real-time, continuous synchronization (e.g., via Supabase Realtime).
*   Complex conflict resolution strategies during synchronization.
*   User interface components for triggering manual re-sync or displaying status/errors (the hook will provide the necessary state/functions).
*   Fine-grained control over which specific data subsets are synchronized (initially, all `products` and 'available' `inventory_lots`).
