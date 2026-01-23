# Specification: Core Commerce & B2B Expansion

## Overview
This track implements a comprehensive expansion of the KN BioStore platform to support advanced B2B workflows, high-scale catalog management, sophisticated marketing logic, and multi-location logistics. It builds upon the existing Next.js/Supabase foundation to transform the application into an enterprise-ready commerce suite.

## Functional Requirements

### 1. Advanced Catalog Management (Bulk Operations)
- **CSV/Excel Interface**: Enable exporting the product catalog to CSV/Excel and importing updates back into the system with validation.
- **In-App Batch Editor**: A dedicated UI within the Admin panel to select multiple products and update attributes (Price, Category, Status) via a synchronized form.
- **Automated Rule Engine**: Logic to apply global changes based on segments (e.g., "Increase all Powder-form product prices by 5%").

### 2. Enterprise B2B Engine
- **Tiered Pricing & Price Lists**: Support for multiple price lists (Gold, Silver, Bronze) assignable to specific distributor accounts.
- **Role-Based Discounts**: Automatic flat-rate discounts for specific user roles (e.g., "Dealers" get 15% off).
- **Volume-Based Tiers**: Dynamic pricing that adjusts based on item quantity in the cart (e.g., 100+ units triggers wholesale rates).
- **Partial Payments**: A B2B checkout workflow allowing initial deposits with the balance handled via credit terms.

### 3. Marketing & Conversion Engine
- **Advanced Coupon Engine**: Support for fixed-amount codes, percentage discounts, and automatic "Buy X Get Y" logic.
- **Scarcity & Urgency UI**: Real-time "Low Stock" indicators and countdown timers for time-limited biological product promotions.

### 4. Multi-Warehouse Logistics
- **Location-Based Inventory**: Track stock levels independently across multiple physical warehouse locations.
- **Intelligent Routing**: Automated order assignment to the nearest warehouse or the one with sufficient stock.

## Technical Requirements
- **Database**: Extend Supabase schema to support `price_lists`, `warehouse_stock`, `coupons`, and `distributor_profiles`.
- **API**: Implement robust Server Actions or Edge Functions for bulk processing to ensure data integrity.
- **UI/UX**: Extend existing Shadcn components for complex data entry and high-fidelity marketing banners.

## Acceptance Criteria
- [ ] Admins can successfully export/import products via CSV with detailed validation logs.
- [ ] B2B users see their unique tiered pricing immediately after authentication.
- [ ] Cart correctly handles the priority between coupons, role-based discounts, and volume tiers.
- [ ] Warehouse stock is accurately tracked and decremented per location.
- [ ] Scarcity indicators and timers appear correctly based on real-time DB state.

## Out of Scope
- Full ERP integration (focus remains on Supabase/Zoho).
- Real-time courier tracking (handled via existing Delhivery integration).
