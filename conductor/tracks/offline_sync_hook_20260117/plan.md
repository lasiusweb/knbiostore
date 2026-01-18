# Track: Offline Sync Hook (useOfflineSync) Implementation Plan

## Phase 1: Hook Setup and Initial Data Fetching [checkpoint: cb265eb]
- [x] Task: Create `hooks/useOfflineSync.ts` file.
    - [x] Create the file `hooks/useOfflineSync.ts`.
    - [x] Add basic React Client Component hook structure, including `"use client";` directive and `useEffect`.
- [x] Task: Implement Supabase data fetching for products.
    - [x] Import `createClient` from `@/lib/supabase/client`.
    - [x] Query the `products` table from Supabase within the `useEffect`.
- [x] Task: Implement Supabase data fetching for inventory lots.
    - [x] Import `db` from `@/lib/db`.
    - [x] Query the `inventory_lots` table from Supabase where `status` is 'available'.
- [x] Task: Conductor - User Manual Verification 'Hook Setup and Initial Data Fetching' (Protocol in workflow.md)

## Phase 2: Local Data Storage and Status Management [checkpoint: fa09b16]
- [x] Task: Implement local data storage for products.
    - [x] Use `db.products.bulkPut(supabaseProducts)` to save fetched products locally.
- [x] Task: Implement local data storage for inventory lots.
    - [x] Use `db.inventory_lots.bulkPut(supabaseLots)` to save fetched inventory lots locally.
- [x] Task: Implement `isSyncing` state.
    - [x] Add a boolean state `isSyncing` and update it during data fetching and saving.
    - [x] Expose `isSyncing` from the hook.
- [x] Task: Conductor - User Manual Verification 'Local Data Storage and Status Management' (Protocol in workflow.md)

## Phase 3: Error Handling and Manual Re-synchronization
- [ ] Task: Implement error handling for data fetching and local storage.
    - [ ] Display a generic error message (e.g., "Synchronization failed.") as a temporary notification using a toast or similar mechanism.
- [ ] Task: Implement manual re-synchronization trigger.
    - [ ] Return a function (e.g., `refetchData`) from the hook to allow manual re-triggering of the sync logic.
- [ ] Task: Final Code Review and Cleanup.
    - [ ] Ensure all code adheres to project guidelines.
    - [ ] Remove any temporary code or comments.
- [ ] Task: Conductor - User Manual Verification 'Error Handling and Manual Re-synchronization' (Protocol in workflow.md)
