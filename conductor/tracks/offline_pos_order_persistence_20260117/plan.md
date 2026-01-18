# Track: Offline POS Order Persistence Implementation Plan

## Phase 1: Dexie Schema Update
- [x] Task: Update `lib/db.ts` to include `orders` table.
    - [x] Add `orders: 'id, created_at, status, total_amount'` to the `.stores()` definition.
    - [x] Define `id` as primary key for orders, with client-side UUID generation.
    - [x] Define predefined values for `status` (e.g., 'pending', 'completed', 'cancelled').
- [x] Task: Update `lib/db.ts` to include `order_items` table.
    - [x] Add `order_items: 'id, order_id, lot_id, quantity, price_at_sale'` to the `.stores()` definition.
- [x] Task: Update `lib/db.ts` to include `customers` table.
    - [x] Add `customers: 'id, name, email, phone'` to the `.stores()` definition.
- [x] Task: Conductor - User Manual Verification 'Dexie Schema Update' (Protocol in workflow.md)

## Phase 2: Basic CRUD Operations for New Tables
- [ ] Task: Implement basic `add` operation for `orders` table.
- [ ] Task: Implement basic `get` operation for `orders` table.
- [ ] Task: Implement basic `add` operation for `order_items` table.
- [ ] Task: Implement basic `get` operation for `order_items` table.
- [ ] Task: Implement basic `add` operation for `customers` table.
- [ ] Task: Implement basic `get` operation for `customers` table.
- [ ] Task: Conductor - User Manual Verification 'Basic CRUD Operations for New Tables' (Protocol in workflow.md)

## Phase 3: Integration and Refinement
- [ ] Task: Update `tech-stack.md` to reflect schema changes if necessary (unlikely for this specific task, but good practice).
- [ ] Task: Final Code Review and Cleanup.
    - [ ] Ensure all code adheres to project guidelines.
    - [ ] Remove any temporary code or comments.
- [ ] Task: Conductor - User Manual Verification 'Integration and Refinement' (Protocol in workflow.md)
