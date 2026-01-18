# Specification: Global Navbar Mega Menu Update

## Overview
This track involves replacing the existing simple navbar with a comprehensive, responsive Mega Menu system in `src/components/layout/Navbar.tsx`. The goal is to accommodate the complex product hierarchy of KN Bio Store, including Segments, Crops, and Problems, while providing quick access to core pages and utility features like search, account, and cart.

## Functional Requirements

### 1. Navigation Links (Left Side)
- **Home:** Links to `/`
- **About Us:** Links to `/about` (or placeholder)
- **Knowledge Center:** Links to `/knowledge-center` (or placeholder)
- **Contact:** Links to `/contact` (or placeholder)

### 2. "Shop" Mega Menu (Right Side)
The "Shop" menu must use a Tailwind-based mega menu structure on desktop and an accordion/mobile-friendly structure on small screens.
- **Shop by Segment:** Agriculture, Aquaculture, Poultry Healthcare, Animal Healthcare, Bioremediation, Seeds, Organic Farming, Farm equipment, Testing lab, Oilpalm.
- **Farming Segment:** for-crop-champions, for-pond-champions, for-poultry-pros, for-organic-newbies, organic-farming, farm-needs, farm-equipment.
- **Shop by Crop:** Paddy, Mango, Banana, Chilli, Cotton, Coffee, Tea, Papaya, Pomegranate, Dragoon, Ground Nut, Pulses, Coco, Turmeric, Oil Palm, Coconut, Maize, Fish, Shrimp, Chicks, Layers, Broilers.
- **Shop By Problem:** Thrips, Mites, White Flys, Green Flys, White Grubs, Nutrients Deficiency.

**Implementation Details:**
- Use `group` and `group-hover` Tailwind classes for hover states.
- Include **bold section headers** and **dividers** between categories.
- Link all individual items to `/store` for now (filtering to be implemented in a future track).
- Links should be text-only (no icons).

### 3. Utility Features
- **Search Bar:** A compact input field for product searching.
- **User Account/Login:** Link/Icon for the OTP login flow.
- **Cart Icon:** Link to the cart with a dynamic item count badge.

### 4. Responsiveness
- **Desktop:** Multi-column mega menu layout.
- **Mobile:** Mobile hamburger menu with accordion-style expansion for the "Shop" categories.

## Non-Functional Requirements
- **Performance:** Ensure the menu transition and hover effects are smooth and lightweight.
- **Accessibility:** Use proper ARIA attributes for dropdowns and mobile menus.
- **Design:** Align with the Material Design principles and project aesthetic using Tailwind CSS.

## Acceptance Criteria
- [ ] Navbar is present on all pages via the global layout.
- [ ] Left-side links correctly navigate to their respective paths.
- [ ] Hovering over "Shop" on desktop reveals the 4-column mega menu.
- [ ] Section headers in the mega menu are bold and separated by dividers.
- [ ] Mobile menu toggles correctly and shows categories in a navigable accordion.
- [ ] Search, Login, and Cart utilities are visible and functional (as links).

## Out of Scope
- Implementation of the specific filtering logic for the `/store` links.
- Implementation of the Knowledge Center or About Us page content.
