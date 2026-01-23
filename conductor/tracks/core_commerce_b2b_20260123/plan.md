# Implementation Plan - Core Commerce & B2B Expansion

## Phase 1: Foundational Data Structures [checkpoint: dc27a96]
- [x] Task: Database Schema Expansion. Update Supabase schema to include `price_lists`, `user_price_list_map`, `warehouses`, `warehouse_stock`, and `coupons` tables. 15f92f9
    - [x] Task: Write Database Migrations/Scripts. Create SQL scripts to establish the new B2B and Inventory tables.
    - [x] Task: Implement Schema Types. Update `src/lib/types` to include interfaces for the new data models.
- [x] Task: Conductor - User Manual Verification 'Foundational Data Structures' (Protocol in workflow.md)

## Phase 2: Bulk Management Suite [checkpoint: 564ad9f]
- [x] Task: CSV/Excel Processing Logic. Implement utilities for parsing and validating product data for mass updates. f4bedf5
    - [x] Task: Write Tests for CSV Parser. Verify validation logic for SKUs, prices, and microbe-specific attributes.
    - [x] Task: Implement CSV Import/Export Actions. Create Server Actions for high-performance bulk DB updates.
- [x] Task: Admin Bulk Edit UI. Enhance the Admin Product List with selection checkboxes and a batch-update sidebar. 2340025
    - [x] Task: Write UI Tests for Bulk Selector.
    - [x] Task: Implement Batch Edit Form. Use Shadcn components to build the multi-product edit interface.
- [x] Task: Conductor - User Manual Verification 'Bulk Management Suite' (Protocol in workflow.md)

## Phase 3: B2B & Dynamic Pricing Engine [checkpoint: 7ff4786]
- [x] Task: Tiered Pricing Logic. Implement the calculation engine that prioritizes role-based discounts vs. specific price lists. 34b3301
    - [x] Task: Write Unit Tests for Pricing Engine. Test scenarios for Gold/Silver tiers and distributor role overrides.
    - [x] Task: Implement Pricing Calculation Utility. Create a centralized function used by both Storefront and Admin.
- [x] Task: B2B Partial Payment Workflow. Modify the checkout process to support credit-based balances for B2B accounts. d7aa0e5
    - [x] Task: Write Integration Tests for B2B Checkout.
    - [x] Task: Implement Partial Payment UI & Logic. Update the checkout form to handle deposit calculations.
- [x] Task: Conductor - User Manual Verification 'B2B & Dynamic Pricing Engine' (Protocol in workflow.md)

## Phase 4: Marketing & Conversion Tools
- [ ] Task: Advanced Coupon Engine. Build the logic for percentage, fixed-rate, and "Buy X Get Y" promotions.
    - [ ] Task: Write Tests for Coupon Validation.
    - [ ] Task: Implement Coupon Redemption Logic. Create the API and UI for applying codes in the cart.
- [ ] Task: Scarcity & Urgency UI. Implement real-time "Low Stock" badges and countdown timers for biological product batches.
    - [ ] Task: Write Tests for Urgency Components.
    - [ ] Task: Implement Urgency Components. Create high-fidelity banners and badges using brand-aligned styling.
- [ ] Task: Conductor - User Manual Verification 'Marketing & Conversion Tools' (Protocol in workflow.md)

## Phase 5: Multi-Warehouse Logistics
- [ ] Task: Multi-Warehouse Inventory Tracking. Enable independent stock counts per location.
    - [ ] Task: Write Tests for Stock Routing.
    - [ ] Task: Implement Warehouse Stock UI. Add a warehouse selector/view to the Admin Inventory Lot form.
- [ ] Task: Conductor - User Manual Verification 'Multi-Warehouse Logistics' (Protocol in workflow.md)
